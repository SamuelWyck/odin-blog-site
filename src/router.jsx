import HomePage from "./components/homePage.jsx";
import AuthPage from "./components/authPage.jsx";
import PostPage from "./components/postPage.jsx";
import AdminPage from "./components/adminPage.jsx";
import { Navigate } from "react-router-dom";



const routes = [
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
        path: "/login",
        element: <AuthPage signup={false} />
    },
    {
        path: "/signup",
        element: <AuthPage signup={true} />
    },
    {
        path: "/admin/posts",
        element: <AdminPage />
    }
];


export default routes;