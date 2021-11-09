export const getValidationErrorMessage = (validations, title = null) => {
  let errors = title ? [title] : [];

  Object.keys(validations).forEach((key) => {
    const error = validations[key].error;
    if (error.length) {
      const message = `${validations[key].name} - ${error}`;
      errors.push(message);
    }
  });

  return errors.join("<br>");
};
