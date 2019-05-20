import { productsRef } from '../../firebase';
import { deleteProductImages } from './deleteProductImages';

export const deleteProduct = async (id: string, name: string) => {
  const confirm = window.confirm('Are you sure?');
  if (confirm) {
    await deleteProductImages(id, name);
    return productsRef
      .child(id)
      .remove()
      .catch(err => console.log(err));
  }
};
