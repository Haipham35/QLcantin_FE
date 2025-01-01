export default {
    items: [
        {
            id: '9',
            title: 'ChangePass',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'ChangePass',
                    title: 'Đổi mật khẩu',
                    type: 'item',
                    url: '/ChangeUserPass',
                    icon: 'feather icon-settings',
                }
            ]
        },
        {
            id: '10',
            title: 'LOGOUT',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'Logout',
                    title: 'Đăng xuất',
                    type: 'item',
                    url: '/Login',
                    icon: 'feather icon-power',
                }
            ]
        },
    ]
}