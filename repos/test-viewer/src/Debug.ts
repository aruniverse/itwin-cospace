
import * as APPUI_ABSTRACT from "@itwin/appui-abstract";
import * as APPUI_LAYOUT_REACT from "@itwin/appui-layout-react";
import * as APPUI_REACT from "@itwin/appui-react";
import * as COMPONENTS_REACT from "@itwin/components-react";
import * as CORE_BENTLEY from "@itwin/core-bentley";
import * as CORE_COMMON from "@itwin/core-common";
import * as CORE_FRONTEND from "@itwin/core-frontend";
import * as CORE_I18N from "@itwin/core-i18n";
import * as CORE_QUANTITY from "@itwin/core-quantity";
import * as CORE_REACT from "@itwin/core-react";
import * as CORE_TELEMETRY from "@itwin/core-telemetry";
import * as IMODEL_COMPONENTS_REACT from "@itwin/imodel-components-react";
import * as PRESENTATION_COMMON from "@itwin/presentation-common";
import * as PRESENTATION_FRONTEND from "@itwin/presentation-frontend";
import * as WEBGL_COMPATIBILITY from "@itwin/webgl-compatibility";

const corePkgs = [
  "@itwin/appui-abstract",
  "@itwin/appui-layout-react",
  "@itwin/appui-react",
  "@itwin/components-react",
  "@itwin/core-bentley",
  "@itwin/core-common",
  "@itwin/core-frontend",
  // "@itwin/core-i18n",
  "@itwin/core-quantity",
  "@itwin/core-react",
  // "@itwin/core-telemetry",
  "@itwin/imodel-components-react",
  "@itwin/presentation-common",
  // "@itwin/presentation-components",
  "@itwin/presentation-frontend",
  "@itwin/webgl-compatibility",
];

(window as any).__ITWINJS_DO_NOT_USE = {
  "@itwin/appui-abstract": APPUI_ABSTRACT,
  "@itwin/appui-layout-react": APPUI_LAYOUT_REACT,
  "@itwin/appui-react": APPUI_REACT,
  "@itwin/components-react": COMPONENTS_REACT,
  "@itwin/core-bentley": CORE_BENTLEY,
  "@itwin/core-common": CORE_COMMON,
  "@itwin/core-frontend": CORE_FRONTEND,
  "@itwin/core-quantity": CORE_QUANTITY,
  "@itwin/core-react": CORE_REACT,
  "@itwin/imodel-components-react": IMODEL_COMPONENTS_REACT,
  "@itwin/presentation-common": PRESENTATION_COMMON,
  "@itwin/presentation-frontend": PRESENTATION_FRONTEND,
  "@itwin/webgl-compatibility": WEBGL_COMPATIBILITY,
}

export {}
