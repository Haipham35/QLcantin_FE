import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Modal from 'react-modal';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../Configurations/Api_Details'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import ApprovalIcon from '@mui/icons-material/Approval';
import windowSize from 'react-window-size';
import { Switch } from '@material-ui/core';
import CreateOrder from './CreateOrder';

import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";
import {
    Button,

} from 'react-bootstrap';

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

Modal.setAppElement('#root')

function CustomEditComponent(props) {

    const [loader, setloader] = useState(1);
    const [flag, setflag] = useState('');
    const [data, setdata] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editstockdata, seteditstockdata] = useState([]);


    useEffect(() => {
        const getStocksData = {
            url: api.ORDER_LIST,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
        }
        axios(getStocksData)
            .then(response => {
                setdata(response.data)
            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                else {
                    alert(e.message)
                }

            });



    }, [flag]

    )


    function closeModal() {
        setIsOpen(false);

    }

    function getResponse(result) {
        setIsOpen(false);
        setflag(!flag)
    }


    if (loader == 0) {

        return (
            <div>
                <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" style={{ backgroundColor: 'white' }}>
                    <CircularProgress color="secondary" size={70} />
                    <h1 style={{ marginLeft: 40 }}>Loading...</h1>
                </Box>
            </div>
        )
    }

    else {
        return (
            <div>
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

                <MaterialTable
                    title="Quản lý hóa đơn"
                    columns={[
                        { title: 'Mã khách hàng', field: 'user_id', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.user_id}</h5>) } },
                        { title: 'Giá trị', field: 'total_amount', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.total_amount}</h5>) } },
                        { title: 'Trạng thái', field: 'status', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.status}</h5>) } },
                        { title: 'Ngày tạo', field: 'created_at', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.created_at}</h5>) } },
                    ]}

                    data={data}
                    key={data.order_id}
                    actions={[
                        rowData => ({
                            icon: ApprovalIcon,
                            tooltip: 'Phê duyệt',
                            iconProps: { style: { color: "blue" } },
                            hidden: rowData.status !== "Chưa xác nhận",
                            onClick: (event, rowData) => {
                                confirmAlert({
                                    title: 'Phê duyệt hóa đơn',
                                    message: 'Chọn trạng thái',
                                    buttons: [
                                        {
                                            label: 'Đã thanh toán',
                                            onClick: () => {
                                                const approvalPayload = {
                                                    "status": "Da Thanh Toan"
                                                };
                                                const options = {
                                                    url: api.ORDER_APPROVAL + rowData.order_id,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(approvalPayload)
                                                };

                                                axios(options)
                                                    .then(response => {
                                                        setflag(!flag)

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
                                        },
                                        {
                                            label: 'Ghi nợ',
                                            onClick: () => {
                                                const approvalPayload = {
                                                    "status": "Ghi No"
                                                };
                                                const options = {
                                                    url: api.ORDER_APPROVAL + rowData.order_id,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    },
                                                    data: JSON.stringify(approvalPayload)
                                                };

                                                axios(options)
                                                    .then(response => {
                                                        setflag(!flag)

                                                    })
                                                    .catch(function (e) {
                                                        if (e.message === 'Network Error') {
                                                            alert("No Internet Found. Please check your internet connection")
                                                        }
                                                        else {
                                                            alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                                        }
                                                    });
                                            }
                                        },
                                        {
                                            label: 'Hủy',
                                            onClick: () => {
                                            }
                                        },
                                    ]
                                });

                            }
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        sorting: true,
                        exportButton: true,
                        pageSize: 10
                    }}
                    localization={{
                        header: {
                            actions: "Thao tác"
                        }
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login_indicator: state.loginIndicator
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onloginIndicatorChange: (loginIndicator) => dispatch({ type: actionTypes.BILLING_DATA, loginIndicator: loginIndicator }),

    }
};

export default windowSize(connect(mapStateToProps, mapDispatchToProps)(CustomEditComponent));

