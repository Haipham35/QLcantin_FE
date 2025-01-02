import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {

    const [full_name, setfull_name] = useState(props.data.full_name);
    const [email, setemail] = useState(props.data.email);
    const [phone_number, setphone_number] = useState(props.data.phone_number);
    const [role, setrole] = useState(props.data.role);



    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        {/* <Card.Header>
                                <Card.Title as="h5">CREATE NEW AGENCY </Card.Title>
                                <hr/>

                            </Card.Header> */}
                        <Card.Body>
                            <h5>Cập nhật thông tin người dùng</h5>
                            <hr />
                            <Row>
                              
                            <Col md={6}>
                                   
                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Họ và tên</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Họ và tên"
                                           value={full_name}
                                           onChange={(event) => { setfull_name(event.target.value) }}
                                       />
                                   </Form.Group>

                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Email</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Email"
                                           value={email}
                                           onChange={(event) => { setemail(event.target.value) }}
                                       />
                                   </Form.Group>

                               </Col>


                                <Col md={6}>
                                   
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Số điện thoại"
                                            value={phone_number}
                                            onChange={(event) => { setphone_number(event.target.value) }}
                                        />
                                    </Form.Group>

                                </Col>

                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="primary"
                                        onClick={() => {
                                            if(full_name !== "" ){
                                                const stock_details = {
                                                    "full_name": full_name,
                                                    "email": email,
                                                    "phone_number": phone_number,
                                                    "role": role,
                                                };
                                    
                                                const options = {
                                                    url: api.USER_EDITION+props.data.user_id,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(stock_details)
                                                };
                                                axios(options)
                                                    .then(response => {
                                                        props.callback()

                                                    })
                                    
                                                    .catch(function (e) {
                                                        props.callback()
                                                        if (e.message === 'Network Error') {
                                                            alert("No Internet Found. Please check your internet connection")
                                                        }
                                    
                                                        else {
                                                            alert(e.message)
                                                        }
                                                       
                                    
                                                    });
                                            }

                                            else {
                                                alert("Hãy điền đủ thông tin")
                                            }


                                        }}
                                    >
                                        Sửa
                                            </Button>

                                    <Button variant="primary"
                                        onClick={() => {
                                            props.callback()
                                        }}>
                                        Hủy
                                            </Button>

                                </div>


                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default windowSize(FormsElements);