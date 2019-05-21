import { database } from '../../firebase';
import { URLs } from '../../layouts/Admin/ChangeURLs/ChangeURLs';

export const updateURLs = (newURLs: URLs) => {
  return database
    .ref()
    .child('urls')
    .update(newURLs);
};
