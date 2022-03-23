// A hack only to be used when packages have incorrect dependencies
function readPackage(pkg) {
  // if (pkg.name == "foo") {
  //   pkg.dependencies["bar"] = "workspace:*";
  //   pkg.devDependencies["baz"] = "workspace:*";
  // }

  // overriding these pkgs manually because im not linking them atm

  // https://github.com/iTwin/imodels-clients
  if (pkg.name == "@itwin/imodels-access-backend") {
    pkg.dependencies["@itwin/core-bentley"] = "workspace:*";
    pkg.dependencies["@itwin/core-backend"] = "workspace:*";
    pkg.dependencies["@itwin/core-common"] = "workspace:*";
  } else if (pkg.name == "@itwin/imodels-access-frontend") {
    pkg.dependencies["@itwin/core-bentley"] = "workspace:*";
    pkg.dependencies["@itwin/core-frontend"] = "workspace:*";
    pkg.dependencies["@itwin/core-common"] = "workspace:*";
  }

  // https://github.com/iTwin/auth-clients
  else if (pkg.name == "@itwin/browser-authorization") {
    pkg.dependencies["@itwin/core-bentley"] = "workspace:*";
  } else if (pkg.name == "@itwin/electron-authorization") {
    pkg.dependencies["@itwin/core-bentley"] = "workspace:*";
  } else if (pkg.name == "@itwin/oidc-signin-tool") {
    pkg.dependencies["@itwin/core-bentley"] = "workspace:*";
  }

  // https://github.com/iTwin/reality-data-client
  else if (pkg.name == "@itwin/reality-data-client") {
    pkg.dependencies["@itwin/core-bentley"] = "workspace:*";
    pkg.dependencies["@itwin/core-common"] = "workspace:*";
    pkg.dependencies["@itwin/core-geometry"] = "workspace:*";
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
