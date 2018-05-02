
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    URL: 'http://localhost:3000/',
    JWT_SECRET: 'gagaaabfbsergagsagsgew',
    SENDGRID_API_KEY: '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',
    mongo: {
      url: 'mongodb://localhost/demoapp',
    },
    gcloud: {
      project: '1095419424371',
      bucket: 'demotransportiert.appspot.com',
    },
    oauth: {
      facebook: {
        clientID: '102026413313755',
        clientSecret: '3c1df4586cb6e4057f11630edb291960',
      },
    },
  };
} else {
  module.exports = {
    URL: 'http://demotransportiert.appspot.com/',
    JWT_SECRET: 'gagaaabfbsergagsagsgew',
    SENDGRID_API_KEY: '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',
    mongo: {
      url: 'mongodb://demouser:zyPgthlmoGmmuJed@demotrans-shard-00-00-qdhwv.mongodb.net:27017,demotrans-shard-00-01-qdhwv.mongodb.net:27017,demotrans-shard-00-02-qdhwv.mongodb.net:27017/test?ssl=true&replicaSet=demotrans-shard-0&authSource=admin',
    },
    gcloud: {
      project: '1095419424371',
      bucket: 'demotransportiert.appspot.com',
    },
    oauth: {
      facebook: {
        clientID: '102026413313755',
        clientSecret: '3c1df4586cb6e4057f11630edb291960',
      },
    },
  };
}