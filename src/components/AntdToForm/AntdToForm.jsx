import React, { useEffect, useState } from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, Switch} from 'antd';
import {useFormData} from "./useFormData";

const { Item } = Form;
const AntdToForm = (props) => {
  const valueMap = {};
  // const [valueMap, setValueMap] = useState({});
  const { form, onFinish = () => {}, rowGutter = 10, colSpan = 24, items = [], formProps = {} } = props;
  const {
    fetchData = () => {},
  } = props;

  const bindValuePropsFunc = (name, func) => {
    if (func instanceof Function) {
      Object.assign(valueMap, { [name]: func });
    }
  }


  const getItems = (itemsData = []) => {
    if (!(itemsData instanceof Array)) {
      console.error("参数类型错误，请传入数组！")
    }

    if (!itemsData.length) return null;

    return itemsData.map(({ name, label, comp, rules, required, itemProps = {}, valuePropsFunc }, i) => {
      const formItemProps = { name, label, rules, ...itemProps }
      if (valuePropsFunc) bindValuePropsFunc(name, valuePropsFunc);
      if (!!required && !rules) formItemProps.rules = [{required: true}];
      return <Col span={colSpan} key={i}>
        <Item {...formItemProps}>
          { comp ? comp : <Input placeholder="请输入" /> }
        </Item>
      </Col>;
    })
  }

  const onSubmit = () => {
    console.log("valueMap", valueMap)
    form.validateFields().then((values) => {
      onFinish(values)
    })
  }

  return (
    <Form form={form} {...formProps}>
      <Row gutter={rowGutter}>{getItems(items)}</Row>
    </Form>
  )
}

export default AntdToForm;
