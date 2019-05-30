import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';

import Slide from './Slide';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '../../../AppContext';
import * as deleteBannerImageFunction from '../../../services/admin/deleteBannerImage';
import labels from '../../../config/labels';
describe('Slide component works as expected', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Slide imgSrc={'some/test/image/src'} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has imgSrc in props', () => {
    const wrapper = shallow(<Slide imgSrc={'some/test/image/src'} />);
    const instance = wrapper.instance();
    expect(wrapper.props!.imgSrc).toBeDefined;
  });

  it('Click on delete icon envokes function', async () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppContextProvider>
          <Slide imgSrc="some%2Ftest/image/src" forBanner={true} />
        </AppContextProvider>
      </BrowserRouter>
    );
    const context = wrapper.find('AppContextProvider').instance();
    context.setState({
      lang: 'en',
      labels: labels,
      fetchInProgress: false,
      mobileMode: true,
      showNavigation: false,
      togglePosition: 'absolute',
      userRole: 'admin'
    });
    wrapper.update();
    const p = Promise.resolve('success');
    const spyDelete = jest
      .spyOn(deleteBannerImageFunction, 'deleteBannerImage')
      .mockImplementation(() => p);

    wrapper.find('.adminIcons').simulate('click');
    wrapper.update();
    await p;
    expect(spyDelete).toHaveBeenCalled();
  });
});
