import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import Modal from 'react-modal';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function ChangePass(props) {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        {
                        <Card.Body>
                            <Row>
                            <Col md={6}>
                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Mật khẩu cũ</Form.Label>
                                       <Form.Control
                                           type="password"
                                           value={oldPassword}
                                           onChange={(event) => { setOldPassword(event.target.value) }}
                                       />
                                   </Form.Group>

                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Mật khẩu mới</Form.Label>
                                       <Form.Control
                                           type="password"
                                           value={newPassword}
                                           onChange={(event) => { setNewPassword(event.target.value) }}
                                       />
                                   </Form.Group>

                               </Col>


                                <Col md={6}>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(event) => { setConfirmPassword(event.target.value) }}
                                        />
                                    </Form.Group>

                                </Col>

                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="primary"
                                        onClick={() => {
                                            if(oldPassword !== "" && newPassword !== "" && confirmPassword !== ""){
                                                if(newPassword !== confirmPassword) {
                                                    alert("Mật khẩu nhập lại không khớp")
                                                }
                                                else {
                                                    const changePassPayload = {
                                                        "currentPassword": oldPassword,
                                                        "newPassword": newPassword
                                                    };

                                                    const options = {
                                                        url: api.USER_PASSWORD_CHANGE,
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                        },
                                                        data: JSON.stringify(changePassPayload)
                                                    };
                                                    axios(options)
                                                        .then(response => {
                                                            alert("Thay đổi mật khẩu thành công!")
                                                        })

                                                        .catch(function (e) {
                                                            if (e.message === 'Network Error') {
                                                                alert("No Internet Found. Please check your internet connection")
                                                            }

                                                            else {
                                                                alert("Mật khẩu cũ không đúng")
                                                            }
                                                        });
                                                }

                                            }

                                            else {
                                                alert("Please fill out all required fields.")
                                            }


                                        }}
                                    >
                                        Sửa
                                            </Button>
                                </div>
                            </Row>
                        </Card.Body>
                    }
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default windowSize(ChangePass);