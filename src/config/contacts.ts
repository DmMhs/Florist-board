export interface Contacts {
  en: {
    address: string;
  };
  ua: {
    address: string;
  };
  postCode: string;
  phone: string;
  email: string;
}

export const contacts: Contacts = {
  en: {
    address: 'Rynok Square, Lviv, UA'
  },
  ua: {
    address: 'Пл. Ринок, м. Львів, Україна'
  },
  postCode: '346346',
  phone: '+123-45-678',
  email: 'florist-official@mail.com'
};
