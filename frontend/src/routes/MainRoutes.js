import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { setToken } from '../authentication/token';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const Upload = Loadable(lazy(() => import('views/Upload')));
const Library = Loadable(lazy(() => import('views/Library')));

const isAuthenticated = setToken();
const CameraPage = Loadable(lazy(() => import('views/pages/camera/main')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: isAuthenticated ? <Library /> : <AuthLogin3 />,
        },
        {
            path: '/home',
            element: isAuthenticated ? <Library /> : <AuthLogin3 />
        },
        {
            path: '/library',
            element: isAuthenticated ? <Library /> : <AuthLogin3 />
        },
        {
            path: '/upload',
            element: isAuthenticated ? <Upload /> : <AuthLogin3 />
        },
        {
            path: '/scan',
            element: isAuthenticated ? <CameraPage /> : <AuthLogin3 />
        }
    ]
};

export default MainRoutes;
