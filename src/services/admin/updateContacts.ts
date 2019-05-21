import { database } from '../../firebase';

export const updateContacts = (updatedContacts: { [key: string]: any }) => {
  return database
    .ref()
    .child('contacts')
    .update(updatedContacts);
};
