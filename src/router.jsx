import HomePage from "./components/homePage.jsx";
import AuthPage from "./components/authPage.jsx";
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
        path: "/login",
        element: <AuthPage signup={false} />
    },
    {
        path: "/signup",
        element: <AuthPage signup={true} />
    }
];


export default routes;