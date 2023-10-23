import logo from '../../assets/logo.png';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './NavBar.css';

function Navbar() {
  const [mobileMenu, toggleMobileMenu] = useState(false);

  let location = useLocation()
  useEffect(() => {
    // console.log(location.pathname)
  }, [location]);

  useEffect(() => {
    if (mobileMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [mobileMenu]);

  const closeMobileMenu = () => {
    toggleMobileMenu(false);
  };

  var navClassNames = classNames('nav', {
    'mobile-nav': mobileMenu,
  });

  var mobileMenuClassNames = classNames('menu-toggle', {
    'is-active': mobileMenu,
  });

  const history = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    history('/')
  }

  return (
    <>
      <div className="nav-wrapper">
        <nav className="nav-bar">
          <img src={logo} alt="logo" />
          <div
            className={mobileMenuClassNames}
            id="mobile-menu"
            onClick={(e) => toggleMobileMenu((prevMobileMenu) => !prevMobileMenu)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={navClassNames}>
            <li className={`nav-item ${location.pathname === "/" ? "nav-link-item" : ""}`}>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {localStorage.getItem('token') ?
              <>
                <li className={`nav-item ${location.pathname === "/createnew" ? "nav-link-item" : ""}`}>
                  <Link to="/createnew" onClick={closeMobileMenu}>
                    Create a blog
                  </Link>
                </li>
                <li className={`nav-item ${location.pathname === "/profile" ? "nav-link-item" : ""}`}>
                  <Link to="/profile" onClick={closeMobileMenu}>
                    Profile
                  </Link>
                </li>
                <li className={`nav-item ${location.pathname === "/logout" ? "nav-link-item" : ""}`} onClick={handleLogout}>
                  <Link to="" onClick={closeMobileMenu}>
                    Logout
                  </Link>
                </li>
              </> :
              <li className={`nav-item ${location.pathname === "/signup" ? "nav-link-item" : ""} ${location.pathname === "/login" ? "nav-link-item" : ""}`}>
                <Link to="/signup" onClick={closeMobileMenu}>
                  Login/SignUp
                </Link>
              </li>
            }
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
