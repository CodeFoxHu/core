export let endPoints: {
    cart: {
        add: 'cart',
        modify: 'cart/:id',
        delete: 'cart/:id',
        disableWarning: 'cart/warning',
        get: 'cart',
        activateCoupon: 'cart/coupon',
        inactivateCoupon: 'cart/coupon',
        order: 'cart/order'
    },
    categories: {
        get: 'categories/get',
        menuLayout: 'categories/menuLayout'
    },
    contact: {
        sendMessage: 'contact/sendmessage'
    },
    customer: {
        login: 'customers/login',
        logout: 'customers/login',
        registration: 'customers/registration',
        changePassword: 'customers/changepassword',
        forgottenPassword: 'customers/forgottenpassword',
        resetPassword: 'customers/resetpassword',
        destroySessions: 'customers/destroysessions',
        confirmEmail: 'customers/confirmemail',
        confirmSubscribe: 'customers/confirmsubscribe',
        subscribe: 'customers/subscribe',
        unsubscribe: 'customers/unsubscribe',
        createAddress: 'customers/createaddress',
        deleteAddress: 'customers/deleteaddress',
        updateAddress: 'customers/updateaddress',
        updateProfileData: 'customers/updateprofiledata'
    },
    helpers: {
        getCitiesByPostalCode: 'helpers/getCitiesbypostalcode',
        getShippingCities: 'helpers/shippingcities',
        getShippingPoints: 'helpers/shippingpoints'
    },
    init: {
        init: 'init'
    },
    pages: {
        get: 'pages/:slug',
        getFaq: 'pages/faq'
    },
    payments: {
        start: 'payments/start',
        check: 'payments/check'
    },
    product: {
        get: 'product/:id',
        addRating: 'pages/ratings'
    },
    products: {
        get: 'products'
    },
    profile: {
        getPersonalData: 'profile/personaldata',
        getAddresses: 'profile/addresses',
        updateProfileData: 'profile/updateprofiledata',
        changePassword: 'profile/changepassword',
        destroySessions: 'profile/destroy_sessions',
        deleteAddress: 'profile/addresses/:id',
        createAddress: 'profile/addresses',
        updateAddress: 'profile/addresses/:id',
        newsletterData: 'profile/newsletterdata',
        setNewsletterDataState: 'profile/setnewsletterdatastate',
        getOrderHistory: 'profile/orderhistory',
        getOrderHistoryItem: 'profile/orderhistory/:id'
    }
};
