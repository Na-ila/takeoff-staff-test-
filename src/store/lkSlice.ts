import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_LOGIN } from '../App/config';

interface IState {
  loginData: {
    loading: boolean;
    error: boolean;
  };
  authorized: boolean;
}

interface ILogin {
  login: string;
  password: string;
}

const initialState: IState = {
  loginData: {
    loading: false,
    error: false,
  },
  authorized: false,
};

export const fetchLogin = createAsyncThunk(
  'fetchLogin',
  async function ({ login, password }: ILogin, { rejectWithValue }) {
    try {
      const res = await fetch(
        API_LOGIN +
          new URLSearchParams({
            login,
            password,
          }),
        {
          headers: {
            accept: 'application/json',
            charset: 'utf-8',
          },
        }
      );

      if (!res.ok) {
        throw new Error('Неправильный логин или пароль');
      }

      const data = await res.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      }
    }
  }
);

const lkSlice = createSlice({
  name: 'lk',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, { payload }) => {
      state.loginData = {
        error: false,
        loading: true,
      };
    });
    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      state.loginData = {
        error: false,
        loading: false,
      };
      document.cookie = `token=${payload.token}`;
      state.authorized = true;
    });
    builder.addCase(fetchLogin.rejected, (state, { payload }) => {
      state.loginData = {
        error: true,
        loading: false,
      };
    });
  },
});

export const {} = lkSlice.actions;

export default lkSlice.reducer;
