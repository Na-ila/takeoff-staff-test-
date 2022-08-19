import React from 'react';

import { fetchLogin, setLoginData } from '../../store/lkSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

import AlertMessage from '../AlertMessage';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
  const { loginData } = useAppSelector((state) => state.lkSlice);
  const dispatch = useAppDispatch();

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const makeLogin = () => {
    if (!login) {
      setLoginError(true);
    } else if (!password) {
      setPasswordError(true);
    } else {
      dispatch(fetchLogin({ login, password }));
    }
  };

  return (
    <div className="loginContainer">
      <Paper className="paper">
        <TextField
          id="outlined-basic"
          label="Логин"
          variant="outlined"
          value={login}
          onChange={(e) => {
            dispatch(
              setLoginData({
                error: false,
                loading: false,
              })
            );
            setLoginError(false);
            setLogin(e.target.value);
          }}
          error={loginError}
          disabled={loginData.loading}
        />
        <TextField
          id="outlined-basic"
          label="Пароль"
          variant="outlined"
          value={password}
          onChange={(e) => {
            dispatch(
              setLoginData({
                error: false,
                loading: false,
              })
            );
            setPasswordError(false);
            setPassword(e.target.value);
          }}
          error={passwordError}
          disabled={loginData.loading}
        />
        <LoadingButton
          variant="contained"
          onClick={makeLogin}
          loading={loginData.loading}
        >
          Войти
        </LoadingButton>
      </Paper>
      {loginData.error && (
        <AlertMessage text="Неправильный логин или пароль" severity="error" />
      )}
    </div>
  );
};

export default Login;
