export const getRoute = async (path, name) => {
  const indexOfRoutesDir = path.split("/").indexOf("routes");
  const routesPath = "./" + path.split("/").splice(indexOfRoutesDir).join("/");

  const route = "/api/" + path.split("/").splice(indexOfRoutesDir+1).join("/");
  const file = routesPath + "/" + name;

  return {
    route: route,
    file: file,
  };
};
