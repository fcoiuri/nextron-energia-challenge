import axios from 'axios';
import React from 'react';
import { State } from 'contexts';
import { apiURl } from '_utils/api';
import { SessionType, LoginType, RegisterType } from 'contexts/models/auth';

export const getSession = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.get<SessionType>(`${apiURl}/session`, {
      withCredentials: true
    });

    if (setState) setState({ ...state!, session: res.data, loading: false });
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};

export const login = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State,
  email?: string,
  password?: string
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.post<LoginType>(`${apiURl}/login`, {
      email: email,
      password: password
    });

    if (setState) {
      setState({ ...state!, login: res.data, loading: false });
    }
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};

export const register = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State,
  email?: string,
  password?: string,
  name?: string
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.post<RegisterType>(`${apiURl}/register`, {
      email: email,
      password: password,
      name: name
    });

    if (setState) {
      setState({ ...state!, register: res.data, loading: false });
    }
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};
