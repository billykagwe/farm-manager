import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import PrivateRoute from './components/layout/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Login from './components/forms/Login'
import Register from './components/forms/Register'
import Footer from './components/layout/Footer'
import Farmers from './pages/Farmers'
import Transactions from './pages/Transactions'
import Products from './pages/Products'
import Advances from './pages/Advances'
import AuthState from './contexts/auth/AuthState'
import setAuthHeader from './utils/authHeader'
import AlertState from './contexts/alert/AlertState'
import FarmerState from './contexts/farmer/FarmerState'
import Alert from './components/layout/Alert'
import Farmer from './components/Farmer/Farmer'
import ProductState from './contexts/product/ProductState'
import TransactionState from './contexts/transaction/TransactionState'
import AdvanceState from './contexts/advance/AdvanceState'
import DeleteState from './contexts/delete/DeleteState';
import Deleting from './components/layout/Deleting';
import Home from './pages/Home';


if(localStorage.token){
  setAuthHeader(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <FarmerState>
        <ProductState>
          <TransactionState>
            <AdvanceState>
              <DeleteState>
      <div className="App">
      <Router>
        <Navbar/>
        <Alert/>
        <Deleting/>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute exact path='/' component={Home}/>
          <PrivateRoute exact path='/farmers' component={Farmers}/>
          <PrivateRoute exact path='/transactions' component={Transactions}/>
          <PrivateRoute exact path='/products' component={Products}/>
          <PrivateRoute exact path='/farmers/:farmer' component={Farmer}/>
          <PrivateRoute exact path='/advances' component={Advances}/>
        </Switch> 
        <Footer/>
      </Router>
      </div>
      </DeleteState>
      </AdvanceState>
      </TransactionState>
      </ProductState>
    </FarmerState>
    </AlertState>
    </AuthState>
  );
}

export default App;
