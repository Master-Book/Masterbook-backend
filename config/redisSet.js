import redis from 'redis';

const redisCl = redis.createClient();

redisCl.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisCl;
