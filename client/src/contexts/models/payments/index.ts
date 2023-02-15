import { BillingAddress } from '../BillingAddress';
export interface PaymentMethodType {
  payments?: {
    id?: number;
    location_id?: number;
    BillingAddress?: BillingAddress;
    customerId?: number;
    registration_time?: string;
    methodType?: string;
    cardBin?: string;
    cardLastFour?: string;
    expiryMonth?: number;
    expiryYear?: number;
    eWallet?: string;
    nameOnCard?: string;
  };
}

export interface PostPaymentMethod {
  paymentID?: number;
}
