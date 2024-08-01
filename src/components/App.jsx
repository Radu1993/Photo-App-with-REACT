import { Outlet, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const App = () => {
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Navbar.Brand>Photo App</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to="/">
                        Home
                    </NavLink>
                </Nav>
            </Navbar >
            <Outlet />
        </>
    );
}
export default App;