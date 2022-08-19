import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import contactList from '../contactList.json';
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
  filter: {
    field: string;
    text: string;
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
  filter: {
    field: '',
    text: '',
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
    setFilters(state, { payload }) {
      state.filter = payload;
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
      state.contactListData.data = contactList;
    });
    builder.addCase(fetchContactList.rejected, (state, { payload }) => {
      state.contactListData.loading = false;
      state.contactListData.error = true;
      state.contactListData.data = contactList;
    });
  },
});

export const { setAuthorized, setLoginData, setFilters } = lkSlice.actions;

export default lkSlice.reducer;
