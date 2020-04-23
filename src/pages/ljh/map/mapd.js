import * as React from "react";
import "./index.css";
import i1 from "./images/11.png";
import i2 from "./images/12.png";
import i3 from "./images/13.gif";
import c1 from "./images/21.png";
import c2 from "./images/22.png";
import c3 from "./images/23.gif";
import h1 from "./images/31.png";
import h2 from "./images/32.png";
import h3 from "./images/33.gif";
import q1 from "./images/41.png";
import q2 from "./images/42.png";
import q3 from "./images/43.gif";
import detailPic from "./images/detail.png";
import { message } from 'antd';
const AMap = window.AMap;
export default class mapd extends React.Component {
    state = {
        datai1: [],
        datai2: [],
        datai3: [],
        datac1: [],
        datac2: [],
        datac3: [],
        datah1: [],
        datah2: [],
        datah3: [],
        dataq1: [],
        dataq2: [],
        dataq3: [],
        t1:0,
        t2:0,
        requestLoading: true,
    }

    componentDidMount() {
        this.map = new AMap.Map("container", {
            center: [118.674413, 37.433808],//东营市政府
            zoom: 15,
            resizeEnable: true,
        });
        this.geocoder = new AMap.Geocoder({
            city: "370500", //城市设为东营
        });
        this.setData(global.constants.mapData);
        // let params={}
        // fetchPost(global.constants.porjectList,params)
        //     .then(
        //         res => this.setData(res)
        //     )
        //     .catch(e => console.log(e))
        //     .finally(() => {
        //         this.setState({
        //             requestLoading: false
        //         })
        //     })

        this.displayMakers()

    }
    displayMakers=()=>{
        const {datai1,datai2,datai3,datac1,datac2,datac3,datah1,datah2,datah3,dataq1,dataq2,dataq3}=this.state;

        this.map.clearMap();
        let dataplus=[];

        if(this.state.t1===0){
            dataplus=[datai1,datai2,datai3,datac1,datac2,datac3,datah1,datah2,datah3,dataq1,dataq2,dataq3];
        } else if(this.state.t1===1){
            dataplus=[datai1,datai2,datai3];
        } else if(this.state.t1===2){
            dataplus=[datac1,datac2,datac3];
         } else if(this.state.t1===3){
            dataplus=[datah1,datah2,datah3];
        } else if(this.state.t1===4){
            dataplus=[dataq1,dataq2,dataq3];
        }

        dataplus.map((data)=>{
            this.map.add(data);
        })

        let dataminus=[];
        if(this.state.t2===1){
            dataminus=[datai2,datai3,datac2,datac3,datah2,datah3,dataq2,dataq3];
        } else if(this.state.t2===2){
            dataminus=[datai1,datai3,datac1,datac3,datah1,datah3,dataq1,dataq3];
        } else if(this.state.t2===3){
            dataminus=[datai1,datai2,datac1,datac2,datah1,datah2,dataq1,dataq2];
        }
        dataminus.map((data)=>{
            this.map.remove(data);
        })
    }
    onlyDisplay=(t1)=>{
        this.setState({t1:t1},()=>{ this.displayMakers()});
    }
    onlyDisplay1=(t2)=>{
        this.setState({t2:t2},()=>{ this.displayMakers()});
    }
    changePosition =(address)=>{
        let marker = new AMap.Marker();
        this.geocoder.getLocation(address, (status, result)=> {
            if (status === 'complete' && result.geocodes.length) {
                var lnglat = result.geocodes[0].location
                marker.setPosition(lnglat);
                this.map.setFitView(marker);
            }else{
                message.info('根据地址查询位置失败');
            }
        })
    }
    markerClick = (e) => {
        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        infoWindow.setContent("<span style='font-size:20px;font-weight:bold;'>" + e.target.content + "</span>");
        infoWindow.open(this.map, e.target.getPosition());
    }
    //赋予表格数据
    setData = (list) => {
        list.map((item, index) => {
            let oms=["个体","公司","合作社","其他"];
            let icons=[i1,i2,i3,c1,c2,c3,h1,h2,h3,q1,q2,q3];
            let data=[this.state.datai1,this.state.datai2,this.state.datai3,
                this.state.datac1,this.state.datac2,this.state.datac3,
                this.state.datah1,this.state.datah2,this.state.datah3,
                this.state.dataq1,this.state.dataq2,this.state.dataq3];
            let k=0;
            for(let i=0;i<oms.length;i++){
                for(let j=1;j<=3;j++){
                    if (item.operationMode === oms[i] && item.businessState === j) {
                        let ll = item.point.split(",");
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(ll[0], ll[1]),
                            icon: icons[k],
                        });
                        marker.content = "a";
                        marker.on('click', this.markerClick);
                        marker.emit('click', {target: marker});
                        data[k].push(marker);
                    }
                    k++;
                }
            }

        })

    }


    render() {
        return (
            <div>
                <div id="container" style={{width: "1010px", height: "620px"}}></div>
                <div id="input-card">
                    <div style={{height:"25px",background: "#000", color: "#99FFFF",padding:"2px"}}>
                        &nbsp;&nbsp;企业定位坐标</div>
                    <div className="input-item">
                        <span className="locationTitle">&nbsp;&nbsp;个&nbsp;&nbsp;&nbsp;&nbsp;体</span>：
                        新增&nbsp;<img className="smallImg" alt="" src={i1}/>&nbsp;&nbsp;
                        正常&nbsp;<img className="smallImg" alt="" src={i2}/>&nbsp;&nbsp;
                        异常&nbsp;<img className="smallImg" alt="" src={i3}/>
                    </div>
                    <div className="input-item">
                        <span className="locationTitle">&nbsp;&nbsp;公&nbsp;&nbsp;&nbsp;&nbsp;司</span>：
                        新增&nbsp;<img className="smallImg" alt="" src={c1}/>&nbsp;&nbsp;
                        正常&nbsp;<img className="smallImg" alt="" src={c2}/>&nbsp;&nbsp;
                        异常&nbsp;<img className="smallImg" alt="" src={c3}/>
                    </div>
                    <div className="input-item">
                        <span className="locationTitle">&nbsp;&nbsp;合作社</span>：
                        新增&nbsp;<img className="smallImg" alt="" src={h1}/>&nbsp;&nbsp;
                        正常&nbsp;<img className="smallImg" alt="" src={h2}/>&nbsp;&nbsp;
                        异常&nbsp;<img className="smallImg" alt="" src={h3}/>
                    </div>
                    <div className="input-item">
                        <span className="locationTitle">&nbsp;&nbsp;其&nbsp;&nbsp;&nbsp;&nbsp;他</span>：
                        新增&nbsp;<img className="smallImg" alt="" src={q1}/>&nbsp;&nbsp;
                        正常&nbsp;<img className="smallImg" alt="" src={q2}/>&nbsp;&nbsp;
                        异常&nbsp;<img className="smallImg" alt="" src={q3}/>
                    </div>
                </div>
                <div id="companyInfo">
                    <div className={"bottomGrayBox"}>&nbsp;&nbsp;<img src={detailPic}/>数据信息</div>
                </div>
            </div>
        )
    }
}
