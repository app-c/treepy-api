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

export interface IEndDto {
  street: string;
  bairro: string;
  number_home: string;
  city: string;
  state: string;
  cep: string;
}
