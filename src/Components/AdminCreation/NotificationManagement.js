import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Modal from 'react-modal';
import CreateNotification from './CreateNotification';
import EditNotification from './EditNotification';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../Configurations/Api_Details'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import windowSize from 'react-window-size';
import { Switch } from '@material-ui/core';

import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";
import {
    Button,

} from 'react-bootstrap';

const customStyles = {
    content: {
        top: '35%',
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '70%',
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

    },
    overlay: { zIndex: 1000 }
};

Modal.setAppElement('#root')

function CustomEditComponent(props) {

    const [loader, setloader] = useState(1);
    const [flag, setflag] = useState('');
    const [data, setdata] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editmodalIsOpen, seteditmodalIsOpen] = useState(false);
    const [editstockdata, seteditstockdata] = useState([]);


    useEffect(() => {

        const getStocksData = {
            url: api.NOTIFICATION_LIST,
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
        seteditmodalIsOpen(false)
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
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <CreateNotification
                        callback={getResponse}
                    />
                </Modal>

                <Modal
                    isOpen={editmodalIsOpen}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <EditNotification
                        callback={getResponse}
                        data={editstockdata}

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
                        + Thêm thông báo
                    </Button>
                </div>
                <MaterialTable
                    title="Quản lý thông báo"
                    columns={[
                        { title: 'Thông báo', field: 'noidung', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.noidung}</h5>) } },
                        { title: 'Ngày tạo', field: 'created_at', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.created_at}</h5>) } },
                        { title: 'Ngày cập nhật', field: 'updated_at', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.updated_at}</h5>) } }
                    ]}


                    data={data}
                    key={data.idthongbao}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Sửa',
                            iconProps: { style: { color: "blue" } },
                            onClick: (event, rowData) => {
                                seteditstockdata(rowData)
                                seteditmodalIsOpen(true)
                            }
                        },
                        rowData => ({
                            icon: 'delete',
                            tooltip: 'Xóa',
                            iconProps: { style: { color: "red" } },
                            onClick: (event, rowData) => {
                                confirmAlert({
                                    title: 'Xóa thông báo',
                                    message: 'Bạn chắc chắn muốn xóa?',
                                    buttons: [
                                        {
                                            label: 'Yes',
                                            onClick: () => {
                                                const options = {
                                                    url: api.NOTIFICATION_DELETION + rowData.idthongbao,
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                                                    }
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
                                            label: 'No',
                                            onClick: () => {

                                            }
                                        }
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

