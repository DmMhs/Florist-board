const labels: any = {
  en: {
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
      },
      lang: 'LANG'
    },
    pages: {
      admin: {
        title: 'Admin Control Panel',
        navigation: {
          addProduct: 'ADD PRODUCT',
          galleryImages: 'GALLERY IMAGES',
          labels: 'LABELS'
        },
        addProductForm: {
          available: {
            title: 'Product available: ',
            option1: 'yes',
            option2: 'no'
          },
          title: 'Product title (EN): ',
          title_ua: 'Product title (UA): ',
          images: 'Product images: ',
          price: 'Product price: ',
          description: 'Product description (EN): ',
          description_ua: 'Product description (UA): '
        },
        addGalleryImageForm: {
          info: {
            restriction:
              'Expression "(Number of images)/4" should has no remainder for the best gallery displaying',
            totalImagesNumber: 'Number of images in gallery: '
          },
          add: 'Add image to the galery:'
        },
        changeLabelsForm: {
          change: 'Change ',
          current: 'Current value: '
        },
        submitBtn: 'SUBMIT'
      },
      shop: {
        notAvailable: 'not available :(',
        sort: {
          main: 'sort by',
          btn: {
            byName: 'NAME',
            byPrice: 'PRICE'
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
        },
        cart: {
          empty: 'cart is empty',
          btn: "LET'S FIX IT",
          title: 'PRODUCT',
          amount: 'AMOUNT',
          price: 'PRICE',
          total: 'Total Sum:',
          orderBtn: 'ORDER'
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
      },
      pageNotFound: 'Page not found',
      productDetails: {
        description: 'Description',
        only: 'only',
        notAvailable: 'not available',
        facebookShare: 'SHARE',
        goShopping: 'GO SHOPPING'
      }
    },
    footer: 'FLORIST.UA © All Rights Reserved'
  },
  ua: {
    brand: 'FLORIST.UA',
    navigation: {
      home: 'ГОЛОВНА',
      shop: 'МАГАЗИН',
      gallery: 'ГАЛЕРЕЯ',
      contacts: 'КОНТАКТИ',
      cart: 'КОРЗИНА',
      account: {
        main: 'МІЙ АККАУНТ',
        menu: {
          signIn: 'УВІЙТИ',
          signUp: 'РЕЄСТРАЦІЯ',
          logOut: 'ВИЙТИ'
        }
      },
      lang: 'МОВА'
    },
    pages: {
      admin: {
        title: 'Адмін Панель',
        navigation: {
          addProduct: 'ДОДАТИ ПРОДУКТ',
          galleryImages: 'ГАЛЕРЕЯ',
          labels: 'ЛЕЙБЛИ'
        },
        addProductForm: {
          available: {
            title: 'Продукт в наявності: ',
            option1: 'так',
            option2: 'ні'
          },
          title: 'Назва продукту (EN): ',
          title_ua: 'Назва продукту (UA): ',
          images: 'Картинки продукту: ',
          price: 'Вартість продукту: ',
          description: 'Опис продукту (EN): ',
          description_ua: 'Опис продукту (UA): '
        },
        addGalleryImageForm: {
          info: {
            restriction:
              'Кількість картинок повинна бути кратною чотирьом для найкращого відображення галереї',
            totalImagesNumber: 'Кількість картинок в галереї: '
          },
          add: 'Добавити картинку в галерею:'
        },
        changeLabelsForm: {
          change: 'Змінити ',
          current: 'Поточне значення '
        },
        submitBtn: 'ПІДТВЕРДИТИ'
      },
      shop: {
        notAvailable: 'немає :(',
        sort: {
          main: 'сортувати за',
          btn: {
            byName: "IМ'ЯМ",
            byPrice: 'ЦІНОЮ'
          }
        },
        filter: {
          main: 'Фільтри',
          available: 'В НАЯВНОСТІ',
          price: 'ЦІНОВИЙ ДІАПАЗОН',
          priceInputs: {
            from: 'від',
            to: 'до'
          }
        },
        cart: {
          empty: 'кошик порожній',
          btn: 'ВИПРАВИМО ЦЕ',
          title: 'ПРОДУКТ',
          amount: 'КІЛЬКІСТЬ',
          price: 'ЦІНА',
          total: 'Загальна сума:',
          orderBtn: 'ЗАМОВИТИ'
        }
      },
      gallery: {
        main: 'Наша Галерея'
      },
      contacts: {
        map: 'Де нас можна знайти?',
        info: "Зв'яжіться з нами - ми вам допоможемо!"
      },
      auth: {
        email: 'Е-почта:',
        password: 'Пароль:',
        btn: 'ПІДТВЕРДИТИ',
        alternative: 'АБО',
        isAuth: {
          main: 'Ви вже авторизовані',
          sub: 'Для повторної авторизації вийдіть зі свого аккаунту!'
        },
        signup: {
          google: 'Увійти з Google:',
          facebook: 'Увійти з Facebook:',
          account: 'Вже маєте аккаунт?',
          btn: 'УВІЙТИ'
        },
        signin: {
          google: 'Увійти з Google:',
          facebook: 'Увійти з Facebook:',
          account: 'Ще не зареєстровані?',
          btn: 'РЕЄСТРАЦІЯ'
        }
      },
      pageNotFound: 'Сторінку не знайдено',
      productDetails: {
        description: 'Опис',
        only: 'тільки',
        notAvailable: 'немає в наявності',
        facebookShare: 'ПОДІЛИТИСЬ',
        goShopping: 'В МАГАЗИН'
      }
    },
    footer: 'FLORIST.UA © Всі Права Захищено'
  }
};

export default labels;
