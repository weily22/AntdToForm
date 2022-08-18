import React, {useEffect, useRef, useState} from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, message, Switch, Button} from 'antd';
import dayjs from 'dayjs';
import AntdToForm, { useFormData } from "../../components/AntdToForm";
import SelectComp from "../../components/SelectComp/SelectComp";
import {getUserList} from "./service";

const projectStatusOptions = [
  { label: '未开始', value: '0' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' },
]
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Add = (props = {}) => {
  const [form] = Form.useForm();
  const { editData = {}, itemsData = [], onOk = () => {}, onCancel = () => {} } = props;
  const [options, setOptions] = useState([]);
  const { submit, reset } = useFormData({
    form,
    valuePropsFuncMap: {
      startDate: (v) => ({ startDate: v ? dayjs(v).format("YYYY-MM-DD hh:mm:ss") : null }),
      endDate: (v) => {
        return ({
          endDateStart: dayjs(v[0]).format("YYYY-MM-DD hh:mm:ss"),
          endDateEnd: dayjs(v[1]).format("YYYY-MM-DD hh:mm:ss"),
        })
      },
      isShow: (v) => ({
        isShow: v ? 'Y' : 'N',
      })
    }
  })

  const onSubmit = async () => {
    const values = await submit();
    onOk(values);
  }
  const cancel = () => {
    onCancel();
    reset();
  }

  return (
    <Modal
      title={`${editData.id? '编辑项目': '新增项目'}`}
      visible={props.visible}
      onOk={onSubmit}
      onCancel={cancel}
      width={800}
      forceRender
    >
      <AntdToForm
        useRow
        rowProps={{ gutter: 20 }}
        form={form}
        items={itemsData}
      />
  </Modal>)
}

export default Add;