import request from 'supertest';
import app from '../../src/index';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

describe('POST /api/recipe/signup', () => {
    beforeAll(async () => {
        await prismaClient.user.deleteMany();
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should register a new user successfully', async () => {
        const response = await request(app)
            .post('/api/recipe/signup')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('email', 'johndoe@example.com');
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/recipe/signup')
            .send({
                email: 'johndoe@example.com', // the field "name" and "password" are missing
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('"name" is required');
        expect(response.body.message).toContain('"password" is required');
    });
    
    it('should return 400 if email is invalid', async () => {
        const response = await request(app)
            .post('/api/recipe/signup')
            .send({
                name: 'John Doe',
                email: 'invalid-email', // invalid Email 
                password: 'password123',
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Email must be a valid email address');
    });
    
    it('should return 400 if password is too short', async () => {
        const response = await request(app)
            .post('/api/recipe/signup')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123', // too short password
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Password must be at least 6 characters long');
    });

    it('should return 409 if email is already registered', async () => {
        await request(app)
            .post('/api/recipe/signup')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
            });

        const response = await request(app)
            .post('/api/recipe/signup')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com', // email already registered
                password: 'password123',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User already exists');
    });
});