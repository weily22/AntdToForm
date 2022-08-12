
const useFormData = (options = {}) => {
  const { form, valuePropsFuncMap = {}, isTrim = true, onSubmit = () => {} } = options;
  const reset = () => {
    if (form) {
      form.resetFields();
    }
  }
  const trimFormatValue = (value) => {
    let type = typeof value;
    if (type === 'undefined' || ((type === 'string' && value.length === 0))) {
      return null;
    }
    if (type === 'string') {
      return value.trim();
    }
    return value;
  }
  const dealWithValuePropsFuncMap = (values) => {
    if (valuePropsFuncMap instanceof Object) {
      const fields = form.getFieldsValue();
      let newValues = Object.assign({}, fields);
      Object.keys(valuePropsFuncMap).map((key) => {
        if (fields[key]) {
          delete newValues[key];
          newValues = Object.assign(newValues, valuePropsFuncMap[key](fields[key]))
          // newValues[key] = valuePropsFuncMap[key](fields[key]);
        }
      })
      return newValues;
    } else {
      return values;
    }
  }
  const submit = () => {
    return new Promise((resolve, reject) => {
      form.validateFields().then((values) => {
        const params = dealWithValuePropsFuncMap(values);
        if (isTrim) {
          Object.keys(params).forEach((key) => {
            if (JSON.stringify(trimFormatValue(params[key])) === 'null') {
              delete params[key];
            } else {
              params[key] = trimFormatValue(params[key]);
            }
          })
        }
        resolve(params)
      })
    })
  }
  return {
    submit,
    reset,
  }
}

export default useFormData;