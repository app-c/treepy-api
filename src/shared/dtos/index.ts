export interface IUserDtos {
  id?: string;
  name: string;
  midle_name: string;
  password: string;
  email: string;
  profile?: IProfileDto;
  end?: IEndDto;
}

export interface IProfileDto {
  avatar: string;
}

export interface ICustumer {}

export interface IEndDto {
  street: string;
  bairro: string;
  number_home: string;
  city: string;
  state: string;
  cep: string;
}

export interface PersonCardProps {
  nome: string;
  email: string;
  phones: [
    {
      conutry: string;
      area: string;
      number: string;
      type: string;
    },
  ];
}

export interface Shipping {
  locality: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
}

export interface ICard {
  number: string;
  exp_month: string;
  exp_year: string;
  security_code: string;
  holder: {
    name: string;
  };
}

export interface PropsCard {
  reference_id: string;
  customer: PersonCardProps;
  items: [
    {
      reference_id: string;
      name: string;
      quantity: number;
      unit_amount: number;
    },
  ];
  shipping: {
    address: Shipping;
  };
  charges: [
    {
      reference_id: string;
      description: string;
      amount: {
        value: number;
        currency: 'BRL';
      };
      payment_method: {
        type: 'CREDIT_CARD';
        installments: number;
        capture: true;
        card: ICard;
      };
    },
  ];
}

export interface PropsPix {}
