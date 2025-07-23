import HomePage from "./components/homePage.jsx";
import AuthPage from "./components/authPage.jsx";



const routes = [
    {
        path: "/",
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