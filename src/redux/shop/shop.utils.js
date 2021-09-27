export const addToCart = (cart = [], product) => {
  const productInCart = cart.find((prod) => prod._id === product._id);
  if (productInCart) {
    return cart.map((item) =>
      item._id === product._id ? { ...item, amount: item.amount + 1 } : item
    );
  }
  return [...cart, { ...product, amount: 1 }];
};
export const removeFromCart = (cart = [], product) => {
  const productInCart = cart.find((prod) => prod._id === product._id);
  if (productInCart.amount > 1) {
    return cart.map((item) =>
      item._id === product._id ? { ...item, amount: item.amount - 1 } : item
    );
  }
  return cart.filter((item) => item._id !== product._id);
};
