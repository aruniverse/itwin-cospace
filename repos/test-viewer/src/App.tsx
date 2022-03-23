/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { FillCentered } from "@itwin/core-react";
import { SvgIModelLoader } from "@itwin/itwinui-illustrations-react";
import { ConnectedViewerProps, useWebViewerInitializer } from "@itwin/web-viewer-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { TokenServerAuthClient } from "./TokenServerClient";
import { WrappedViewer } from "./WrappedViewer";
import { history } from "./history";
import "./Debug";

import { TreeWidget } from "@itwin/tree-widget-react";
import { MeasureTools } from "@itwin/measure-tools-react";
import { PropertyGridManager } from "@itwin/property-grid-react";
import { GeoTools } from "@itwin/geo-tools-react";
import { ALL_MODELS } from "./IModelPicker";

export type Envs = "" | "qa-" | "dev-";

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState("");
  const [env, setEnv] = useState(process.env.IMJS_URL_PREFIX);
  const authClient = useMemo(() => new TokenServerAuthClient(env), [env]);
  useEffect(() => {
    const init = async () => {
      await authClient.initialize();
      const token = await authClient.getAccessToken();
      setAccessToken(token);
    }
    init().catch(console.error);
  }, [authClient]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const _env = urlParams.get("env");
    if (_env) {
      setEnv(`${_env as string}-`);
      if (_env !== "prod") {
        (globalThis as any).IMJS_URL_PREFIX = `${_env as string}-`;
      }
    }
  }, []);

  useEffect(() => {
    if (env) {
      history.push(`?env=${env.substring(0, env.length - 1)}`);
    }
  }, [env]);

  const [connectedViewerProps, setConnectedViewerProps] = useState<ConnectedViewerProps>(ALL_MODELS.get(env ?? "")!.get("Retail Building")!);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const iTwinId = urlParams.get("iTwinId") ?? "";
    const iModelId = urlParams.get("iModelId") ?? "";
    const changeSetId = urlParams.get("changeSetId") ?? "";
    if (iTwinId && iModelId) {
      setConnectedViewerProps({
        iTwinId,
        iModelId,
        changeSetId
      });
    }
  }, []);

  useEffect(() => {
    if (connectedViewerProps) {
      let url = `?iTwinId=${connectedViewerProps.iTwinId}&iModelId=${connectedViewerProps.iModelId}`;
      if (connectedViewerProps.changeSetId) {
        url += `&changeSetId=${connectedViewerProps.changeSetId}`;
      }
      if (env) {
        url += `&env=${env.substring(0, env.length - 1)}`;
      }
      history.push(url);
    }
  }, [connectedViewerProps, env]);

  const onIModelAppInit = useCallback(async () => {
    await TreeWidget.initialize();
    await PropertyGridManager.initialize();
    await MeasureTools.startup();
    await GeoTools.initialize();
  }, []);

  // need to initialize IModelApp earlier so we can wrap <Viewer /> with <IModelJsViewProvider />
  useWebViewerInitializer({
    ...connectedViewerProps,
    authClient,
    enablePerformanceMonitors: false,
    onIModelAppInit,
  });

  return (
    <div style={{ height: "100vh" }}>
      {!accessToken && (
        <FillCentered>
          <SvgIModelLoader style={{ height: "64px", width: "64px" }} />
        </FillCentered>
      )}
      {accessToken && <WrappedViewer authClient={authClient} {...connectedViewerProps} />}
    </div>
  );
};

export default App;
