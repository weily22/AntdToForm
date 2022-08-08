import React, { useEffect, useState } from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, Switch} from 'antd';
import {useFormData} from "./useFormData";

const { Item } = Form;
const AntdToForm = (props) => {
  const [form] = Form.useForm();
  const [valueMap, setValueMap] = useState({});
  const { onFinish = () => {}, rowGutter = 10, colSpan = 24, items = [] } = props;
  const {
    fetchData = () => {},
  } = props;

  const getItems = (itemsData = []) => {
    if (!(itemsData instanceof Array)) {
      console.error("参数类型错误，请传入数组！")
    }
    if (!itemsData.length) return null;
    // let map = {};
    return itemsData.map(({ name, label, comp, rules, required, itemProps = {}, valueProps = {} }, i) => {
      const formItemProps = { name, label, rules, ...itemProps }
      Object.assign(valueMap, valueProps);
      if (!!required && !rules) formItemProps.rules = [{required: true}];
      return <Col span={colSpan} key={i}>
        <Item {...formItemProps}>
          { comp ? comp : <Input placeholder="请输入" /> }
        </Item>
      </Col>;
    })
    // setValueMap(map);
    return items;
  }

  const onSubmit = () => {
    console.log("valueMap", valueMap)
    form.validateFields().then((values) => {
      onFinish(values)
    })
  }

  return (
    <Form form={form}>
      <Row gutter={rowGutter}>{getItems(items)}</Row>
    </Form>
  )
}

export default AntdToForm;
