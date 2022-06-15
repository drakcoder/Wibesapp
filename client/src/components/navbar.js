import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const removeCookie = () => {
    Cookies.remove('token', { path: '' });
    window.location.replace('/home');
};

function NavBar() {
    const token = Cookies.get('token');
    let navbar;
    if (token) {
        navbar = <div>
            <Navbar bg="light" expand="lg" className='mb-3'>
                <Container>
                    <Link to='/' className='navbar-brand'>WibesApp</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to="/home" className='nav-link'>Home</Link></Nav.Link>
                            <Nav.Link><Link to="/people" className='nav-link'>People</Link></Nav.Link>
                            <Nav.Link><Link to="/createPost" className='nav-link'>Create Post</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className='btn nav' onClick={removeCookie}><span className="btn btn-primary btn-small navbar-btn" href="/logout">Logout</span></div>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </div>;
    } else {
        navbar = <div>
            <Navbar bg="light" expand="lg" className='mb-3'>
                <Container>
                    <Link to='/' className='navbar-brand'>WibesApp</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mb-auto">
                            <Nav.Link><Link to="/home" className='nav-link'>Home</Link></Nav.Link>
                            <Nav.Link><Link to="/people" className='nav-link'>People</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Link to='/register'><div className='btn nav'><span class="btn btn-primary btn-small navbar-btn">Join</span></div></Link>
                    <Link to='/login'><div className='btn nav'><span class="btn btn-primary btn-small navbar-btn">Login</span></div></Link>
                </Container>
            </Navbar>
            <Outlet></Outlet>
        </div>;
    }
    return (
        navbar
    );
}

export default NavBar;