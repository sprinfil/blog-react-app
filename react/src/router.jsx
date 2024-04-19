import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Login.jsx';
import SignUp from './views/SignUp.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import NotFound from './views/NotFound.jsx';

const router = createBrowserRouter ([
    {
        path:'/',
        element: <DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/dashboard"/>
            },
        ]
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/signup',
                element: <SignUp/>
            },
        ]
    },

    {
        path:'*',
        element: <NotFound/>
    },
])
export default router;