import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;
const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const Login = React.lazy(() => import('./Components/Authentication/SignIn/SignIn1'));
const SignUp = React.lazy(() => import('./Components/Authentication/SignUp/SignUp'));
const AdminCreation = React.lazy(() => import('./Components/AdminCreation/AdminCreation'));
const ProductManagement = React.lazy(() => import('./Components/AdminCreation/ProductManagement'));
const CategoryManagement = React.lazy(() => import('./Components/AdminCreation/CategoryManagement'));
const NotificationManagement = React.lazy(() => import('./Components/AdminCreation/NotificationManagement'));
const OrderManagement = React.lazy(() => import('./Components/AdminCreation/OrderManagement'));
const ChangePass = React.lazy(() => import('./Components/AdminCreation/ChangePass'));

const routes = [
    { path: '/Dashboard', exact: true, name: 'Default', component:Dashboard },
    { path: '/Login', exact: true, name: 'Default', component:Login } ,
    { path: '/SignUp', exact: true, name: 'Default', component:SignUp } ,
    { path: '/USER_MANAGEMENT', exact: true, name: 'Default', component:AdminCreation },
    { path: '/PRODUCT_MANAGEMENT', exact: true, name: 'Default', component:ProductManagement },
    { path: '/CATEGORY_MANAGEMENT', exact: true, name: 'Default', component:CategoryManagement },
    { path: '/NOTIFICATION_MANAGEMENT', exact: true, name: 'Default', component:NotificationManagement },
    { path: '/ORDER_MANAGEMENT', exact: true, name: 'Default', component:OrderManagement },
    { path: '/ChangePass', exact: true, name: 'Default', component:ChangePass },
];

export default routes;