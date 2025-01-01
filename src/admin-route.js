import React from 'react';

const Login = React.lazy(() => import('./Components/Authentication/SignIn/SignIn1'));
const ChangePass = React.lazy(() => import('./Components/AdminCreation/ChangePass'));

const route = [
    { path: '/Login', exact: true, name: 'Login', component: Login },
    { path: '/ChangePass', exact: true, name: 'Default', component:ChangePass }
];

export default route;