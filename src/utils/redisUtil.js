const { createClient } = require('redis');

const redisClient = createClient({
  socket: {
    host: 'redis',
    port: 6379,
  }
});
redisClient.on('error', (err) => {
  console.error(err);
});


async function disconnectRedis() {
  if (redisClient.isReady)
    await redisClient.disconnect();
}


module.exports = {
  redisClient,
  disconnectRedis,
};