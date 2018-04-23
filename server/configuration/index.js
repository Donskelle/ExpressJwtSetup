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
    url: 'mongodb://demouser:RSD0yNk0kfujfsrs@demotrans-shard-00-00-qdhwv.mongodb.net:27017,demotrans-shard-00-01-qdhwv.mongodb.net:27017,demotrans-shard-00-02-qdhwv.mongodb.net:27017/test?ssl=true&replicaSet=demotrans-shard-0&authSource=admin',
  },
  gcloud: {
    project: '1095419424371',
    bucket: 'demotransportiert.appspot.com',
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
