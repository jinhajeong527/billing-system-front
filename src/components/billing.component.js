import React, { Component } from "react";
import BillingService from "../services/billing.service";
export default class Billing extends Component {
    constructor(props) {
        super(props);
        this.getBillingInfo = this.getBillingInfo.bind(this);
        this.state = {
            meteringList: [],
            calculatedTotalHourPerCore: 0,
            totalFee: 0.0,
            totalCore: 0,
            usedCorePerHour: 0,
            productId: 6,
            targetYear: 2021,
            targetMonth: 7
        };
    }
    componentDidMount() {
        this.getBillingInfo();
    }
    getBillingInfo() {
        var data = {
            productId: this.state.productId,
            targetYear: this.state.targetYear,
            targetMonth: this.state.targetMonth
        };
        BillingService.get(data)
        .then(response => {
            this.setState({
                meteringList: response.data.meteringList,
                calculatedTotalHourPerCore: response.data.calculatedTotalHourPerCore,
                usedCorePerHour : response.data.usedCorePerHour,
                totalFee: response.data.totalFee,
                totalCore: response.data.totalCore
            });
        })
        .catch(e => {
            console.log(e);
        });
    }
    render() {
        const { meteringList, calculatedTotalHourPerCore, totalFee, totalCore, usedCorePerHour} = this.state;
        return (
        <div>
            <div>
                <h4>사용량</h4>
                <div>
                <h5>{totalCore} (m)cores ({calculatedTotalHourPerCore} hours) = {usedCorePerHour} (m)cores/hour</h5>
                <h5>{totalFee} KRW</h5>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>프로젝트</th>
                            <th>호스트수 에이전트수 (m)cores URL 수</th>
                            <th>일시(UTC)</th>
                            <th>상세</th>
                        </tr>
                    </thead>
                    <tbody>
                    { meteringList && meteringList.map((meteringInfo) => (    
                        <tr key={meteringInfo.dateTime}>
                            <td>{meteringInfo.pname}({meteringInfo.pcode})</td>
                            <td>{meteringInfo.host} / {meteringInfo.agent} / {meteringInfo.mcore} / {meteringInfo.urls}</td>
                            <td>{meteringInfo.dateTime}</td>
                            <td>{meteringInfo.oids.map((oid, index) =>
                                <div key={index}>(oid:{oid.oid}),oname:{oid.oname},otype:{oid.otype},ip:{oid.ip},{oid.core}core,{oid.mcore}mcore</div>)}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
     }
    
}