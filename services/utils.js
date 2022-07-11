const throwInvalidIdError = (message) => {
  const error = new Error(message);
  error.name = 'InvalidIdError';
  throw error;
};

const useSchema = (schema) => async (value) => {
  const result = await schema.validateAsync(value);
  return result;
};

module.exports = {
  throwInvalidIdError,
  useSchema,
};
