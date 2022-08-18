import React, { useEffect, useState } from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, Switch, Button} from 'antd';
import {useFormData} from "./useFormData";

const { Item } = Form;
const AntdToForm = (props) => {
  const valueMap = {};
  const {
    form,
    onFinish = () => {},
    useRow = false,
    columns = 2, // 分为几列
    rowProps = {},
    items = [],
    formProps = {},
    btns = [],
  } = props;
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
      const itemsDom = <Item key={name} {...formItemProps}>{ comp ? comp : <Input placeholder="请输入" /> }</Item>
      if (useRow) {
        return <Col span={Math.floor(24/columns)} key={i}>{itemsDom}</Col>;
      } else {
        return itemsDom;
      }
    })
  }


  const onSubmit = () => {
    console.log("valueMap", valueMap)
    form.validateFields().then((values) => {
      onFinish(values)
    })
  }

  const renderFormItem = () => {
    if (useRow) {
      return (
        <Row {...rowProps}>{getItems(items)}</Row>
      )
    } else {
      return getItems(items);
    }
  }

  const renderBtns = () => {
    if (!btns) return null;
    if (btns instanceof Array) {
      if (btns.length === 0) {
        const { labelCol = {}, wrapperCol = {} } = formProps;
        const tailLayout = {
          wrapperCol: { offset: labelCol.span || 0, span: wrapperCol.span || 24 },
        };
        return <Form.Item {...tailLayout}><Button type="primary" htmlType="submit">提交</Button></Form.Item>
      } else {
        return btns;
      }
    } else {
      return null
    }
  }

  return (
    <Form form={form} {...formProps} onFinish={onFinish}>
      {renderFormItem()}
      {renderBtns()}
    </Form>
  )
}

export default AntdToForm;
