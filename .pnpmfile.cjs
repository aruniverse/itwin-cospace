function readPackage(pkg) {
  if (pkg.name == "@itwin/imodels-access-backend") {
    pkg.dependencies["@itwin/core-backend"] = "workspace:*";
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
