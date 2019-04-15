import React from 'react';
import { shallow, mount } from 'enzyme';

import Auth from './Auth';
import AuthContext from './AuthContext';

it('Auth component matches a snapshot', () => {
  const wrapper = shallow(<Auth />);
  expect(wrapper).toMatchSnapshot();
});

it('AuthContext component matches a snapshot', () => {
  const wrapper = shallow(<AuthContext />);
  expect(wrapper).toMatchSnapshot();
});

it('localStorage has impact on the state', () => {
  //   const match = { params: { mode: 'signin' } };
  //   const wrapper = shallow(<Auth.WrappedComponent match={match} />);
  //   const instance = wrapper.instance();
  //   instance.setState({
  //     formData: {
  //       email: 'gdsgdsg@safasf.com',
  //       password: 'asfasfasf'
  //     }
  //   });
  //   console.log(
  //     wrapper
  //       .find(<AuthContext.Consumer />)
  //       .dive()
  //       .contains('form')
  //   );
  //   expect(instance.state.formData.email).toEqual('');
  //   console.log(instance.state);
});
