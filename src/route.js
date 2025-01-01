import React from 'react';

const Login = React.lazy(() => import('./Components/Authentication/SignIn/SignIn1'));
const SignUp = React.lazy(() => import('./Components/Authentication/SignUp/SignUp'));
const ChangePass = React.lazy(() => import('./Components/UserCreation/ChangePass'));

const route = [
    { path: '/Login', exact: true, name: 'Login', component: Login },
    { path: '/SignUp', exact: true, name: 'SignUp', component: SignUp },
    { path: '/ChangeUserPass', exact: true, name: 'Default', component:ChangePass },
    { path: '/', exact: true, name: 'Login', component: Login }

];

export default route;