import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import axios from 'axios';
import * as api from '../../Configurations/Api_Details'
import windowSize from 'react-window-size';

function SignUp1(props) {
    const [username, setusername] = useState("");
    const [usertype, setusertype] = useState("ADMIN");
    const [oprator_id, setoprator_id] = useState("");
    const [password, setpassword] = useState("");
    const [flag, setflag] = useState(0);

    useEffect(() => {
        if (flag == 0) {
            localStorage.clear();
        }

    }, [flag])
    function Login(e) {
        e.preventDefault();

        if (username == "" && password == "") {
            alert("Không được để trống");
        }
        else {
            const getStocksData = {
                url: api.LOGIN,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }

            axios(getStocksData)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user_type', response.data.user.role);
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem("user_id", response.data.user.user_id);
                    localStorage.setItem("role", response.data.user.role);

                    if(response.data.user.role == "admin") {
                        localStorage.setItem('layout', "admin");
                        window.history.replaceState(null, null, "/Dashboard");
                    }
                    else {
                        localStorage.setItem('layout', "user");
                        window.history.replaceState(null, null, "/USER_HOME");
                    }

                    setflag(1)
                    window.location.reload();
                })
                .catch(function (e) {
                    if (e.message === 'Network Error') {
                        alert("No Internet Found. Please check your internet connection");
                    }
                    else {
                        alert("Thông tin đăng nhập không chính xác!");
                    }

                }
            );
        }
    }

    return (
        <Aux>
            <div className="auth-wrapper" style={{
                // backgroundImage: `url(${backgroundImage})`,
                backgroundImage: 'linear-gradient(to right, #28147a, #4218ed)',
                // backgroundColor:'line',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
            }}>
                <div className="auth-content">

                    <div className="card">
                        <form onSubmit={Login}>
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                    {/* <img src={logo} alt="" style={{width:70,height:70}}/> */}

                                </div>
                                <h3 className="mb-4">Đăng nhập</h3>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Tên tài khoản" value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>

                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Mật khẩu" value={password} onChange={(e) => setpassword(e.target.value)} />
                                </div>

                                <button className="btn btn-primary shadow-2 mb-4" onClick={Login} type="submit">Đăng nhập</button>
                                <a href="/SignUp" className="btn btn-primary shadow-2 mb-4" type="submit">Đăng ký</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Aux>
    );

}

export default windowSize(SignUp1);
