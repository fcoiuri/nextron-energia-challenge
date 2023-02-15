export interface BillingAddress {
  id: number;
  latitude: number;
  longitude: number;
  country: string;
  street1: string;
}

export interface BillingAddressShort {
  country: string;
  street1: string;
}
