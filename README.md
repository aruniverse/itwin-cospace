# itwin_devspace

This repo provides an example of how to setup multiple repos together using rush; We'll look into making a tool to automate this and scale out better, but for a proof of concept this should work.

## Overview

Clone this repo which will help setup a [vscode workspace](https://code.visualstudio.com/docs/editor/workspaces) to connect the imodeljs core repo along with the viewer and viewer-components-react repo.

All the repos we want to connect will be a sibling to this repo, and it'll look like so:

```
    |-- some_parent_dir
        |-- [itwin_devspace](https://github.com/aruniverse/itwin_devspace)
        |-- [imodeljs](https://github.com/imodeljs/imodeljs)
        |-- [viewer](https://github.com/iTwin/viewer)
        |-- [viewer-components-react](https://github.com/iTwin/viewer-components-react)
        |-- [auth-clients](https://github.com/iTwin/auth-clients)
```


We'll be taking advantage of [pnpm workspaces](https://pnpm.io/workspaces) to link the node_modules of all the repos in the workspace together. All of the dependencies will need to be defined in `itwin_devspace/rush.json`, and then all the dependencies that are in the workspace needs to be linked together by setting their version to `"workspace:*"` in the `package.json` of every package defined in the `rush.json`.

You should be able to add more repos to the workspace as long as you update the `rush.json` and the `package.json`'s accordingly.

## Steps
I'd recommend having a different shell for each repo you're linking.

```bash
git clone https://github.com/aruniverse/itwin_devspace.git
```

In your VSCode instance, open workspace from file, and select the `itv_vcr_imjs.code-workspace` file.

#### imodeljs
We'll use [git sparse-checkout](https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/) to not pull in code we don't really care about in the core repo.

```bash
git clone --filter=blob:none --no-checkout https://github.com/imodeljs/imodeljs.git
cd imodeljs
git checkout master
git sparse-checkout init --cone
git sparse-checkout set clients common core/backend core/backend-itwin-client core/bentley core/common core/ecschema-metadata core/electron-manager core/express-server core/frontend core/frontend-devtools core/geometry core/hypermodeling core/i18n core/markup core/orbitgt core/quantity core/webgl-compatibility presentation tools ui
```

The `itwin_devspace` repo provides patch files you can apply to help link packages together in the workspace

#### viewer
```bash
git clone -b 3.0 --single-branch https://github.com/iTwin/viewer.git
cd viewer
git apply < ../itwin_devspace/patches/itv.patch
```

#### viewer-components-react
```bash
git clone -b 3.0 --single-branch https://github.com/itwin/viewer-components-react.git
cd viewer-components-react
git apply < ../itwin_devspace/patches/vcr.patch
```

#### auth-clients
```bash
git clone https://github.com/itwin/auth-clients.git
cd auth-clients
git apply < ../itwin_devspace/patches/auth.patch
```

Now that you have all the repos cloned together, you should run `rush update` and `rush build` in the itwin_devspace shell.
Whenever you make a change to one of the packages in the workspace run rush build so it updates that package and any one that depends on it.

In the viewer there are some test apps available, you'll want to create a `.env.local` file and set `DISABLE_NEW_ASSET_COPY` to `true` because there's an issue copying the assets via symlinks with this approach.