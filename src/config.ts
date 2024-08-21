export default () => ({
  mongodb: {
    uri:
      process.env.MONGODB_URI ||
      'mongodb://host.docker.internal:27017/notifications',
  },
});
