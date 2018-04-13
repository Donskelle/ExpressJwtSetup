/*if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'codeworkrauthentication',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      },
    },
  };
} else {*/
  module.exports = {
    JWT_SECRET: 'gagaaabfbsergagsagsgew',
    mongo: {
      url: '',
      user: '',
      password: '',
    },
    oauth: {
      google: {
        clientID: '',
        clientSecret: '',
      },
      facebook: {
        clientID: '102026413313755',
        clientSecret: '3c1df4586cb6e4057f11630edb291960',
      },
    },
  };
//}
