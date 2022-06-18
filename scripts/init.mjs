#!/usr/bin/env node

import { cd } from "zx";
import "zx/globals";

cd("repos");

await $`git clone --single-branch --branch release/3.2.x https://github.com/iTwin/itwinjs-core.git`;
await $`git clone --single-branch --branch next https://github.com/iTwin/viewer.git`;

cd("itwinjs-core");
await $`git apply ../../scripts/applyMe.patch`;

