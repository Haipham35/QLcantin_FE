import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {

    const [noidung, setNoidung] = useState(props.data.noidung);

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
                            <h5>Cập nhật thông báo</h5>
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
                                            if(noidung !== "" ){
                                                const notificationPayload = {
                                                    "noidung": noidung
                                                };
                                    
                                                const options = {
                                                    url: api.NOTIFICATION_EDITION+props.data.idthongbao,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(notificationPayload)
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
                                    
                                                            alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
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