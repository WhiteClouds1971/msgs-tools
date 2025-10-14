const useDefineModel = (model, defaults) => {
  if (model.value) {
    Object.assign(defaults, model.value);
    Object.assign(model.value, defaults);
  } else {
    model.value = defaults || {};
  }
  return reactive(model.value);
};

export { useDefineModel };
