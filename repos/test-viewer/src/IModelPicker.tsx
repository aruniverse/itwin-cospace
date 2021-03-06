import { ConnectedViewerProps } from "@itwin/web-viewer-react";

export const PROD_MODELS = new Map<string, ConnectedViewerProps>([
  [
    "CoffsHarborDemo",
    { iTwinId: "c5d4dd3a-597a-4c88-918c-f1aa3588312f", iModelId: "11977591-6a15-4f0e-aa10-1c6afb066bc7" },
  ],
  [
    "Metrostation",
    { iTwinId: "402f1a92-c7b1-4012-b787-7fa45e2e7fe4", iModelId: "b55dec38-d9b7-4029-9b9c-6b899151328f", changeSetId: "440ec8620b2a3c370fc95eb8e8a490829d7a4cbf" },
  ],
  [
    "Retail Building",
    { iTwinId: "998b4696-a672-4f85-bea1-8e35e0852452", iModelId: "97a67f36-8efa-499c-a6ed-a8e07f38a410" },
  ],
  [
    "Bay Town Process Plant",
    { iTwinId: "b27dc251-0e53-4a36-9a38-182fc309be07", iModelId: "f30566da-8fdf-4cba-b09a-fd39f5397ae6" },
  ],
  [
    "House",
    { iTwinId: "6b9d3c0b-1217-4cf8-a1c0-afcade43e66a", iModelId: "6be3a56d-b93b-4a3c-a41e-06398083905d" },
  ],
  [
    "Philadelphia",
    { iTwinId: "402f1a92-c7b1-4012-b787-7fa45e2e7fe4", iModelId: "f815bddf-c448-47c6-84d1-94762d85b645" },
  ],
  [
    "Stadium",
    { iTwinId: "656dd74d-8798-4aa4-8d13-6e6458789639", iModelId: "881c9ca0-34ff-4875-ae63-2dd8ac015c27" },
  ],
  [
    "Transformed Stadium",
    { iTwinId: "58262a3d-bbc8-45d0-adbc-13a4623c180f", iModelId: "67cf8408-8f3f-4a3a-bde1-a991a422e909" },
  ],
  [
    "Exton Campus",
    { iTwinId: "5b4ebd22-d94b-456b-8bd8-d59563de9acd", iModelId: "d992e912-7f6f-4bd6-9781-4ecf2891b17a" },
  ],
  [
    "Villa",
    { iTwinId: "532629d2-d25e-4a00-9fb7-c401b6cacf84", iModelId: "62d521ca-0b45-4a65-9f48-9fc9b5e87100" },
  ],
]);

export const QA_MODELS = new Map<string, ConnectedViewerProps>([
  [
    "Retail Building",
    { iTwinId: "8076d2b7-d1ea-4740-a34c-8dceab1c2d51", iModelId: "8bf1c37d-c307-4572-bddb-ab2a80f0ae4d" },
  ],
]);

export const DEV_MODELS = new Map<string, ConnectedViewerProps>([
  [
    "Retail Building",
    { iTwinId: "8076d2b7-d1ea-4740-a34c-8dceab1c2d51", iModelId: "8bf1c37d-c307-4572-bddb-ab2a80f0ae4d" },
  ],
]);

export const ALL_MODELS = new Map<string, Map<string, ConnectedViewerProps>>([
  [
    "", PROD_MODELS,
  ],
  [
    "prod-", PROD_MODELS,
  ],
  [
    "qa-", QA_MODELS,
  ],
  [
    "dev-", DEV_MODELS,
  ],
]);
