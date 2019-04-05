const fastifyRateLimit = require("fastify-rate-limit");

const defaultMax = 50;
const defaultTime = 1000 * 60;
const defaultCacheTime = 1000 * 60 * 2;

export default (fastify, max = defaultMax, timeWindow = defaultTime, cache = defaultCacheTime) => {
    fastify.register(fastifyRateLimit, {
        max: defaultMax,
        timeWindow: timeWindow,
        cache: cache
    });
};
