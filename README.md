# itwin_cospace

This repo uses [CoSpace](https://github.com/aruniverse/cospace) to setup a convenient local dev environment linking multiple (mono)repos together for iTwin development.

## getting started

1. clone this repo
   ```sh
   git clone https://github.com/aruniverse/itwin-cospace.git
   ```
2. clone itwinjs repos you want to link together under the `repos` subdir:
   1. `cd repos`
   2. clone the [itwinjs-core](https://github.com/iTwin/itwinjs-core) repo
      ```sh
      git clone https://github.com/iTwin/itwinjs-core.git
      ```
   3. clone the [iwin viewer](https://github.com/iTwin/viewer) repo
      ```sh
      git clone https://github.com/iTwin/viewer.git
      ```
   4. clone any additional repos you want to link together
   5. `cd ..`
3. use the local version of the packages throughout your cospace
   ```sh
   pnpm setOverrides
   ```
   this just runs [cospace override](https://aruniverse.github.io/cospace/docs/cli-usage#override)
4. install
   ```sh
   pnpm install
   ```
5. build
   ```sh
   pnpm build
   ```
6. develop faster and enjoy
   1. make any code changes you want, and then just do another build. lage will cache builds, so it should be very quick to see your changes
