export const defineCancelApiObject = (apiObject: any) => {
  const cancelApiObject: Record<string, any> = {};
  Object.getOwnPropertyNames(apiObject).forEach((apiMethod) => {
    cancelApiObject[apiMethod] = {};
    cancelApiObject[apiMethod].handleRequestCancellation = () => {
      const controller = new AbortController();
      cancelApiObject[apiMethod].controller = controller;
      return controller;
    };
  });
  return cancelApiObject;
};