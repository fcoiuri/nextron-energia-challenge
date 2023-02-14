export interface PaymentMethodType {
  id: number;
  location_id: number;
  BillingAddress: BillingAddress;
  customerId: number;
  registration_time: string;
  methodType: string;
  cardBin: string;
  cardLastFour: string;
  expiryMonth: number;
  expiryYear: number;
  eWallet: string;
  nameOnCard: string;
}

export interface BillingAddress {
  id: number;
  latitude: number;
  longitude: number;
  country: string;
  street1: string;
}

export interface PaymentState {
  paymentMethod: PaymentMethodType[];
  loading: boolean;
  error: string | null;
}
