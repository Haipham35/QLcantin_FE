import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {
 
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [confirm_password, setconfirm_password] = useState("");
    const [full_name, setfull_name] = useState("");
    const [email, setemail] = useState("");
    const [role, setrole] = useState("user");

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h5>Thêm người dùng </h5>
                            <hr />
                            <Row>
                            <Col md={6}>
                                   
                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Tên tài khoản</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Tên tài khoản"
                                           value={username}
                                           onChange={(event) => { setusername(event.target.value) }}
                                       />
                                   </Form.Group>

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
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Mật khẩu"
                                            value={password}
                                            onChange={(event) => { setpassword(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nhập lại mật khẩu"
                                            value={confirm_password}
                                            onChange={(event) => { setconfirm_password(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicSelect">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control
                                          as="select"
                                          value={role}
                                          onChange={e => {

                                            setrole(e.target.value);
                                          }}
                                        >
                                            <option value="user">USER</option>
                                            <option value="admin">ADMIN</option>
                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="primary"
                                        onClick={() => {
                                            if ( username !== "" && password !== "" ) {
                                                const client_admin_details = {
                                                    "username": username,
                                                    "password": password,
                                                    "email": email,
                                                    "role": role,
                                                    "full_name": full_name,
                                                };

                                                const options = {
                                                    url: api.USER_CREATION,
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(client_admin_details)
                                                };


                                                axios(options)
                                                    .then(response => {

                                                        if (response.data == "username already exist") {

                                                            alert("User (" + username + ") already exist")
                                                        }

                                                        else {

                                                            props.callback()

                                                        }


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

                                                alert("Không được để trống thông tin")

                                            }


                                        }}
                                    >
                                        Tạo
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