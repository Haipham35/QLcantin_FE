import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import Modal from 'react-modal';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'
import CreateOrder from './CreateOrder';

import Aux from "../../hoc/_Aux";

const customStyles = {
    content: {
        top: '40%',
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        maxHeight: "90%"
    },
    overlay: { zIndex: 1000 }
};

const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxHeight: "90%"
    },
    overlay: { zIndex: 1000 }
};

function FormsElements(props) {

    const [full_name, setfull_name] = useState("");
    const [email, setemail] = useState("");
    const [phone_number, setphone_number] = useState("");

    const [modalIsOpen, setIsOpen] = useState(false);
    const [flag, setflag] = useState('');

    useEffect(() => {
        const getUserInfo = {
            url: api.USER_DETAIL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
        }
        axios(getUserInfo)
            .then(response => {
                let userInfo = response.data;
                setfull_name(userInfo.full_name);
                localStorage.setItem('full_name', userInfo.full_name);
                setemail(userInfo.email);
                setphone_number(userInfo.phone_number);
            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                else {
                    alert(e.message)
                }

            });
        }, [flag])

    function closeModal() {
        setIsOpen(false);
    }

    function getResponse(result) {
        setIsOpen(false);
        setflag(!flag)
    }

    return (
        <Aux>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={props.windowWidth >= 700 ? customStyles : customStyles2}
                                contentLabel="Example Modal"
                                backdrop="static"
                                shouldCloseOnOverlayClick={false}
                            >
                                <CreateOrder
                                    callback={getResponse}
                                />
                            </Modal>

                            <div style={{ display: "flex", justifyContent: 'center' }}>
                                <Button
                                    variant={"primary"}
                                    style={{ fontWeight: 'bold', fontSize: 17 }}
                                    onClick={(e) => {
                                        setIsOpen(true)
                                    }}
                                >
                                    + Tạo hóa đơn
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        {
                        <Card.Body>
                            <h5>Thông tin cá nhân</h5>
                            <hr />
                            <Row>
                              
                            <Col md={6}>
                                   
                                   <Form.Group controlId="name">
                                       <Form.Label>Họ và tên</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Họ và tên"
                                           value={full_name}
                                           onChange={(event) => { setfull_name(event.target.value) }}
                                       />
                                   </Form.Group>

                                   <Form.Group controlId="email">
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
                                   
                                    <Form.Group controlId="phone">
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
                                                const userInfoPayload = {
                                                    "full_name": full_name,
                                                    "email": email,
                                                    "phone_number": phone_number
                                                };
                                    
                                                const options = {
                                                    url: api.USER_INFO_CHANGE,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(userInfoPayload)
                                                };
                                                axios(options)
                                                    .then(response => {
                                                        alert("Sửa thông tin thành công!")
                                                    })
                                    
                                                    .catch(function (e) {
                                                        if (e.message === 'Network Error') {
                                                            alert("No Internet Found. Please check your internet connection")
                                                        }
                                    
                                                        else {
                                                            alert(e.message)
                                                        }
                                                    });
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

export default windowSize(FormsElements);