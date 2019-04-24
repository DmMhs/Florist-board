const labels = {
  brand: 'FLORIST.UA',
  navigation: {
    home: 'HOME',
    shop: 'SHOP',
    gallery: 'GALLERY',
    contacts: 'CONTACTS',
    cart: 'CART',
    account: {
      main: 'MY ACCOUNT',
      menu: {
        signIn: 'SIGN IN',
        signUp: 'SIGN UP',
        logOut: 'LOG OUT'
      }
    }
  },
  pages: {
    shop: {
      sort: {
        main: 'sort by',
        btn: {
          byName: 'name',
          byPrice: 'price'
        }
      },
      filter: {
        main: 'Filters',
        available: 'IN STOCK',
        price: 'PRICE RANGE',
        priceInputs: {
          from: 'from',
          to: 'to'
        }
      }
    },
    gallery: {
      main: 'Our Gallery'
    },
    contacts: {
      map: 'Where to find us?',
      info: 'Feel free to get in touch with us!'
    },
    auth: {
      email: 'Email:',
      password: 'Password:',
      btn: 'SUBMIT',
      alternative: 'OR',
      isAuth: {
        main: 'You are authenticated',
        sub: 'You need to log out if you want to reathenticate!'
      },
      signup: {
        google: 'Sign Up with a Google:',
        facebook: 'Sign Up with a Facebook:',
        account: 'Already have an account ?',
        btn: 'SIGN IN'
      },
      signin: {
        google: 'Sign In with a Google:',
        facebook: 'Sign In with a Facebook:',
        account: 'Have no account ?',
        btn: 'SIGN UP'
      }
    }
  }
};

export default labels;
