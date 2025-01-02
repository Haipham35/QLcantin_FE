import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import axios from 'axios';
import * as api from '../../Configurations/Api_Details'
import windowSize from 'react-window-size';

function SignUp(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        if (flag == 0) {
            localStorage.clear();
        }

    }, [flag])
    function SignUp(e) {
        e.preventDefault();

        if (username == "" || password == "" || confirmPassword == "" || fullName == "" || email == "" || phoneNumber == "") {
            alert("Không được bỏ trống");
        }
        else if(password != confirmPassword) {
            alert("Mật khẩu nhập lại không khớp");
        }
        else {
            const signUp = {
                url: api.SIGNUP,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    "username": username,
                    "password": password,
                    "full_name": fullName,
                    "email": email,
                    "phone_number": phoneNumber
                })
            }

            axios(signUp)
                .then(response => {
                    alert("Đăng ký thành công");
                    window.history.replaceState(null, null, "/LogIn");
                    setFlag(1)
                    window.location.reload();
                })
                .catch(function (e) {
                    if (e.message === 'Network Error') {
                        alert("No Internet Found. Please check your internet connection");
                    }
                    else {
                        alert(e.message);
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
                        <form onSubmit={SignUp}>
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                    {/* <img src={logo} alt="" style={{width:70,height:70}}/> */}

                                </div>
                                <h3 className="mb-4">Đăng ký</h3>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Tên người dùng" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>

                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>

                                <div className="input-group mb-4">
                                    <input type="text" className="form-control" placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>

                                <div className="input-group mb-4">
                                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="input-group mb-4">
                                    <input type="text" className="form-control" placeholder="Số điện thooại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>

                                <button className="btn btn-primary shadow-2 mb-4" onClick={SignUp} type="submit">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Aux>
    );

}

export default windowSize(SignUp);
