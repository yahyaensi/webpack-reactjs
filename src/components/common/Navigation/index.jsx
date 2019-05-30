import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <ul className="nav navbar-nav">
            <li>
              <NavLink to="/" activeClassName="active-navlink" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/10" activeClassName="active-navlink" exact>
                User
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active-navlink" exact>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
