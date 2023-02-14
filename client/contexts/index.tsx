import React from "react";
import { PaymentMethodType } from "./models/payments";
import { LoginType, RegisterType, SessionType } from "./models/auth";
import { getPaymentMethods } from "./actions/payments";
import { getSession, login, register } from "./actions/auth";

export interface State {
  paymentMethods: PaymentMethodType[];
  session: SessionType[];
  login: LoginType[];
  register: RegisterType[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  paymentMethods: [],
  session: [],
  login: [],
  register: [],
  loading: false,
  error: ""
};

const DataContext = React.createContext<{
  state: State;
  fetchPaymentMethods: () => void;
  fetchSession: () => void;
  fetchLogin: (email: string, password: string) => void;
  fetchRegister: (email: string, password: string, name: string) => void;
}>({
  state: initialState,
  fetchPaymentMethods: () => null,
  fetchSession: () => null,
  fetchLogin: () => null,
  fetchRegister: () => null
  // email: () => null,
  // password: () => null
});

interface DataProviderProps {
  children: React.ReactNode;
}
const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [stateInput, setStateInput] = useState({
  //   email: "",
  //   password: ""
  // });

  // const { email, password } = stateInput;

  const fetchPaymentMethods = async () => {
    getPaymentMethods(setState, state);
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

  return (
    <DataContext.Provider
      value={{
        state,
        fetchPaymentMethods,
        fetchSession,
        fetchLogin,
        fetchRegister
        // email: [email, setEmail],
        // password: [password, setPassword]
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
