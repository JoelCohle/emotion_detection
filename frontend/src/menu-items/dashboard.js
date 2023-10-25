// assets
import { IconDashboard } from '@tabler/icons';
import { IconKey } from '@tabler/icons';

// Project Imports
import { setToken } from '../authentication/token';

// constant
const icons = { IconDashboard, IconKey };
const isAuthenticated = setToken();

// Initialisartion
let dashboard;

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

if(isAuthenticated) {
    dashboard = {
        id: 'menu',
        title: 'Menu',
        type: 'group',
        children: [
            {
                id: 'default',
                title: 'Home',
                type: 'item',
                url: '/home',
                icon: icons.IconDashboard,
                breadcrumbs: false
            },
            {
                id: 'library',
                title: 'Library',
                type: 'item',
                url: '/library',
                icon: icons.IconDashboard,
                breadcrumbs: false
            }
        ]
    };
}
else{
    dashboard = {
        id: 'menu',
        title: 'Menu',
        type: 'group',
        children: [
            {
                id: 'authentication',
                title: 'Authentication',
                type: 'collapse',
                icon: icons.IconKey,

                children: [
                    {
                        id: 'login3',
                        title: 'Login',
                        type: 'item',
                        url: '/login',
                    },
                    {
                        id: 'register3',
                        title: 'Register',
                        type: 'item',
                        url: '/register',
                    }
                ]
            }
        ]
    };
}

export default dashboard;
