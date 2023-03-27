import React from 'react'
import {Route} from 'react-router-dom'
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import bootstrap from './bootstrap.min.css'
import {LinkContainer} from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../actions/userAction.js'  
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
function Header() {
  const history=useHistory()
  const userLogin=useSelector(state=>state.userLogin)
  const dispatch=useDispatch()
  const {userInfo}=userLogin
  const logoutHandler=()=>{
    dispatch(logout())
    alert("Logged out Successfully")
    history.push('/')
  }
    return (
        <header style={{marginBottom:"80px"}} >
<Navbar fixed="top"  className="navba"  bg="dark" variant="dark"expand="lg" collapseOnSelect>
  <Container>
  <LinkContainer to='/'>
    <Navbar.Brand className="vshop"><img alt="" src="/images/VSV.png"/>
    </Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Route render={({history})=><SearchBox history={history}/>}/>
      <Nav className="ml-auto" >
      <LinkContainer to='/cart'>
        <Nav.Link >
          <i className="fas fa-shopping-cart"></i>Cart
          </Nav.Link>
          
          </LinkContainer>
          {typeof userInfo === 'object' && Object.keys(userInfo).length !== 0?(
          <NavDropdown  title={userInfo.name} id="username">
          <NavDropdown.Item>
                <Link to='/profile'>Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                   Logout
              </NavDropdown.Item>
          </NavDropdown>): (<LinkContainer to='/login'>
             <Nav.Link>
             <i className="fas fa-user"></i>Sign In
             </Nav.Link>
             </LinkContainer>)}
             {typeof userInfo === 'object' && Object.keys(userInfo).length !== 0 && userInfo.isAdmin && (
                     <NavDropdown  title="ADMIN" id="admin">
                        <NavDropdown.Item>
                           <Link to='/admin/userList'>Users</Link>
                         </NavDropdown.Item>
                         <NavDropdown.Item>
                           <Link to='/admin/productlist'>Products</Link>
                         </NavDropdown.Item>
                         <NavDropdown.Item>
                           <Link to='/admin/orderlist'>Orders</Link>
                         </NavDropdown.Item>
                     </NavDropdown>
             )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
