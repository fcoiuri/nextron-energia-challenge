import axios from "axios";
import React from "react";
import { PaymentMethodType } from "../../models/payments";
import { apiURl } from "../../../api";
import { State } from "../..";

export const getPaymentMethods = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.get<PaymentMethodType[]>(
      `${apiURl}/paymentmethods`,
      { withCredentials: true }
    );

    if (setState)
      setState({ ...state!, paymentMethods: res.data, loading: false });
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};
