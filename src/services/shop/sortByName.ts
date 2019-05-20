const sortByName = (a: JSX.Element, b: JSX.Element) => {
  if (a.props.title > b.props.title) {
    return 1;
  }
  if (a.props.title < b.props.title) {
    return -1;
  }
  return 0;
};

export default sortByName;
