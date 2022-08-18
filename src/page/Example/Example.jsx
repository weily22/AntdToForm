import React, { useEffect, useState } from 'react';
import {Modal, Form, Row, Col, Input, DatePicker, Button, message, Switch} from 'antd';
import Add from './Add';
import {addProject, getUserList} from "./service";
import BaseForm from "../BaseForm";
import SelectComp from "../../components/SelectComp/SelectComp";
import dayjs from "dayjs";

const projectStatusOptions = [
  { label: '未开始', value: '0' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' },
]
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Example = () => {
  const [ visible, setVisible ] = useState(false);
  const [options, setOptions] = useState([]);
  const add = () => {
    setVisible(true);
  }
  const onSearchHandle = async (v) => {
    const rst = await getUserList(v);
    if (rst.code === 0) {
      setOptions(rst.result)
    }
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
      valuePropsFunc: (value) => ({
        endDateStart: dayjs(value[0]).format("YYYY-MM-DD hh:mm:ss"),
        endDateEnd: dayjs(value[1]).format("YYYY-MM-DD hh:mm:ss"),
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
  const addModalProps = {
    visible,
    itemsData,
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
      <BaseForm itemsData={itemsData} />
    </div>
  )
}

export default Example;
