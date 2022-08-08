import React, {useEffect, useRef, useState} from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, message, Switch} from 'antd';
import day from 'day';
import AntdToForm from "../../components/AntdToForm";
import SelectComp from "../../components/SelectComp/SelectComp";
import { getUserList } from "./service";

const projectStatusOptions = [
  { label: '未开始', value: '0' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' },
]
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Add = (props = {}) => {
  const myForm = useRef();
  const { editData = {}, onOk = () => {}, onCancel = () => {} } = props;
  const [options, setOptions] = useState([]);

  const onSearchHandle = async (v) => {
    const rst = await getUserList(v);
    if (rst.code === 0) {
      setOptions(rst.result)
    }
  }
  const onSubmit = () => {
    onOk();
  }
  const cancel = () => {
    onCancel();
  }
  const onFinish = (v) => {
    console.log(v)
  }

  const itemsData = [
    {
      name: 'projectId',
      label: 'Project ID',
      rules: [{required: true, message: "请输入正确的项目id"}],
    },
    {
      name: 'jdeCode',
      label: 'JDE Code',
      comp: <Input placeholder="请输入" />,
    },
    {
      name: 'projectLeader',
      label: 'Project Leader',
      comp: <SelectComp
        placeholder="请搜索"
        showSearch
        allowClear
        mode="multiple"
        options={options}
        filterOption={false}
        onSearch={onSearchHandle}
        fieldsProps={{ value: 'id', label: 'name' }}
        notFoundContent={null}
      />,
    },
    {
      name: 'projectStatus',
      label: '项目状态',
      required: true,
      comp: <SelectComp placeholder="请选择" options={projectStatusOptions} />,
    },
    {
      name: 'startDate',
      label: '项目开始时间',
      required: true,
      comp: <DatePicker placeholder="选择日期" style={{width: '100%'}} />,
    },
    {
      name: 'endDate',
      label: '结束时间段',
      required: true,
      comp: <RangePicker />,
      valueProps: (value) => ({
        endDateStart: day(value[0]).format("YYYY-MM-DD hh:mm:ss"),
        endDateEnd: day(value[1]).format("YYYY-MM-DD hh:mm:ss"),
      })
    },
    {
      name: 'isShow',
      label: '是否展示该项目',
      comp: <Switch />,
      itemProps: {
        valuePropName: 'checked'
      }
    },
    {
      name: 'remark',
      label: '备注',
      comp: <TextArea rows={4} placeholder="请输入" maxLength={200} />,
    },
  ];
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
        ref={myForm}
        items={itemsData}
        onFinish={onFinish}
        colSpan={12}
        rowGutter={20}
      />
  </Modal>)
}

export default Add;