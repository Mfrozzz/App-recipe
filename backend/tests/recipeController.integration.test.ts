import request from 'supertest';
import app from '../src/index';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

describe('Favourite Recipes Endpoints', () => {
    beforeAll(async () => {
        await prismaClient.user.deleteMany();
        await prismaClient.favouriteRecipes.deleteMany();

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

    describe('POST /api/recipe/favourite', () => {
        it('should add a recipe to favourites successfully', async () => {
            const response = await request(app)
                .post('/api/recipe/favourite')
                .send({
                    userId: 1,
                    recipeId: 101,
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('userId', 1);
            expect(response.body).toHaveProperty('recipeId', 101);
        });

        it('should return 400 if userId is missing', async () => {
            const response = await request(app)
                .post('/api/recipe/favourite')
                .send({
                    recipeId: 101, // userId is missing
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain(`\"userId\" is required`);
        });

        it('should return 400 if recipeId is not a number', async () => {
            const response = await request(app)
                .post('/api/recipe/favourite')
                .send({
                    userId: 1,
                    recipeId: 'invalid', // recipeId is not a number
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('Recipe ID must be a number');
        });
    });

    describe('DELETE /api/recipe/favourite', () => {
        beforeAll(async () => {
            await prismaClient.favouriteRecipes.create({
                data: {
                    userId: 1,
                    recipeId: 101,
                },
            });
        });

        it('should remove a recipe from favourites successfully', async () => {
            const response = await request(app)
                .delete('/api/recipe/favourite')
                .send({
                    userId: 1,
                    recipeId: 101,
                });

            expect(response.status).toBe(204);
        });

        it('should return 400 if recipeId is missing', async () => {
            const response = await request(app)
                .delete('/api/recipe/favourite')
                .send({
                    userId: 1, // recipeId is missing
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain(`\"recipeId\" is required`);
        });

        it('should return 400 if userId is not a number', async () => {
            const response = await request(app)
                .delete('/api/recipe/favourite')
                .send({
                    userId: 'invalid', // userId is not a number
                    recipeId: 101,
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('User ID must be a number');
        });
    });
});