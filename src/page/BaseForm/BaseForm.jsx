import React from "react";
import {DatePicker, Divider, Form, Input, Switch} from 'antd';
import AntdToForm, { useFormData } from "../../components/AntdToForm";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const BaseForm = (props={}) => {
  const { itemsData = [] } = props;
  const [form] = Form.useForm();
  const onSubmit = (v) => {
    console.log("提交", v)
  }

  return (
    <div className="base-form">
      <Divider>base Form</Divider>
      <AntdToForm
        form={form}
        formProps={layout}
        items={itemsData}
        onFinish={onSubmit}
      />
    </div>
  )
}

export default BaseForm;