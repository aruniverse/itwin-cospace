/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { TokenServerAuthClient } from "./TokenServerClient";

import { TreeWidget } from "@itwin/tree-widget-react";
import { MeasureTools } from "@itwin/measure-tools-react";
import { PropertyGridManager } from "@itwin/property-grid-react";
import { Viewer, ViewerPerformance } from "@itwin/web-viewer-react";
import type { ScreenViewport } from "@itwin/core-frontend";
import { FitViewTool, IModelApp, StandardViewId } from "@itwin/core-frontend";
import {
  StandardContentToolsProvider,
  StandardNavigationToolsProvider,
  StandardStatusbarItemsProvider,
} from "@itwin/appui-react";
import { TreeWidgetUiItemsProvider } from "@itwin/tree-widget-react";
import { MeasureToolsUiItemsProvider } from "@itwin/measure-tools-react";
import { PropertyGridUiItemsProvider } from "@itwin/property-grid-react";

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState("");
  const authClient = useMemo(() => new TokenServerAuthClient(), []);
  useEffect(() => {
    const init = async () => {
      await authClient.initialize();
      const token = await authClient.getAccessToken();
      setAccessToken(token);
    };
    init().catch(console.error);
  }, [authClient]);

  const onIModelAppInit = useCallback(async () => {
    await TreeWidget.initialize();
    await PropertyGridManager.initialize();
    await MeasureTools.startup();
  }, []);

  const viewConfiguration = useCallback((viewPort: ScreenViewport) => {
    // default execute the fitview tool and use the iso standard view after tile trees are loaded
    const tileTreesLoaded = () => {
      return new Promise((resolve, reject) => {
        const start = new Date();
        const intvl = setInterval(() => {
          if (viewPort.areAllTileTreesLoaded) {
            ViewerPerformance.addMark("TilesLoaded");
            void ViewerPerformance.addAndLogMeasure(
              "TileTreesLoaded",
              "ViewerStarting",
              "TilesLoaded",
              viewPort.numReadyTiles
            );
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
      {accessToken && (
        <Viewer
          iTwinId={"c5d4dd3a-597a-4c88-918c-f1aa3588312f"}
          iModelId={"11977591-6a15-4f0e-aa10-1c6afb066bc7"}
          authClient={authClient}
          onIModelAppInit={onIModelAppInit}
          viewCreatorOptions={viewCreatorOptions}
          enablePerformanceMonitors={false}
          uiProviders={[
            new StandardNavigationToolsProvider("DefaultNavigationTools"),
            new StandardContentToolsProvider("DefaultContentTools"),
            new StandardStatusbarItemsProvider("DefaultStatusbar"),
            new TreeWidgetUiItemsProvider({
              hideTrees: {
                spatialTree: true,
              },
            }),
            new PropertyGridUiItemsProvider({
              enableCopyingPropertyText: true,
            }),
            new MeasureToolsUiItemsProvider(),
          ]}
        />
      )}
    </div>
  );
};

export default App;
