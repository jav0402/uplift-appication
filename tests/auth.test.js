require('dotenv').config({ path: './backend/.env' }); // Load environment variables

const request = require('supertest');
const express = require('express');
const router = require('../backend/routes/auth'); // Adjust the path to your router file
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/auth', router); // Mount the router on the '/auth' path


// Mock the dbGet and dbRun functions
jest.mock('../backend/utils/db-async', () => ({
    dbGet: jest.fn(),
    dbRun: jest.fn(),
}));

jest.mock('../backend/utils/auth-helpers', () => {
    const originalModule = jest.requireActual('../backend/utils/auth-helpers');
    return {
        ...originalModule, // Spread the original exports
        hashPassword: jest.fn(), // Mock only hashPassword
    };
});

const { dbGet, dbRun } = require('../backend/utils/db-async');
const { hashPassword } = require('../backend/utils/auth-helpers');

describe('Auth API Endpoints', () => {
    const JWT_SECRET = process.env.JWT_SECRET;

    beforeAll(() => {
        // Set up any pre-test configurations, if needed
    });

    afterEach(() => {
        // Clear all mocks after each test to prevent leakage
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    afterAll(() => {
        // Clean up after tests
        jest.resetAllMocks();
    });

    describe('POST /auth/register', () => {
        it('should register a new user successfully', async () => {
            dbRun.mockResolvedValueOnce(); // Mock successful DB insert
            const response = await request(app)
                .post('/auth/register')
                .send({
                    email: 'newuser@example.com',
                    password: 'password123',
                    name: 'New User',
                    phone_number: '1234567890',
                });

            expect(response.status).toBe(200);
            expect(response.text).toBe('User registration successful');
        });

        it('should fail to register a user if there is a DB error', async () => {
            dbRun.mockRejectedValueOnce(new Error('DB Error')); // Mock DB error
            const response = await request(app)
                .post('/auth/register')
                .send({
                    email: 'failuser@example.com',
                    password: 'password123',
                    name: 'Fail User',
                    phone_number: '0987654321',
                });

            expect(response.status).toBe(500);
            expect(response.text).toBe('User registration failed');
        });
    });

    describe('POST /auth/login', () => {
        it('should login a user successfully and return a token', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                hashed_password: Buffer.from('hashedpassword'),
                salt: Buffer.from('salt'),
            };

            dbGet.mockResolvedValueOnce(mockUser); // Mock DB get user
            jest.spyOn(jwt, 'sign').mockReturnValue('valid-token'); // Mock JWT token generation
            hashPassword.mockResolvedValueOnce(mockUser.hashed_password); // Mock hashPassword


            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token', 'valid-token');
        });

        it('should fail to login if user credentials are incorrect', async () => {
            dbGet.mockResolvedValueOnce(null); // Mock no user found

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'wronguser@example.com',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(401);
            expect(response.text).toBe('Incorrect username or password.');
        });
    });

    describe('GET /auth/user', () => {
        it('should return user data if token is valid', async () => {
            const mockUser = { id: 1, email: 'testuser@example.com' };
            const token = jwt.sign(mockUser, JWT_SECRET); // Generate a valid token
            dbGet.mockResolvedValueOnce(mockUser); // Mock DB get user info

            const response = await request(app)
                .get('/auth/user')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email', 'testuser@example.com');
        });

        it('should return 401 if no token is provided', async () => {
            const response = await request(app).get('/auth/user');

            expect(response.status).toBe(401);
        });

        it('should return 403 if token is invalid', async () => {
            const response = await request(app)
                .get('/auth/user')
                .set('Authorization', 'Bearer invalidtoken');

            expect(response.status).toBe(403);
        });
    });
});

