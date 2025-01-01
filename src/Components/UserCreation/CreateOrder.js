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
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const getProducts = {
            url: api.USER_PRODUCT_LIST,
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
                    alert(e.message)
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
                                <Col md={12}>
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
                                   <h5>Khách hàng: {localStorage.getItem("full_name")}</h5>
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

                            <hr/>
                            <div style={{ marginLeft: 15, textAlign: "center" }}>
                                <Button variant="primary"
                                    onClick={() => {
                                        if (selectedItems.length > 0) {
                                            const orderPayload = {
                                                "user_id": localStorage.getItem("user_id"),
                                                "items": selectedItems
                                            };

                                            const options = {
                                                url: api.USER_ORDER_CREATION,
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                },
                                                data: JSON.stringify(orderPayload)
                                            };


                                            axios(options)
                                                .then(response => {
                                                    alert("Đặt đơn thành công");
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