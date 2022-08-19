import './app.scss';
import Cookies from 'universal-cookie';

import { useAppSelector, useAppDispatch } from './hooks/hooks';
import { setAuthorized } from './store/lkSlice';

import Login from './components/Login';
import React from 'react';

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
        <div>client page</div>
      )}
    </div>
  );
}

export default App;
