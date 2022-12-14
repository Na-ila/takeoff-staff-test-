import React from 'react';
import './app.scss';
import Cookies from 'universal-cookie';

import { useAppSelector, useAppDispatch } from './hooks/hooks';
import { setAuthorized } from './store/lkSlice';

import Login from './components/Login';
import ContactList from './components/ContactList';
import ModalWindow from './components/ModalWindow';

const cookies = new Cookies();

function App() {
  const dispatch = useAppDispatch();
  const { authorized } = useAppSelector((state) => state.lkSlice);

  React.useEffect(() => {
    if (cookies.get('token')) {
      dispatch(setAuthorized(true));
    } else {
      dispatch(setAuthorized(false));
    }
  }, [dispatch]);

  return (
    <div>
      {authorized === 'pending' ? (
        <div></div>
      ) : !authorized ? (
        <Login />
      ) : (
        <>
          <ContactList />
          <ModalWindow />
        </>
      )}
    </div>
  );
}

export default App;
