  import React from 'react'
  import { Link } from 'react-router-dom'
  import logo1 from '/Images/logo.png'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
  import { faHouse, faBriefcase, faBookOpen } from '@fortawesome/free-solid-svg-icons'


  import './Navbar.css'

  const Navbar = () => {
      return (
          <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
              <img className='nav-logo' src={logo1} alt="logo" />
              <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                  <img className='nav-logo' src={logo1} alt="logo" />
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <div className=" items navbar-nav pe-3">
                    <div className="nav-item nav-link mx-lg-2" aria-current="page">
                      <Link to={'/'} >Home</Link>
                    </div>
                    <div className="nav-item nav-link mx-lg-2">
                      <Link to={'/collaborate'} >Collaborate</Link>
                    </div>
                    <div className="nav-item nav-link mx-lg-2">
                      <Link to={'/events'} >Events</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-button mx-lg-2">
                      <Link to={'/signin'} >Sign in</Link>
              </div>
              <div className="signup-button">
                      <Link to={'/signup'} ><span style={{color:'white'}}>Sign up</span></Link>
              </div>
              <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </nav>
      )
  }

  export default Navbar