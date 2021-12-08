module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendmail',
    settings: {
      defaultFrom: 'zhongsh@gmail.com',
      defaultReplyTo: 'zhongsh@gmail.com',
      testAddress: 'zhongsh@gmail.com',
    },
  },
  // ...
});
