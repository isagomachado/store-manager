const throwInvalidIdError = (message) => {
  const error = new Error(message);
  error.name = 'InvalidIdError';
  throw error;
};

const useSchema = (schema) => (aux) => {
  const value = schema.validate(aux);

  return value;
};

module.exports = {
  throwInvalidIdError,
  useSchema,
};
