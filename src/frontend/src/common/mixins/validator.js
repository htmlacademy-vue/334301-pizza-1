import { emailRegex } from "../const/common";

const rules = {
  isNotEmpty: {
    rule: (value) => !!value?.trim(),
    message: "поле не заполнено",
  },
  required: {
    rule: (value) => !!value?.trim(),
    message: "поле обязательно для заполнения",
  },
  email: {
    rule: (value) =>
      value ? emailRegex.test(String(value).toLowerCase()) : true,
    message: "электронная почта имеет неверный формат",
  },
};

const validator = (value, appliedRules) => {
  let error = "";
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export default {
  methods: {
    $validateFields(fields, validations) {
      let isValid = true;
      Object.keys(validations).forEach((key) => {
        validations[key].error = validator(fields[key], validations[key].rules);
        if (validations[key].error) {
          isValid = false;
        }
      });

      return isValid;
    },
    $clearValidationErrors(validations) {
      if (!validations) {
        return;
      }
      Object.keys(validations).forEach((key) => {
        this.$set(validations[key], "error", "");
      });
    },
  },
};
