const throwInvalidIdError = (message) => {
  const error = new Error(message);
  error.name = 'InvalidIdError';
  throw error;
};

const useSchema = (schema) => async (aux) => {
  const { error, value } = await schema.validate(aux);

  if (error) {
    return error;
  }

  return value;
};

module.exports = {
  throwInvalidIdError,
  useSchema,
};
