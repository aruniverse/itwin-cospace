# itwin_devspace

This repo provides an example of how to link multiple (mono)repos together.

Will look into making a tool to automate this and scale out better, but for a proof of concept this should work.

## Overview

We'll setup a [vscode multi-root workspace](https://code.visualstudio.com/docs/editor/multi-root-workspaces) to connect the iTwin.js core repo along with other repos that build on top of it.

All the repos we want to connect will be a sibling to this repo, and it'll look like so:

```
|-- some_parent_dir
    |-- [itwin_devspace](https://github.com/aruniverse/itwin_devspace)
    |-- [imodeljs](https://github.com/iTwin/itwinjs-core)
    |-- [viewer](https://github.com/iTwin/viewer)
    |-- [viewer-components-react](https://github.com/iTwin/viewer-components-react)
    |-- [auth-clients](https://github.com/iTwin/auth-clients)
    |-- [imodels-clients](https://github.com/iTwin/imodels-clients)
    |-- [reality-data-client](https://github.com/iTwin/reality-data-client)
```

We'll be taking advantage of [pnpm workspaces](https://pnpm.io/workspaces) to link the node_modules/builds of all the packages in the workspace together. All the packages you want to link will need to be defined in `itwin_devspace/pnpm-workspace.yaml`, and then they'll need to be linked together by setting their version to `"workspace:*"` in the `pnpm.overrides` section of `itwin_devspace/package.json`.

You should be able to add more repos to the workspace as long as you update the `pnpm-workspace.yaml` and the `package.json` accordingly.

Then we'll use a task runner like [lage](https://microsoft.github.io/lage/) to build the packages together.

## Steps

I'd recommend having a different shell for each repo you're linking.

1. Clone this repo

    ```bash
    git clone https://github.com/aruniverse/itwin_devspace.git
    ```

1. In your VSCode instance, open workspace from file, and select the `itv_vcr_imjs.code-workspace` file from this repo.
1. Clone all the other repos you want to link to this one.
1. run `pnpm install` in the devspace repo, which should install the depencies for all the repos you're linking.
1. run `pnpm build` in the devspace repo
1. you can run your test app using [pnpm filters](https://pnpm.io/filtering), eg `pnpm start --filter @itwin/web-viewer-test`

    In the viewer there are some test apps available, you'll want to create a `.env.local` file and set `DISABLE_NEW_ASSET_COPY` to `true` because there's an issue copying sym-linked assets with this approach.

## Other reading material

- [git sparse-checkout](https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/)
- [turborepo](https://turborepo.org/docs)
- [lage](https://microsoft.github.io/lage/)
- [pnpm](https://pnpm.io/pnpm-cli)
- [git submodules](https://www.atlassian.com/git/tutorials/git-submodule)
- [git subtree](https://www.atlassian.com/git/tutorials/git-subtree)
