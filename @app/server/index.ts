import Fastify from 'fastify';
import { authRoutes } from './routes/auth.routes';

const fastify = Fastify();

fastify.register(authRoutes, {
  prefix: '/api',
});

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running on ${address}`);
});