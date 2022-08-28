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
            totalCore: 0
        };
    }
    componentDidMount() {
        this.getBillingInfo();
    }
    getBillingInfo() {
        BillingService.get()
        .then(response => {
            this.setState({
                meteringList: response.data.meteringList,
                calculatedTotalHourPerCore: response.data.calculatedTotalHourPerCore,
                totalFee: response.data.totalFee,
                totalCore: response.data.totalCore
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    render() {
        const { meteringList, calculatedTotalHourPerCore, totalFee, totalCore} = this.state;
        return (
        <div>
            <div>
                <h4>사용량</h4>
                <div>
                <h5>{totalCore} (m)cores({calculatedTotalHourPerCore} hours)</h5>
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
                        <tr>
                            <td>{meteringInfo.pname}({meteringInfo.pcode})</td>
                            <td>{meteringInfo.host} / {meteringInfo.agent} /
                            {meteringInfo.mcore} / {meteringInfo.urls}</td>
                            <td>{meteringInfo.dateTime}</td>
                            <td>{meteringInfo.oids.map(oid =>
                                <div>{oid.oid},{oid.oname},{oid.otype},{oid.ip},{oid.core},{oid.mcore}</div>)}
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