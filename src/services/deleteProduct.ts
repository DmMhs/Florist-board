import { productsRef } from '../firebase';
import { deleteProductImagesByIdAndFolderName } from './deleteProductImagesByIdAndFolderName';

export const deleteProduct = async (id: string, name: string) => {
  await deleteProductImagesByIdAndFolderName(id, name);
  productsRef
    .child(id)
    .remove()
    .catch(err => console.log(err));
};
