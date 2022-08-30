/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { ScreenViewport } from "@itwin/core-frontend";
import { FitViewTool, IModelApp, StandardViewId } from "@itwin/core-frontend";
import { FillCentered } from "@itwin/core-react";
import { ProgressLinear } from "@itwin/itwinui-react";
import { Viewer, ViewerAuthorizationClient } from "@itwin/web-viewer-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { history } from "./history";
import { BeEvent, AccessToken } from "@itwin/core-bentley";

class TokenServerAuthClient implements ViewerAuthorizationClient {
  public readonly onAccessTokenChanged = new BeEvent<(token: AccessToken) => void>();
  protected _accessToken?: AccessToken;

  public async initialize() {
    const tokenUrl = `https://${globalThis.IMJS_URL_PREFIX || "prod-"}imodeldeveloperservices-eus.azurewebsites.net/api/v0/sampleShowcaseUser/devUser`;
    try {
      const res = await fetch(tokenUrl);
      if (res.ok) {
        const { _jwt } = await res.json();
        const accessToken = `Bearer ${_jwt}`;
        this._accessToken = accessToken;
        this.onAccessTokenChanged.raiseEvent(accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async getAccessToken(): Promise<AccessToken> {
    if (!this._accessToken) throw new Error("Cannot get access token");
    return this._accessToken;
  }
}

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState("");
  const authClient = useMemo(() => new TokenServerAuthClient(), []);
  useEffect(() => {
    const init = async () => {
      await authClient.initialize();
      const token = await authClient.getAccessToken();
      setAccessToken(token);
    }
    init().catch(console.error);
  }, [authClient]);

  // prod 
  const [iTwinId, setITwinId] = useState("6b9d3c0b-1217-4cf8-a1c0-afcade43e66a");
  const [iModelId, setIModelId] = useState("6be3a56d-b93b-4a3c-a41e-06398083905d");

  // dev 
  // const [iTwinId, setITwinId] = useState("8076d2b7-d1ea-4740-a34c-8dceab1c2d51");
  // const [iModelId, setIModelId] = useState("8bf1c37d-c307-4572-bddb-ab2a80f0ae4d");
  const [changeSetId, setChangeSetId] = useState("");

  useEffect(() => {
    if (accessToken) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("iTwinId")) {
        setITwinId(urlParams.get("iTwinId") as string);
      }
      if (urlParams.has("iModelId")) {
        setIModelId(urlParams.get("iModelId") as string);
      }
      if (urlParams.has("changesetId")) {
        setChangeSetId(urlParams.get("changesetId") as string);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && iTwinId && iModelId) {
      history.push(`?iTwinId=${iTwinId}&iModelId=${iModelId}`);
    }
  }, [accessToken, iTwinId, iModelId]);

  /** NOTE: This function will execute the "Fit View" tool after the iModel is loaded into the Viewer.
   * This will provide an "optimal" view of the model. However, it will override any default views that are
   * stored in the iModel. Delete this function and the prop that it is passed to if you prefer
   * to honor default views when they are present instead (the Viewer will still apply a similar function to iModels that do not have a default view).
   */
  const viewConfiguration = useCallback((viewPort: ScreenViewport) => {
    // default execute the fitview tool and use the iso standard view after tile trees are loaded
    const tileTreesLoaded = () => {
      return new Promise((resolve, reject) => {
        const start = new Date();
        const intvl = setInterval(() => {
          if (viewPort.areAllTileTreesLoaded) {
            clearInterval(intvl);
            resolve(true);
          }
          const now = new Date();
          // after 20 seconds, stop waiting and fit the view
          if (now.getTime() - start.getTime() > 20000) {
            reject();
          }
        }, 100);
      });
    };

    tileTreesLoaded().finally(() => {
      void IModelApp.tools.run(FitViewTool.toolId, viewPort, true, false);
      viewPort.view.setStandardRotation(StandardViewId.Iso);
    });
  }, []);

  const viewCreatorOptions = useMemo(
    () => ({ viewportConfigurer: viewConfiguration }),
    [viewConfiguration]
  );

  return (
    <div style={{ height: "100vh" }}>
      {!accessToken && (
        <FillCentered>
          <ProgressLinear indeterminate={true} labels={["Signing in..."]} />
        </FillCentered>
      )}
      <Viewer
        iTwinId={iTwinId}
        iModelId={iModelId}
        changeSetId={changeSetId}
        authClient={authClient}
        viewCreatorOptions={viewCreatorOptions}
        enablePerformanceMonitors={true} // see description in the README (https://www.npmjs.com/package/@itwin/web-viewer-react)
        defaultUiConfig={{
          hideNavigationAid: true,
          hideStatusBar: true,
          hideToolSettings: true
        }}
      />
    </div>
  );
};

export default App;
