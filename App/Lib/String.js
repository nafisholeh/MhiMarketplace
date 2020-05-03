export function capitalizeFirstLetter(object) {
  if (!object || !typeof object === "string" || !object instanceof String)
    return object;
  return object.charAt(0).toUpperCase() + object.slice(1);
}
