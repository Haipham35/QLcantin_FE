import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {

    const [name, setName] = useState(props.data.name);
    const [description, setDescription] = useState(props.data.description);

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
                            <h5>Cập nhật hạng mục</h5>
                            <hr />
                            <Row>
                              
                            <Col md={12}>
                                   
                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Tên hạng mục</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Tên hạng mục"
                                           value={name}
                                           onChange={(event) => { setName(event.target.value) }}
                                       />
                                   </Form.Group>

                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Mô tả</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Mô tả"
                                           value={description}
                                           onChange={(event) => { setDescription(event.target.value) }}
                                       />
                                   </Form.Group>

                               </Col>

                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="primary"
                                        onClick={() => {
                                            if(name !== "" ){
                                                const categoryPayload = {
                                                    "name": name,
                                                    "description": description,
                                                };
                                    
                                                const options = {
                                                    url: api.CATEGORY_EDITION+props.data.category_id,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(categoryPayload)
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