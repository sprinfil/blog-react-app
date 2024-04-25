import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/auth/Login.jsx';
import SignUp from './views/auth/SignUp.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import NotFound from './views/NotFound.jsx';
import Dashboard from './views/Dashboard.jsx';
import Users from './views/users/Users.jsx';
import UsersCreate from './views/users/CreateUser.jsx';
import Posts from './views/posts/Posts.jsx';
import PostContainer from './views/posts/PostContainer.jsx';

const router = createBrowserRouter ([
    {
        path:'/',
        element: <DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path:'/dashboard',
                element: <Dashboard/>
            },
            //users
            {
                path:'/users',
                element: <Users/>
            },
            {
                path:'/users/create',
                element: <UsersCreate key='userCreate'/>
            },
            {
                path:'/users/:id',
                element: <UsersCreate key='userUpdate'/>
            },
            //posts
            {
                path:'/posts',
                element: <PostContainer/>,
            }
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