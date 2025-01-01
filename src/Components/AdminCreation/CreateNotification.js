import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {
 
    const [noidung, setNoidung] = useState("");

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>

                        <Card.Body>
                            <h5>Thêm hạng mục</h5>
                            <hr />
                            <Row>
                                <Col md={12}>
                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Nội dung</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Nội dung"
                                           value={noidung}
                                           onChange={(event) => { setNoidung(event.target.value) }}
                                       />
                                   </Form.Group>
                                </Col>

                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="primary"
                                        onClick={() => {
                                            if ( noidung !== "") {
                                                const notificationPayload = {
                                                    "noidung": noidung
                                                };

                                                const options = {
                                                    url: api.NOTIFICATION_CREATION,
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(notificationPayload)
                                                };


                                                axios(options)
                                                    .then(response => {

                                                        if (response.data == "notification already exist") {

                                                            alert("Category (" + noidung + ") already exist")
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