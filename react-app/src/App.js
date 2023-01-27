import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList/UsersList';
import User from './components/User/User';
import { authenticate } from './store/session';
import LoadAllCards from './components/Payment_method/payment_method';
import AddNewCardForm from './components/Payment_method/addACard';
import HomePage from './components/Homepage/homepage';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar loaded={loaded} />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/paymentmethod' exact={true} >
          <LoadAllCards />
        </ProtectedRoute>
        <ProtectedRoute path='/paymentmethod/add' exact={true} >
          <AddNewCardForm />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage loaded={loaded} />
        </Route>
      </Switch>
    </>

  );
}


export default App;
