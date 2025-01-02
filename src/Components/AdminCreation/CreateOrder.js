import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios';
import MaterialTable from 'material-table';
import Modal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert';
import * as api from '../Configurations/Api_Details'

import Aux from "../../hoc/_Aux";

function FormsElements(props) {

    const [loader, setLoader] = useState(1);
    const [flag, setFlag] = useState('');
    const [status, setStatus] = useState("Đã thanh toán");
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState({"user_id": "", "full_name": "Chưa chọn khách hàng"});
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const getUserList = {
            url: api.USER_LIST,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
        }
        axios(getUserList)
            .then(response => {
                setUsers(response.data)
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

    useEffect(() => {
        const getProducts = {
            url: api.PRODUCT_LIST,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
        }
        axios(getProducts)
            .then(response => {
                setItems(response.data)
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

    function getItemById(items, item_id) {
      const product = items.find((element) => {
        return element.item_id == item_id;
      });

      return product || null;
    }

    function deleteItem(items, val) {
        return items.filter(item => item.item_id != val.item_id);
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h5>Tạo hóa đơn </h5>
                            <hr />
                            <Row>
                                <Col md={6}>
                                   <MaterialTable
                                       title="Chọn khách hàng"
                                       columns={[
                                           { title: 'Username', field: 'username', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.username}</h5>) } },
                                           { title: 'Tên khách hàng', field: 'full_name', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.full_name}</h5>) } }
                                       ]}

                                       data={users}
                                       key={users.user_id}
                                       actions={[
                                           rowData => ({
                                               icon: "Select",
                                               tooltip: "Chọn",
                                               iconProps: { style: { color: "blue" } },
                                               onClick: (event, rowData) => {
                                                   setSelectedUser(rowData);
                                               }
                                           })
                                       ]}
                                       options={{
                                           actionsColumnIndex: -1,
                                           sorting: true,
                                           exportButton: true,
                                           pageSize: 3
                                       }}
                                       localization={{
                                           header: {
                                               actions: "Thao tác"
                                           }
                                       }}
                                   />
                                </Col>
                                <Col md={6}>
                                   <MaterialTable
                                       title="Chọn sản phẩm"
                                       columns={[
                                           { title: 'Tên sản phẩm', field: 'name', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.name}</h5>) } },
                                           { title: 'Số lượng còn lại', field: 'available_quantity', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.available_quantity}</h5>) } },
                                       ]}

                                       data={items}
                                       key={items.item_id}
                                       actions={[
                                           rowData => ({
                                               icon: '+',
                                               tooltip: 'Thêm',
                                               iconProps: { style: { color: "blue" } },
                                               onClick: (event, rowData) => {
                                                   let quantity = 1;
                                                   let newSelectedItems = [...selectedItems];

                                                   let existingItem = getItemById(selectedItems, rowData.item_id);
                                                   if(existingItem !== null) {
                                                       newSelectedItems = deleteItem(newSelectedItems, existingItem);
                                                       quantity = existingItem.quantity + 1;
                                                       if(quantity > rowData.available_quantity) {
                                                          alert("Vượt quá số lượng trong kho");
                                                          return;
                                                       }
                                                   }

                                                   let item = {
                                                       "item_id": rowData.item_id,
                                                       "product_name": rowData.name,
                                                       "quantity": quantity
                                                   }

                                                   setSelectedItems([item, ...newSelectedItems]);
                                               }
                                           })
                                       ]}
                                       options={{
                                           actionsColumnIndex: -1,
                                           sorting: true,
                                           exportButton: true,
                                           pageSize: 3
                                       }}
                                       localization={{
                                           header: {
                                               actions: "Thao tác"
                                           }
                                       }}
                                   />
                                </Col>
                            </Row>
                            <br/><br/>
                            <Row>
                                <Col md={12}>
                                   <h3>Chi tiết hóa đơn</h3>
                                   <br/>
                                   <h5>Khách hàng: {selectedUser.full_name}</h5>
                                   <MaterialTable
                                      title="Giỏ hàng"
                                      columns={[
                                          { title: 'Tên sản phẩm', field: 'product_name', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.product_name}</h5>) } },
                                          { title: 'Số lượng', field: 'quantity', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.quantity}</h5>) } },
                                      ]}

                                      data={selectedItems}
                                      key={selectedItems.item_id}
                                      actions={[
                                          rowData => ({
                                              icon: 'delete',
                                              tooltip: 'Xóa',
                                              iconProps: { style: { color: "red" } },
                                              onClick: (event, rowData) => {
                                                  setSelectedItems(deleteItem(selectedItems, rowData));
                                              }
                                          })
                                      ]}
                                      options={{
                                          actionsColumnIndex: -1,
                                          sorting: true,
                                          exportButton: true,
                                          pageSize: 5
                                      }}
                                      localization={{
                                          header: {
                                              actions: "Thao tác"
                                          }
                                      }}
                                  />
                                </Col>
                            </Row>

                            <br/>
                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId="formBasicSelect">
                                       <Form.Label>Trạng thái thanh toán</Form.Label>
                                       <Form.Control
                                         as="select"
                                         value={status}
                                         onChange={e => {

                                           setStatus(e.target.value);
                                         }}
                                       >
                                           <option value="Da Thanh Toan">Đã thanh toán</option>
                                           <option value="Ghi No">Ghi nợ</option>
                                       </Form.Control>
                                   </Form.Group>
                                </Col>
                            </Row>

                            <hr/>
                            <div style={{ marginLeft: 15, textAlign: "center" }}>
                                <Button variant="primary"
                                    onClick={() => {
                                    console.log(selectedUser);
                                    console.log(selectedItems);
                                        if (selectedUser.user_id !== "" && selectedItems.length > 0) {
                                            const orderPayload = {
                                                "user_id": selectedUser.user_id,
                                                "items": selectedItems,
                                                "status": status
                                            };

                                            console.log(orderPayload);

                                            const options = {
                                                url: api.ORDER_CREATION,
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                },
                                                data: JSON.stringify(orderPayload)
                                            };


                                            axios(options)
                                                .then(response => {
                                                    alert("Tạo hóa đơn thành công");
                                                    props.callback();
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default windowSize(FormsElements);