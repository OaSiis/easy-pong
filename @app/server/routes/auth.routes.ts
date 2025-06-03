import { FastifyInstance } from 'fastify';
import { AuthService } from '../services/auth.service';
import { UserRequest } from '@shared/types/request/user.request';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/signup', async (request, reply) => {
    const { username, email, password } = request.body as UserRequest;
    try {
      const user = await AuthService.signup({ username, email, password });
      return reply.code(201).send({ message: 'User signed up successfully', user });
    } catch (error) {
      return reply.code(400).send({ error: 'User creation failed', details: error });
    }
  });

  fastify.post('/auth/login', async (request, reply) => {
    const { email, password } = request.body as UserRequest;
    try {
      const user = await AuthService.login(email, password);
      if (!user) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }
      return reply.send({ message: 'User logged in successfully', user });
    } catch (error) {
      return reply.code(400).send({ error: 'Login failed', details: error });
    }
  });

  fastify.get('/auth/user/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    try {
      const user = await AuthService.getUser(id);
      if (!user) {
        return reply.code(404).send({ error: 'User not found' });
      }
      return reply.send(user);
    } catch (error) {
      return reply.code(400).send({ error: 'Error fetching user', details: error });
    }
  });

  fastify.put('/auth/user/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    const { username, email, password } = request.body as UserRequest;
    try {
      const user = await AuthService.updateUser(id, { username, email, password });
      return reply.send({ message: 'User updated successfully', user });
    } catch (error) {
      return reply.code(400).send({ error: 'User update failed', details: error });
    }
  });

  fastify.delete('/auth/user/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    try {
      await AuthService.deleteUser(id);
      return reply.send({ message: 'User deleted successfully' });
    } catch (error) {
      return reply.code(400).send({ error: 'User deletion failed', details: error });
    }
  });
}