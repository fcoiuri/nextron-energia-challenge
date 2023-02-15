import axios from 'axios';
import React from 'react';
import { apiURl } from '_utils/api';
import { State } from 'contexts';
import {
  CustomersType,
  CustomerType,
  PostCustomer
} from 'contexts/models/customers';
import { BillingAddressShort } from 'contexts/models/BillingAddress';

export const getCustomers = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.get<CustomersType>(`${apiURl}/customers`, {
      withCredentials: true
    });

    if (setState) setState({ ...state!, customers: res.data, loading: false });
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};

export const getCustomer = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State,
  customerID?: number | string | string[] | undefined
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.get<CustomerType>(
      `${apiURl}/customers/${customerID}`,
      {
        withCredentials: true
      }
    );

    if (setState) setState({ ...state!, customer: res.data, loading: false });
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};

export const postCustomers = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State,
  email?: string,
  name?: string,
  telephone?: string,
  location?: BillingAddressShort,
  customerId?: number
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = customerId
      ? await axios.post<PostCustomer>(
          `${apiURl}/customers`,
          {
            customerId: customerId,
            email: email,
            name: name,
            telephone: telephone,
            location: location
          },
          {
            withCredentials: true
          }
        )
      : await axios.post<PostCustomer>(
          `${apiURl}/customers`,
          {
            email: email,
            name: name,
            telephone: telephone,
            location: location
          },
          {
            withCredentials: true
          }
        );

    if (setState)
      setState({ ...state!, postCustomers: res.data, loading: false });
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};
