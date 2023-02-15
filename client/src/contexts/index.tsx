import React from 'react';
import { PaymentMethodType, PostPaymentMethod } from './models/payments';
import { LoginType, RegisterType, SessionType } from './models/auth';
import { getPaymentMethods, postPaymentMethods } from './actions/payments';
import { getSession, login, register } from './actions/auth';
import { getCustomers, getCustomer, postCustomers } from './actions/customers';
import { CustomersType, CustomerType, PostCustomer } from './models/customers';
import { BillingAddressShort } from './models/BillingAddress';

export interface State {
  paymentMethods: PaymentMethodType;
  postPaymentMethods: PostPaymentMethod;
  session: SessionType;
  login: LoginType;
  register: RegisterType;
  customers: CustomersType;
  customer: CustomerType;
  postCustomers: PostCustomer;
  loading: boolean;
  error: string;
}

const initialState: State = {
  paymentMethods: {},
  postPaymentMethods: {},
  session: {},
  login: {},
  register: {},
  customers: {},
  customer: {},
  postCustomers: {},
  loading: false,
  error: ''
};

const DataContext = React.createContext<{
  state: State;
  fetchPaymentMethods: (customerID?: number) => void;
  fetchPostPaymentMethods: (
    BillingAddress?: BillingAddressShort,
    customerId?: number,
    cardBin?: string,
    cardLastFour?: string,
    expiryMonth?: number,
    expiryYear?: number,
    eWallet?: string,
    nameOnCard?: string
  ) => void;
  fetchSession: () => void;
  fetchLogin: (email: string, password: string) => void;
  fetchRegister: (email: string, password: string, name: string) => void;
  fetchGetCustomers: () => void;

  fetchGetCustomer: (customerID: string | string[] | undefined) => void;
  fetchPostCustomers: (
    email: string,
    name: string,
    telephone: string,
    location: BillingAddressShort,
    customerId?: number
  ) => void;
}>({
  state: initialState,
  fetchPaymentMethods: () => null,
  fetchPostPaymentMethods: () => null,
  fetchSession: () => null,
  fetchLogin: () => null,
  fetchRegister: () => null,
  fetchGetCustomers: () => null,
  fetchGetCustomer: () => null,
  fetchPostCustomers: () => null
});

interface DataProviderProps {
  children: React.ReactNode;
}
const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  const fetchPaymentMethods = async (customerID?: number) => {
    getPaymentMethods(setState, state, customerID);
  };

  const fetchPostPaymentMethods = async (
    BillingAddress?: BillingAddressShort,
    customerId?: number,
    cardBin?: string,
    cardLastFour?: string,
    expiryMonth?: number,
    expiryYear?: number,
    eWallet?: string,
    nameOnCard?: string
  ) => {
    postPaymentMethods(
      setState,
      state,
      BillingAddress,
      customerId,
      cardBin,
      cardLastFour,
      expiryMonth,
      expiryYear,
      eWallet,
      nameOnCard
    );
  };

  const fetchSession = async () => {
    getSession(setState, state);
  };

  const fetchLogin = async (email: string, password: string) => {
    login(setState, state, email, password);
  };

  const fetchRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    register(setState, state, email, password, name);
  };

  const fetchGetCustomers = async () => {
    getCustomers(setState, state);
  };

  const fetchGetCustomer = async (
    customerID: number | string | string[] | undefined
  ) => {
    getCustomer(setState, state, customerID);
  };

  const fetchPostCustomers = async (
    email: string,
    name: string,
    telephone: string,
    location: BillingAddressShort,
    customerId?: number
  ) => {
    postCustomers(
      setState,
      state,
      email,
      name,
      telephone,
      location,
      customerId
    );
  };

  return (
    <DataContext.Provider
      value={{
        state,
        fetchPaymentMethods,
        fetchPostPaymentMethods,
        fetchSession,
        fetchLogin,
        fetchRegister,
        fetchGetCustomers,
        fetchGetCustomer,
        fetchPostCustomers
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
