export const createActionSet = actionName => ({
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
  PENDING: `${actionName}_PENDING`,
  actionName,
});
