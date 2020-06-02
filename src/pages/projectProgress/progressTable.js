import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input,DatePicker, Button, Popconfirm, Form } from 'antd/lib/index';
import './index.css'
import moment from "moment";
import {fetchPost} from "../../static/util/fetch";
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          inputType,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {//日期类型特殊处理
        const value =inputType === 'date' ? moment(record[dataIndex], 'YYYY-MM-DD'):record[dataIndex];
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: value,
        });
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        const inputNode =inputType === 'date' ? <DatePicker ref={inputRef} onBlur={save} />
                                                : <Input ref={inputRef} onBlur={save} />;
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
            >
                {inputNode}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default class ProgressTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '进度名称',
                dataIndex: 'progressName',
                width: '30%',
                editable: true,
            },
            {
                title: '开始时间',
                dataIndex: 'beginTime',
                editable: true,
                inputType:'date',
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                editable: true,
                inputType:'date',
            },
            {
                title: '遇到的问题',
                dataIndex: 'problem',
                editable: true,
            },
            {
                title: '解决方案',
                dataIndex: 'solution',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
     // this.props.onRef(this)
    }
    state={
        dataSource: [],
    }
    componentDidMount() {
        this.loadData();

    }
    loadData=()=>{
        let params={ projectId : this.props.pid };
        this.requestProgress(global.constants.progressList,params);
    }


    requestProgress = (url,params) =>{

        fetchPost(url,params)
            .then(
                res => this.setProgressData(res)
            )
            .catch(e => console.log(e))
            .finally(() => {
                this.setState({
                    requestLoading: false
                })
            })
    }
    setProgressData = (list) => {
        this.setState({
            dataSource: list.map((item, index) => {
                return {
                    ...item,
                    beginTime:moment(parseInt(item.beginTime)).format("YYYY-MM-DD"),
                    endTime:moment(parseInt(item.endTime)).format("YYYY-MM-DD"),
                    key: index

                }
            }),

        })
        this.props.reloadGant();
        //message.info("保存成功！")
    }
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        let params={
            projectId : this.props.pid,
            id:dataSource[key].id,
        };
        this.requestProgress(global.constants.deleteProgress,params);
    };

    handleAdd = () => {
        let params={
            projectId : this.props.pid,
            beginTime:new Date(),
            endTime:new Date(),
        };
        this.requestProgress(global.constants.addProgress,params);
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
       let params={
           projectId : this.props.pid,
           id : row.id,
           progressName:row.progressName,
           beginTime:row.beginTime,
           endTime:row.endTime,
           problem:row.problem,
           solution:row.solution,
       };
        this.requestProgress(global.constants.updateProgress,params);
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                   新增
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}
