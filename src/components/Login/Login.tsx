import React from 'react';

import { fetchLogin } from '../../store/lkSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
    <Paper className="loginContainer">
      <TextField
        id="outlined-basic"
        label="Логин"
        variant="outlined"
        value={login}
        onChange={(e) => {
          setLoginError(false);
          setLogin(e.target.value);
        }}
        error={loginError}
      />
      <TextField
        id="outlined-basic"
        label="Пароль"
        variant="outlined"
        value={password}
        onChange={(e) => {
          setPasswordError(false);
          setPassword(e.target.value);
        }}
        error={passwordError}
      />
      {loginData.loading ? (
        <LoadingButton />
      ) : (
        <Button variant="contained" onClick={makeLogin}>
          Войти
        </Button>
      )}
    </Paper>
  );
};

export default Login;
