import React from 'react';
import { shallow, mount } from 'enzyme';

import Popup from './Popup';

describe('Popup works as expected', () => {
  it('Popup component matches a snapshot', () => {
    const wrapper = shallow(
      <Popup type="success" message={`Product CORN was added to the cart`} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Type of component has impact on its styling', () => {
    let icon;
    let color;
    let wrapper = mount(<Popup type="success" message="wqewasdfas" />);
    const changeStyle = () => {
      if (wrapper.props().type === 'success') {
        icon = <i className="far fa-check-square" />;
        color = 'rgb(134, 218, 134)';
      } else if (wrapper.props().type === 'failure') {
        icon = <i className="far fa-window-close" />;
        color = 'rgb(218, 69, 69)';
      } else if (wrapper.props().type === 'info') {
        icon = <i className="fas fa-info-circle" />;
        color = 'skyblue';
      } else {
        color = 'transparent';
      }
    };
    changeStyle();
    expect(icon).toEqual(<i className="far fa-check-square" />);
    expect(color).toEqual('rgb(134, 218, 134)');
    wrapper = mount(<Popup type="failure" message="asfasfasf" />);
    changeStyle();
    expect(icon).toEqual(<i className="far fa-window-close" />);
    expect(color).toEqual('rgb(218, 69, 69)');
    wrapper = mount(<Popup type="info" message="gdsdfhr" />);
    changeStyle();
    expect(icon).toEqual(<i className="fas fa-info-circle" />);
    expect(color).toEqual('skyblue');
    wrapper = mount(<Popup type={null} message="gdsdfasfasfhr" />);
    changeStyle();
    expect(color).toEqual('transparent');
  });
});
