import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import './index.css'

function App() {
  return (
    <Router>
    <Header/>
    <main >
      <Container>
      <Route  path='/admin/orderList' component={OrderListScreen} />
      <Route  path='/admin/userList' component={UserListScreen} />
      <Route  path='/admin/productList' component={ProductListScreen} exact/>
      <Route  path='/admin/productList/:pageNumber' component={ProductListScreen} exact/>
      <Route  path='/admin/user/:id' component={UserEditScreen} />
      <Route  path='/admin/product/:id' component={ProductEditScreen} />
      <Route  path='/order/:id' component={OrderScreen} />
      <Route  path='/placeorder' component={PlaceOrderScreen} />
      <Route  path='/payment' component={PaymentScreen} />
      <Route  path='/shipping' component={ShippingScreen} />
      <Route  path='/profile' component={ProfileScreen} />
      <Route  path='/register' component={RegisterScreen} />
      <Route  path='/login' component={LoginScreen} />
      <Route  path='/product/:id' component={ProductScreen} />
      <Route   path='/' component={Homescreen} exact/>
      <Route   path='/search/:keyword' component={Homescreen} exact/>
      <Route   path='/page/:pageNumber' component={Homescreen}/>
      <Route  path='/cart/:id?/' component={CartScreen} />
      <Route   path='/search/:keyword/page/:pageNumber' component={Homescreen} exact/>

         
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
