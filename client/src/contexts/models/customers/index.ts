import { BillingAddress } from '../BillingAddress';

export interface CustomersType {
  customers?: {
    customerID?: number;
    Location?: BillingAddress;
    registration_time?: Date;
    email?: string;
    name?: string;
    telephone?: string;
    location_id?: number;
  };
}

export interface Customers {
  customerID?: number;
  Location?: BillingAddress;
  registration_time?: Date;
  email?: string;
  name?: string;
  telephone?: string;
  location_id?: number;
}

export interface CustomerType {
  customer?: {
    customerID?: number;
    Location?: BillingAddress;
    registration_time?: Date;
    email?: string;
    name?: string;
    telephone?: string;
    location_id?: number;
  };
}

export interface PostCustomer {
  customerID?: number;
}
