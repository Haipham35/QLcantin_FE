import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {
 
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [category_id, setCategoryId] = useState("");

    const [loader, setLoader] = useState(1);
    const [flag, setFlag] = useState('');
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const categoryRequest = {
            url: api.CATEGORY_LIST,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
        }
        axios(categoryRequest)
            .then(response => {
                setCategoryList(response.data);
            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                else {
                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                }

            });

    }, [flag])

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>

                        <Card.Body>
                            <h5>Thêm sản phẩm </h5>
                            <hr />
                            <Row>
                            <Col md={6}>
                                   
                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Tên sản phẩm</Form.Label>
                                       <Form.Control
                                           type="text"
                                           placeholder="Tên sản phẩm"
                                           value={name}
                                           onChange={(event) => { setName(event.target.value) }}
                                       />
                                   </Form.Group>

                                   <Form.Group controlId="formBasicEmail">
                                       <Form.Label>Giá</Form.Label>
                                       <Form.Control
                                           type="number"
                                           step="1000"
                                           min="0"
                                           placeholder="Giá"
                                           value={price}
                                           onChange={(event) => { setPrice(event.target.value) }}
                                       />
                                   </Form.Group>

                                   <Form.Group controlId="formBasicEmail">
                                      <Form.Label>Số lượng</Form.Label>
                                      <Form.Control
                                          type="number"
                                          step="1"
                                          min="1"
                                          placeholder="Số lượng"
                                          value={quantity}
                                          onChange={(event) => { setQuantity(event.target.value) }}
                                      />
                                  </Form.Group>
                               </Col>


                                <Col md={6}>
                                   
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Mô tả</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Mô tả"
                                            value={description}
                                            onChange={(event) => { setDescription(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicSelect">
                                        <Form.Label>Hạng mục</Form.Label>
                                        <Form.Control
                                          as="select"
                                          value={category_id}
                                          onChange={
                                              e => {
                                                setCategoryId(e.target.value);
                                              }
                                          }
                                        >
                                        {
                                            categoryList.map((category, id) => (
                                               <option key={id} value={category.category_id}>{category.name}</option>
                                              ))
                                        }
                                        </Form.Control>
                                    </Form.Group>

                                </Col>
                                <div style={{ marginLeft: 15 }}>
                                    <Button variant="primary"
                                        onClick={() => {
                                            if ( name !== "" && price >= 0 && quantity >= 1 && category_id !== "" ) {
                                                const productPayload = {
                                                    "name": name,
                                                    "price": price,
                                                    "available_quantity": quantity,
                                                    "description": description,
                                                    "category_id": category_id
                                                };

                                                const options = {
                                                    url: api.PRODUCT_CREATION,
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(productPayload)
                                                };


                                                axios(options)
                                                    .then(response => {

                                                        if (response.data == "product already exist") {

                                                            alert("Product (" + name + ") already exist")
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

                                                alert("Hãy điền đủ thông tin")

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