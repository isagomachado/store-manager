const throwInvalidIdError = (message) => {
  const error = new Error(message);
  error.name = 'InvalidIdError';
  throw error;
};

const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

const useSchema = (schema) => async (aux) => {
  const value = await schema.validate(aux);
  return value;
};

module.exports = {
  throwInvalidIdError,
  throwNotFoundError,
  useSchema,
};
