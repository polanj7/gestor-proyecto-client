import React, {useContext} from "react";
import {Link} from 'react-router-dom'
import { UserContext } from "../context/UserContext";



export default function Aside() {

  const {user} = "jose";//useContext(UserContext);


  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    
      <a href="index3.html" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Gestor Proyectos</span>
      </a>
    
      <div className="sidebar">
     
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/avatar.PNG"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {user}
            </a>
          </div>
        </div>
 
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-header">Proyectos</li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="fas fa-circle nav-icon" />
                <Link to="/project">Listado</Link>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
