import request from 'supertest';
import app from '../../src/index';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

describe('POST /api/recipe/login', () => {
    beforeAll(async () => {
        await prismaClient.user.deleteMany();
        await prismaClient.user.create({
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: await bcrypt.hash('password123', 8),
            },
        });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should log in successfully with valid credentials', async () => {
        const response = await request(app)
            .post('/api/recipe/login')
            .send({
                email: 'johndoe@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token'); // Verify token JWT 
    });

    it('should return 401 if email is not registered', async () => {
        const response = await request(app)
            .post('/api/recipe/login')
            .send({
                email: 'notregistered@example.com', // Email is not registered
                password: 'password123',
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid email or password');
    });

    it('should return 401 if password is incorrect', async () => {
        const response = await request(app)
            .post('/api/recipe/login')
            .send({
                email: 'johndoe@example.com',
                password: 'wrongpassword', // Wrong password
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid email or password');
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/recipe/login')
            .send({
                email: 'johndoe@example.com', // "password" is missing
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('"password" is required');
    });

    it('should return 400 if email is invalid', async () => {
        const response = await request(app)
            .post('/api/recipe/login')
            .send({
                email: 'invalid-email', // Invalid Email
                password: 'password123',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Email must be a valid email address');
    });
});

describe('GET /api/recipe/user/info', () => {
    let validToken: string;

    beforeAll(async () => {
        await prismaClient.user.deleteMany();
        const user = await prismaClient.user.create({
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: await bcrypt.hash('password123', 8),
            },
        });

        validToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should return user info with a valid token', async () => {
        const response = await request(app)
            .get('/api/recipe/user/info')
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('email', 'johndoe@example.com');
    });

    it('should return 401 if no token is provided', async () => {
        const response = await request(app)
            .get('/api/recipe/user/info'); // Don't send header Authorization

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'No token provided');
    });

    it('should return 401 if token is invalid', async () => {
        const response = await request(app)
            .get('/api/recipe/user/info')
            .set('Authorization', 'Bearer invalidtoken'); // Send invalid token

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid token');
    });

    it('should return 401 if user is not found', async () => {
        const invalidUserToken = jwt.sign({ userId: 9999 }, process.env.SECRET_KEY!, { expiresIn: '1h' });

        const response = await request(app)
            .get('/api/recipe/user/info')
            .set('Authorization', `Bearer ${invalidUserToken}`); // Send token for a user that doesn't exist

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'User not found');
    });
});

describe('PUT /api/recipe/user/info', () => {
    let validToken: string;

    beforeAll(async () => {
        await prismaClient.user.deleteMany();
        const user = await prismaClient.user.create({
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: await bcrypt.hash('password123', 8),
            },
        });

        validToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should update user info successfully with valid token and data', async () => {
        const response = await request(app)
            .put('/api/recipe/user/info')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                name: 'Jane Doe',
                email: 'janedoe@example.com',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Jane Doe');
        expect(response.body).toHaveProperty('email', 'janedoe@example.com');
    });

    it('should return 401 if no token is provided', async () => {
        const response = await request(app)
            .put('/api/recipe/user/info') // Don't send header Authorization
            .send({
                name: 'Jane Doe',
                email: 'janedoe@example.com',
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'No token provided');
    });

    it('should return 401 if token is invalid', async () => {
        const response = await request(app)
            .put('/api/recipe/user/info')
            .set('Authorization', 'Bearer invalidtoken') // Send invalid token
            .send({
                name: 'Jane Doe',
                email: 'janedoe@example.com',
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid token');
    });

    it('should return 400 if name is too short', async () => {
        const response = await request(app)
            .put('/api/recipe/user/info')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                name: 'Jo', // Name too short
                email: 'janedoe@example.com',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Name must be at least 3 characters long');
    });

    it('should return 400 if email is invalid', async () => {
        const response = await request(app)
            .put('/api/recipe/user/info')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                name: 'Jane Doe',
                email: 'invalid-email', // Email invalid
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Email must be a valid email address');
    });
});

describe('POST /api/recipe/requestPasswordReset', () => {
    beforeAll(async () => {
        await prismaClient.user.deleteMany();
        await prismaClient.user.create({
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: await bcrypt.hash('password123', 8),
            },
        });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    // it('should send a password reset email if email exists', async () => {
    //     const response = await request(app)
    //         .post('/api/recipe/requestPasswordReset')
    //         .send({
    //             email: 'johndoe@example.com',
    //         });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('message', 'Password reset email sent');
    // });

    it('should return 404 if email does not exist', async () => {
        const response = await request(app)
            .post('/api/recipe/requestPasswordReset')
            .send({
                email: 'notfound@example.com', // email is not registered
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 400 if email is invalid', async () => {
        const response = await request(app)
            .post('/api/recipe/requestPasswordReset')
            .send({
                email: 'invalid-email', // Email invalid
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('Email must be a valid email address');
    });
});

describe('POST /api/recipe/resetPassword', () => {
    let validToken: string;

    beforeAll(async () => {
        await prismaClient.user.deleteMany();
        const user = await prismaClient.user.create({
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: await bcrypt.hash('password123', 8),
            },
        });

        validToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    it('should reset the password successfully with a valid token', async () => {
        const response = await request(app)
            .post('/api/recipe/resetPassword')
            .send({
                token: validToken,
                newPassword: 'newpassword123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Password reset successful');
    });

    it('should return 400 if token is invalid', async () => {
        const response = await request(app)
            .post('/api/recipe/resetPassword')
            .send({
                token: 'invalidtoken', // Token invalid
                newPassword: 'newpassword123',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid or expired token');
    });

    it('should return 400 if newPassword is too short', async () => {
        const response = await request(app)
            .post('/api/recipe/resetPassword')
            .send({
                token: validToken,
                newPassword: '123', // short password
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toContain('New password must be at least 6 characters long');
    });
});