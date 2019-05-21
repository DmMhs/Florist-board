import { database } from '../../firebase';
import { Labels } from '../../models/Labels';

export const updateLabels = (newLabels: Labels) => {
  return database
    .ref()
    .child('labels')
    .update(newLabels);
};
