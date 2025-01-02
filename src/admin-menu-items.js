export default {
    items: [
        {
            id: '0',
            title: 'DASHBOARD',
            type: 'group',
            icon: 'feather icon-grid',
            defaultscreen: 1,
            url: '/Dashboard',
            children: [
                {
                    id: 'DASHBOARD',
                    title: 'Thống kê',
                    type: 'item',
                    url: '/Dashboard',
                    icon: 'feather icon-grid',
                }
            ]
        },
        {
            id: '2',
            title: 'Bill',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'Bill',
                    title: 'Quản lý hóa đơn',
                    type: 'item',
                    url: '/ORDER_MANAGEMENT',
                    icon: 'feather icon-layers',
                }
            ]
        },
        {
            id: '1',
            title: 'adminCreation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'adminCreation',
                    title: 'Quản lý người dùng',
                    type: 'item',
                    url: '/USER_MANAGEMENT',
                    icon: 'feather icon-user',
                }
            ]
        },

        {
            id: '3',
            title: 'productManagement',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'productManagement',
                    title: 'Quản lý sản phẩm',
                    type: 'item',
                    url: '/PRODUCT_MANAGEMENT',
                    icon: 'feather icon-package',
                }
            ]
        },

        {
            id: '4',
            title: 'categoryManagement',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'categoryManagement',
                    title: 'Quản lý hạng mục',
                    type: 'item',
                    url: '/CATEGORY_MANAGEMENT',
                    icon: 'feather icon-file-text',
                }
            ]
        },

        {
            id: '5',
            title: 'notificationManagement',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'notificationManagement',
                    title: 'Quản lý thông báo',
                    type: 'item',
                    url: '/NOTIFICATION_MANAGEMENT',
                    icon: 'feather icon-bell',
                }
            ]
        },

        {
            id: '7',
            title: 'ChangePass',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'ChangePass',
                    title: 'Đổi mật khẩu',
                    type: 'item',
                    url: '/ChangePass',
                    icon: 'feather icon-settings',
                }
            ]
        },

        {
            id: '8',
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