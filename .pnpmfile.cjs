// A hack only to be used when packages have incorrect dependencies
function readPackage(pkg) {
  // if (pkg.name == "@itwin/foo") {
  //   pkg.dependencies["@itwin/bar"] = "workspace:*";
  // }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
