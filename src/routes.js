import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
const Login = React.lazy(() => import('./Components/Authentication/SignIn/SignIn1'));
const SignUp = React.lazy(() => import('./Components/Authentication/SignUp/SignUp'));
const UserHome = React.lazy(() => import('./Components/UserCreation/UserHome'));
const ChangePass = React.lazy(() => import('./Components/UserCreation/ChangePass'));

const routes = [
    { path: '/Login', exact: true, name: 'Default', component:Login } ,
    { path: '/SignUp', exact: true, name: 'Default', component:SignUp },
    { path: '/USER_HOME', exact: true, name: 'Default', component:UserHome },
    { path: '/ChangeUserPass', exact: true, name: 'Default', component:ChangePass },
];

export default routes;