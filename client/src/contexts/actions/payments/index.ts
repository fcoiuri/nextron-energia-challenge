import { PostPaymentMethod } from 'contexts/models/payments/index';
import axios from 'axios';
import React from 'react';
import { PaymentMethodType } from 'contexts/models/payments';
import { apiURl } from '_utils/api';
import { State } from 'contexts';
import { BillingAddressShort } from 'contexts/models/BillingAddress';

export const getPaymentMethods = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State,
  customerID?: number
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.get<PaymentMethodType>(
      `${apiURl}/customers/${customerID}/paymentmethods`,
      {
        withCredentials: true
      }
    );

    if (setState) {
      setState({ ...state!, paymentMethods: res.data, loading: false });
    }
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};

export const postPaymentMethods = async (
  setState?: React.Dispatch<React.SetStateAction<State>>,
  state?: State,
  BillingAddress?: BillingAddressShort,
  customerId?: number,
  cardBin?: string,
  cardLastFour?: string,
  expiryMonth?: number,
  expiryYear?: number,
  eWallet?: string,
  nameOnCard?: string
) => {
  if (setState) setState({ ...state!, loading: true }!);

  try {
    const res = await axios.post<PostPaymentMethod>(
      `${apiURl}/paymentmethods`,
      {
        BillingAddress: BillingAddress,
        customerId: customerId,
        methodType: 'card',
        cardBin: cardBin,
        cardLastFour: cardLastFour,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear,
        eWallet: eWallet,
        nameOnCard: nameOnCard
      },
      { withCredentials: true }
    );

    if (setState)
      setState({ ...state!, postPaymentMethods: res.data, loading: false });
  } catch (error: any) {
    if (setState) setState({ ...state!, error: error.message, loading: false });
  }
};
