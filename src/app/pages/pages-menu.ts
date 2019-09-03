import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'dashboard',
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        home: true,
    },
    {
        title: 'FEATURES',
        group: true,
    },
    {
        title: 'Layout',
        icon: 'layout-outline',
        children: [
            {
                title: 'Tab',
                link: '/pages/layout/tab',
            },
            {
                title: 'List',
                link: '/pages/layout/list',
            },
        ],
    },
    {
        title: 'Auth',
        icon: 'lock-outline',
        children: [
            {
                title: 'Login',
                link: '/test/login',
            },
            {
                title: 'Register',
                link: '/test/register',
            },
            {
                title: 'Request Password',
                link: '/test/request-password',
            },
            {
                title: 'Reset Password',
                link: '/test/reset-password',
            },
        ],
    }
];
