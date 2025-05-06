import request from 'supertest';
import app from '../src/index';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prismaClient = new PrismaClient();

describe('Reviews Endpoints', () => {
    beforeAll(async () => {
        await prismaClient.user.deleteMany();
        await prismaClient.reviews.deleteMany();

        await prismaClient.user.create({
            data: {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'hashedpassword123',
            },
        });
    });

    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    describe('POST /api/recipe/review', () => {
        it('should create a review successfully', async () => {
            const token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY!, { expiresIn: '1h' });
        
            const response = await request(app)
                .post('/api/recipe/review')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    recipeId: 715538,
                    userId: 1,
                    rating: 5,
                    comment: 'Amazing recipe!',
                });
        
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('recipeId', 715538);
            expect(response.body).toHaveProperty('userId', 1);
            expect(response.body).toHaveProperty('rating', 5);
            expect(response.body).toHaveProperty('comment', 'Amazing recipe!');
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/recipe/review')
                .send({
                    recipeId: 715538, // userId and rating are missing
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('User ID is required, Rating is required');
        });

        it('should return 400 if rating is out of range', async () => {
            const response = await request(app)
                .post('/api/recipe/review')
                .send({
                    recipeId: 715538,
                    userId: 1,
                    rating: 6, // Invalid rating
                    comment: 'Great recipe!',
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('Rating must be at most 5');
        });
    });

    describe('GET /api/recipe/review/:recipeId', () => {
        beforeAll(async () => {
            await prismaClient.reviews.createMany({
                data: [
                    {
                        recipeId: 715538,
                        userId: 1,
                        rating: 5,
                        comment: 'Amazing recipe!',
                        date: new Date(),
                    },
                    {
                        recipeId: 715538,
                        userId: 1,
                        rating: 4,
                        comment: 'Pretty good!',
                        date: new Date(),
                    },
                ],
            });
        });

        it('should fetch reviews for a recipe successfully', async () => {
            const token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY!, { expiresIn: '1h' });
            const response = await request(app).get('/api/recipe/review/715538').set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('reviews');
            expect(response.body).toHaveProperty('averageRating', 4.666666666666667);
            expect(Array.isArray(response.body.reviews)).toBe(true);
            expect(response.body.reviews.length).toBe(3);
        });

        it('should return an empty array if no reviews exist for the recipe', async () => {
            const token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY!, { expiresIn: '1h' });
            const response = await request(app).get('/api/recipe/review/999').set('Authorization', `Bearer ${token}`); // Recipe ID with no reviews

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('reviews');
            expect(response.body.reviews).toEqual([]);
            expect(response.body).toHaveProperty('averageRating', null);
        });

        it('should return 400 if recipeId is not a number', async () => {
            const token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY!, { expiresIn: '1h' });
            const response = await request(app).get('/api/recipe/review/invalid').set('Authorization', `Bearer ${token}`); // Invalid recipeId

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Recipe ID must be a number');
        });
    });
});