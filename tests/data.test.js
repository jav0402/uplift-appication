const request = require('supertest');
const express = require('express');
const router = require('../backend/routes/data'); // Adjust the path to your router file

const app = express();
app.use(express.json());
app.use('/data', router); // Mount the router on the root path

jest.mock('../backend/utils/db-async', () => ({
    dbRun: jest.fn(),
    dbAll: jest.fn(),
}));

const { dbRun, dbAll } = require('../backend/utils/db-async');

describe('API Endpoints', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /data/quiz', () => {
        it('should update quiz results successfully', async () => {
            dbRun.mockResolvedValueOnce();

            const response = await request(app)
                .post('/data/quiz')
                .send({ user_id: 1, anxiety: 10, depression: 15, other: 20, date: '2024-09-07' });

            expect(response.status).toBe(200);
            expect(response.text).toBe("Quiz results updated successfully");
        });

        it('should return 500 if there is an error updating quiz results', async () => {
            dbRun.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app)
                .post('/data/quiz')
                .send({ user_id: 1, anxiety: 10, depression: 15, other: 20, date: '2024-09-07' });

            expect(response.status).toBe(500);
            expect(response.text).toBe("Error updating quiz results");
        });
    });

    describe('POST /data/mood', () => {
        const factors = [ 'Work', 'School', 'Love', 'Friends', 'Family', 'Money', 'Health', 'Life', 'Others'];
        const factorsCount = factors.reduce((acc, curr) => (acc[curr] = 0, acc), {});
        it('should update mood data successfully', async () => {
            dbRun.mockResolvedValueOnce();

            const response = await request(app)
                .post('/data/mood')
                .send({ mood: 'happy', ...factorsCount, date: '2024-09-07' });

            expect(response.status).toBe(200);
            expect(response.text).toBe("Mood data updated successfully");
        });

        it('should return 500 if there is an error updating mood data', async () => {
            dbRun.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app)
                .post('/data/mood')
                .send({ mood: 'happy', ...factorsCount, date: '2024-09-07' });

            expect(response.status).toBe(500);
            expect(response.text).toBe("Error updating mood data");
        });
    });

    describe('GET /data/mood/:id', () => {
        it('should retrieve mood data successfully', async () => {
            const factors = [ 'Work', 'School', 'Love', 'Friends', 'Family', 'Money', 'Health', 'Life', 'Others'];
            const factorsCount = factors.reduce((acc, curr) => (acc[curr] = 0, acc), {});
            dbAll.mockResolvedValueOnce([{ id: 1, user_id: 1, ...factorsCount, mood: 'happy' }]);

            const response = await request(app).get('/data/mood/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, user_id: 1, ...factorsCount, mood: 'happy' }]);
        });

        it('should return 404 if no mood data is found', async () => {
            dbAll.mockResolvedValueOnce([]);

            const response = await request(app).get('/data/mood/1');

            expect(response.status).toBe(404);
            expect(response.text).toBe("No mood data found");
        });

        it('should return 500 if there is an error retrieving mood data', async () => {
            dbAll.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app).get('/data/mood/1');

            expect(response.status).toBe(500);
            expect(response.text).toBe("Error retrieving mood data");
        });
    });

    describe('GET /journal/:id', () => {
        it('should retrieve journal data successfully', async () => {
            dbAll.mockResolvedValueOnce([{ id: 1, entry: 'Today I felt great!' }]);

            const response = await request(app).get('/data/journal/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, entry: 'Today I felt great!' }]);
        });

        it('should return 404 if no journal data is found', async () => {
            dbAll.mockResolvedValueOnce([]);

            const response = await request(app).get('/data/journal/1');

            expect(response.status).toBe(404);
            expect(response.text).toBe("No journal data found");
        });

        it('should return 500 if there is an error retrieving journal data', async () => {
            dbAll.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app).get('/data/journal/1');

            expect(response.status).toBe(500);
            expect(response.text).toBe("Error retrieving journal data");
        });
    });

    describe('POST /journal', () => {
        it('should update journal data successfully', async () => {
            dbRun.mockResolvedValueOnce();

            const response = await request(app)
                .post('/data/journal')
                .send({ content: 'Today was a good day.',user_id: 1, title: 'Title', feeling: '', theme: ''});

            expect(response.status).toBe(200);
            expect(response.text).toBe("Journal data updated successfully");
        });

        it('should return 500 if there is an error updating journal data', async () => {
            dbRun.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app)
                .post('/data/journal')
                .send({ content: 'Today was a good day.',user_id: 1, title: 'Title', feeling: '', theme: ''});

            expect(response.status).toBe(500);
            expect(response.text).toBe("Error updating journal data");
        });
    });

    describe('GET /resources', () => {
        it('should retrieve resources successfully', async () => {
            dbAll.mockResolvedValueOnce([{ id: 1, title: 'Mental Health Tips', type: 'article' }]);

            const response = await request(app).get('/data/resources?type=article&search=health');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{ id: 1, title: 'Mental Health Tips', type: 'article' }]);
        });

        it('should return 404 if no resources are found', async () => {
            dbAll.mockResolvedValueOnce([]);

            const response = await request(app).get('/data/resources?type=article&search=health');

            expect(response.status).toBe(404);
            expect(response.text).toBe("No resources found");
        });

        it('should return 500 if there is an error retrieving resources', async () => {
            dbAll.mockRejectedValueOnce(new Error('DB Error'));

            const response = await request(app).get('/data/resources?type=article&search=health');

            expect(response.status).toBe(500);
            expect(response.text).toBe("Error retrieving resources");
        });
    });
});

