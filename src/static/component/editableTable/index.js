import React from 'react';
import './index.css';

class EditableTable extends React.Component {
    componentDidMount = () => {
        //文字无缝滚动
        this.industryNews = setInterval(this.taskIndustryNews, 50);
    }
    taskIndustryNews = () => {
        if (this.refs.newDiv.scrollTop >= this.refs.newDivUI.offsetHeight - this.refs.newDiv.clientHeight) {
            this.refs.newDiv.scrollTop = 0;
        }
        else {
            this.refs.newDiv.scrollTop += 1;
        }
    }
    handleIndustryNewsEnter = () => {
        clearInterval(this.industryNews);
    }
    handleIndustryNewsLeave = () => {
        this.industryNews = setInterval(this.taskIndustryNews, 50);
    }
    componentWillUnmount = () => {
        clearInterval(this.industryNews);
    }


    render() {
        const averageWidth = 100/this.props.columns.length + '%'
        return (
            <div className='ceShiTable'>
                <div className='ceShiTable-title'>
                    {
                        this.props.columns.map((item,index) => {
                            return (
                                <span className='ceShiTable-text2' key={index} style={{width:averageWidth}}>{item.title}</span>
                            )
                        })
                    }
                </div>
                <div
                    ref='newDiv'
                    className='ceShiTable-body'
                    onMouseEnter={this.handleIndustryNewsEnter.bind(this)}
                    onMouseLeave={this.handleIndustryNewsLeave.bind(this)}
                >
                    <ul ref='newDivUI'>
                        {this.props.data && this.props.data.length > 0
                            ?
                            this.props.data.map(this.tableBody)
                            : <span className='noData'>暂无数据</span>
                        }
                    </ul>
                </div>
            </div>
        );
    }

    tableBody = (dataItem, dataIndex) => {
        let averageWidth = 100/this.props.columns.length + '%'
        return (
            <li key={dataIndex}>
                {
                    this.props.columns.map((columnsItem,columnsIndex)=>{
                        return (
                            <span className='ceShiTable-text2' key={columnsIndex} style={{width:averageWidth}}>
                                {dataItem[columnsItem.key]}
                            </span>
                        )
                    })
                }
            </li>
        );
    }


}
export default EditableTable;