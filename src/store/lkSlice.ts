import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_LOGIN, API_CONTACT_LIST } from '../App/config';

interface IState {
  loginData: {
    loading: boolean;
    error: boolean;
  };
  authorized: boolean | string;
  contactListData: {
    loading: boolean;
    error: boolean;
    data: {
      id: string;
      name: string;
      surname: string;
      age: number;
    }[];
  };
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
  authorized: 'pending',
  contactListData: {
    loading: false,
    error: false,
    data: [],
  },
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

export const fetchContactList = createAsyncThunk(
  'camera/fetchCameraList',
  async function ({}, { rejectWithValue }) {
    try {
      const response = await fetch(API_CONTACT_LIST, {
        headers: {
          accept: 'application/json',
          charset: 'utf-8',
        },
      });

      console.log('response', response);
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const lkSlice = createSlice({
  name: 'lk',
  initialState,
  reducers: {
    setLoginData(state, { payload }) {
      state.loginData = payload;
    },
    setAuthorized(state, { payload }) {
      state.authorized = payload;
    },
  },
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
      document.cookie = `token=payload.token`;
      state.authorized = true;
    });
    builder.addCase(fetchContactList.pending, (state, { payload }) => {
      state.loginData.error = false;
      state.contactListData.loading = true;
    });
    builder.addCase(fetchContactList.fulfilled, (state, { payload }) => {
      state.loginData.error = false;
      state.contactListData.loading = false;
      state.contactListData.data = [
        { id: '1', name: 'India', surname: 'IN', age: 13 },
        { id: '2', name: 'China', surname: 'CN', age: 14 },
        { id: '3', name: 'Italy', surname: 'IT', age: 60 },
        { id: '4', name: 'United States', surname: 'US', age: 32 },
        { id: '5', name: 'Canada', surname: 'CA', age: 37 },
        { id: '6', name: 'Australia', surname: 'AU', age: 25 },
        { id: '7', name: 'Germany', surname: 'DE', age: 83 },
        { id: '8', name: 'Ireland', surname: 'IE', age: 48 },
        { id: '9', name: 'Mexico', surname: 'MX', age: 12 },
        { id: '10', name: 'Japan', surname: 'JP', age: 12 },
        { id: '11', name: 'France', surname: 'FR', age: 67 },
        { id: '12', name: 'United Kingdom', surname: 'GB', age: 67 },
        { id: '13', name: 'Russia', surname: 'RU', age: 14 },
        { id: '14', name: 'Nigeria', surname: 'NG', age: 20 },
        { id: '15', name: 'Brazil', surname: 'BR', age: 21 },
      ];
    });
    builder.addCase(fetchContactList.rejected, (state, { payload }) => {
      state.contactListData.loading = false;
      state.contactListData.error = true;
      state.contactListData.data = [
        { id: '1', name: 'India', surname: 'IN', age: 13 },
        { id: '2', name: 'China', surname: 'CN', age: 14 },
        { id: '3', name: 'Italy', surname: 'IT', age: 60 },
        { id: '4', name: 'United States', surname: 'US', age: 32 },
        { id: '5', name: 'Canada', surname: 'CA', age: 37 },
        { id: '6', name: 'Australia', surname: 'AU', age: 25 },
        { id: '7', name: 'Germany', surname: 'DE', age: 83 },
        { id: '8', name: 'Ireland', surname: 'IE', age: 48 },
        { id: '9', name: 'Mexico', surname: 'MX', age: 12 },
        { id: '10', name: 'Japan', surname: 'JP', age: 12 },
        { id: '11', name: 'France', surname: 'FR', age: 67 },
        { id: '12', name: 'United Kingdom', surname: 'GB', age: 67 },
        { id: '13', name: 'Russia', surname: 'RU', age: 14 },
        { id: '14', name: 'Nigeria', surname: 'NG', age: 20 },
        { id: '15', name: 'Brazil', surname: 'BR', age: 21 },
      ];
    });
  },
});

export const { setAuthorized, setLoginData } = lkSlice.actions;

export default lkSlice.reducer;
