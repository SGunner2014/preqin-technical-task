export interface Firm {
  firm_id: number;
  firm_name: string;
  AUM: number;
  date_added: Date;
  last_updated: Date;
  established_at: Date;
  firm_type: string;
  city: string;
  country: string;
  address: string;
  postal_code: string;
}

export interface Commitment {
  id: number;
  asset_class: string;
  firm_id: number;
  currency: string;
  amount: string;
}
