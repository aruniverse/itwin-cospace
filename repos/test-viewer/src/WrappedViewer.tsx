import { IModelJsViewProvider } from "@itwin/imodel-react-hooks";
import React, { useCallback, useMemo } from "react";
import {
  Viewer,
  ViewerAuthorizationClient,
  ViewerPerformance,
} from "@itwin/web-viewer-react";
import type { ScreenViewport } from "@itwin/core-frontend";
import { FitViewTool, IModelApp, StandardViewId } from "@itwin/core-frontend";
import { MarkerToolProvider } from "./MarkerProvider";
import { GeoToolsAddressSearchProvider } from "@itwin/geo-tools-react";
import { StandardContentToolsProvider, StandardNavigationToolsProvider, StandardStatusbarItemsProvider } from "@itwin/appui-react";
import { TreeWidgetUiItemsProvider } from "@itwin/tree-widget-react";
import { MeasureToolsUiItemsProvider } from "@itwin/measure-tools-react";
import { PropertyGridUiItemsProvider } from "@itwin/property-grid-react";
import { ConnectedViewerProps } from "@itwin/web-viewer-react";

interface WrappedViewerProps extends ConnectedViewerProps {
  authClient: ViewerAuthorizationClient;
}

export const WrappedViewer = (props: WrappedViewerProps) => {
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
    <IModelJsViewProvider>
      <Viewer
        {...props}
        viewCreatorOptions={viewCreatorOptions}
        enablePerformanceMonitors={false}
        mapLayerOptions={{
          BingMaps: {
            key: "key",
            value: process.env.IMJS_BING_MAPS_KEY ?? "",
          },
        }}
        uiProviders={[
          new StandardNavigationToolsProvider("DefaultNavigationTools"),
          new StandardContentToolsProvider("DefaultContentTools"),
          new StandardStatusbarItemsProvider("DefaultStatusbar"),
          new TreeWidgetUiItemsProvider({
            hideTrees: {
              spatialTree: true
            }
          }),
          new PropertyGridUiItemsProvider({
            enableCopyingPropertyText: true,
          }),
          new MeasureToolsUiItemsProvider(),
          new GeoToolsAddressSearchProvider(),
          new MarkerToolProvider(),
        ]}
      />
    </IModelJsViewProvider>
  )
};