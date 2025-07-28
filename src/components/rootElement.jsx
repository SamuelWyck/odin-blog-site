import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { Outlet } from "react-router-dom";
import { useRef } from "react";



function RootElement() {
    const headerRef = useRef(null);


    return (
        <>
        <Header ref={headerRef} />
        <Outlet context={{headerRef}} />
        <Footer />
        </>
    );
};



export default RootElement;