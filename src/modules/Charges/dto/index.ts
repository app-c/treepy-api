export interface IChargeDto {
  id?: string;
  reference_id: string;
  status: string;
  amount: number;
  fk_user_id: string;
  payment_method: string;
  charge_id: string;
}

export interface ISumary {
  total: number;
  paid: number;
}

export interface IPix {
  id: string;
  reference_id: string;
  created_at: string;

  customer: {
    name: string;
    email: string;
    tax_id: string;

    phones: {
      type: string;
      country: string;
      area: string;
      number: string;
    }[];
  };

  items: {
    name: string;
    quantity: 1;
    unit_amount: 50000;
  }[];

  shipping: {
    address: {
      street: string;
      number: string;
      complement: string;
      locality: string;
      city: string;
      region_code: string;
      country: string;
      postal_code: string;
    };
  };

  qr_codes: {
    id: string;
    expiration_date: Date;

    amount: {
      value: number;
    };

    text: string;
    arrangements: [];

    links: {
      rel: string;
      href: string;
      media: string;
      type: string;
    }[];
  }[];

  notification_urls: [];
  links: {
    rel: string;
    href: string;
    media: string;
    type: string;
  }[];
}
