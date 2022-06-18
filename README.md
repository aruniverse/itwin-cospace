# itwin_cospace

How to repro:

```
git clone --single-branch --branch turbo-repro https://github.com/aruniverse/itwin-cospace.git
pnpm i -w zx
pnpm repo-init
pnpm setOverrides
pnpm i
```

to test with lage:
```
pnpm build
```

to test with turbo:
```
pnpm build:turbo
```


## issues:

- turbo will attempt to run build in pkgs that don't have a build script:
  - https://github.com/vercel/turborepo/issues/937


- dependency graph seems wrong
  - compare:
    - pnpm exec turbo run build --dry=json > turbo_build_order.json
    - pnpm exec turbo run build --graph=my-graph.pdf
  - looks like its not taking into accoutn the dev deps when building? 
  - see:   
    - https://github.com/vercel/turborepo/pull/1225
    - https://github.com/vercel/turborepo/pull/813
  