import React from 'react';
import { Select, Form } from 'antd';

const SelectComp = (props) => {
  const { options = [], fieldsProps = {}, ...orgs } = props;
  const { key, value = 'value', label = 'label' } = fieldsProps;
  return (
    <Select {...orgs}>
      {options.map((item, i) => (
        <Select.Option key={item[key] || item[value] || i} value={item[value]}>
          {item[label]}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectComp;