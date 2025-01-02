
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { BsCheck2All } from "react-icons/bs";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { BsCodeSlash } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

import Dashboard_order_by_type from './DBcomponents/Dashboard_alerts';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'
import ReactApexChart  from 'react-apexcharts'
import Avatar from "@material-ui/core/Avatar";
var moment = require('moment');

function Dashboard() {

    const [flag, setflag] = useState('');
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(1)
    const [revenue, setRevenue] = useState(0)
    const [expense, setExpense] = useState(0)
    const [data,setData]=useState([0, 0])

    const [screenlogic, setscreenlogic] = useState(1);


    let series=[{
        name: "",
        data: data
      }]

      let options={
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['CHI PHÍ', 'LỢI NHUẬN'],
        },
        yaxis: {
          title: {
            text: 'Thống kê doanh thu (ngàn đồng)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " STATISTIC"
            }
          }
        }
    }

    if (screenlogic == 0) {

        return (

            <div>
              <h1>Loading</h1>
            </div>
        )
    }

    else {

        return (
            <>

                <Aux >

                    <Card>
                        <Card.Body>
                            <Row>
                            <Col md={1}>
                               <Form.Group controlId="formBasicEmail">
                                   <Form.Label>Tháng</Form.Label>
                                   <Form.Control
                                       type="number"
                                       min="1"
                                       max="12"
                                       value={month}
                                       onChange={(event) => { setMonth(event.target.value) }}
                                   />
                               </Form.Group>
                            </Col>
                            <Col md={1}>
                               <Form.Group controlId="formBasicEmail">
                                   <Form.Label>Năm</Form.Label>
                                   <Form.Control
                                       type="number"
                                       min="1"
                                       value={year}
                                       onChange={(event) => { setYear(event.target.value) }}
                                   />
                               </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                               <div style={{ marginLeft: 15 }}>
                                   <Button variant="primary"
                                       onClick={() => {
                                           let dateRange = {
                                               "month": month,
                                               "year": year
                                           };

                                           const statistic = {
                                               url: api.REVENUE,
                                               method: 'POST',
                                               headers: {
                                                   'Content-Type': 'application/json',
                                                   'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                                               },
                                               data: JSON.stringify(dateRange)
                                           }
                                           axios(statistic)
                                           .then(response => {
                                               let info = response.data.data;
                                               let totalExpense = info.totalExpense/1000;
                                               let totalRevenue = info.totalRevenue/1000;
                                               setExpense(totalExpense);
                                               setRevenue(totalRevenue);
                                               setData([totalExpense, totalRevenue]);
                                           })
                                           .catch(function (e) {
                                               if (e.message === 'Network Error') {
                                                   alert("No Internet Found. Please check your internet connection")
                                               }
                                               else {
                                                   alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                               }

                                           });
                                   }}
                                   >
                                       Thống kê
                                   </Button>
                               </div>
                               </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Row >

                        <Col xl={4} lg={6} md={6} sm={12} xs={12} >
                            <Card style={{ borderRadius: 25 }}>
                                <Card.Body >
                                    <Row>
                                        <Col xl={4} lg={3} md={3} sm={3} xs={3} >
                                            <Avatar  style={{ height: '50px', width: '50px',backgroundColor:'white' }}>
                                                <BsFillClipboard2CheckFill className="ml-0" color="#2d47f7" size={38} />
                                            </Avatar>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                            <h6 className=" d-flex align-items-center m-b-1 ml-1" style={{ fontFamily: 'Poppins-SemiBold', fontSize: 28, lineHeight: 1.2 }}>{expense}</h6>
                                            <p className='m-b-0 ml-1 ' style={{ fontFamily: 'Poppins-M#5e72e4edium', fontSize: 16, lineHeight: 1.2, color: '#7e7e7e' }}>CHI PHÍ (ngàn đồng)</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xl={4} lg={6} md={6} sm={12} xs={12}>
                            <Card style={{ borderRadius: 25 }}>
                                <Card.Body >
                                    <Row>
                                        <Col xl={4} lg={3} md={3} sm={3} xs={3}>
                                            <Avatar sx={{ bgcolor: '#f4f6fd' }} style={{ height: '50px', width: '50px' ,backgroundColor:'white'}}>
                                                <BsCodeSlash className="ml-0" color="#2d47f7" size={38} />
                                            </Avatar>
                                        </Col>
                                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                                            <h6 className=" d-flex align-items-center m-b-1 ml-1" style={{ fontFamily: 'Poppins-SemiBold', fontSize: 28, lineHeight: 1.2 }}>{revenue}</h6>
                                            <p className='m-b-0 ml-1 ' style={{ fontFamily: 'Poppins-M#5e72e4edium', fontSize: 16, lineHeight: 1.2, color: '#7e7e7e' }}>LỢI NHUẬN (ngàn đồng)</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                    <div style={{width:"100%"}}>
  <ReactApexChart options={options} series={series} type="bar" height={350} />
</div>
                    </Row>
                </Aux>
            </>
        );
    }
}


export default Dashboard;