const sortByPrice = (a: JSX.Element, b: JSX.Element) => {
  return a.props.price - b.props.price;
};

export default sortByPrice;
