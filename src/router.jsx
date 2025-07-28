import RootElement from "./components/rootElement.jsx";
import HomePage from "./components/homePage.jsx";
import AuthPage from "./components/authPage.jsx";
import PostPage from "./components/postPage.jsx";
import AdminPage from "./components/adminPage.jsx";
import NewPostPage from "./components/newPostPage.jsx";
import { Navigate } from "react-router-dom";



const routes = [
    {
        path: "/",
        element: <RootElement />,
        children: [
            {
                path: "/",
                element: <Navigate to="/posts" replace />
            },
            {
                path: "/posts",
                element: <HomePage />
            },
            {
                path: "/posts/:postId",
                element: <PostPage />
            },
            {
                path: "/admin/posts",
                element: <AdminPage />
            },
            {
                path: "/admin/posts/new",
                element: <NewPostPage />
            }
        ]
    },
    {
        path: "/login",
        element: <AuthPage signup={false} />
    },
    {
        path: "/signup",
        element: <AuthPage signup={true} />
    }
];


export default routes;