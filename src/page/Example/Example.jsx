import React, { useEffect, useState } from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, Button, message} from 'antd';
import Add from './Add';
import { addProject } from "./service";

const { Item } = Form;
const Example = (props) => {
  const [ visible, setVisible ] = useState(false);
  const add = () => {
    setVisible(true);
  }
  const addModalProps = {
    visible,
    onOk: async (params) => {
      const rst = await addProject(params);
      if (rst.code === 0) {
        message.success("添加成功");
        setVisible(false);
      }
    },
    onCancel: () => {
      setVisible(false);
    }
  }
  return (
    <div style={{margin: "20px 50px"}}>
      <Button type="primary" block onClick={add}>新增 modal Form</Button>
      <Add {...addModalProps}/>
    </div>
  )
}

export default Example;
