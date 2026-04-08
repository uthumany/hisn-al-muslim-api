const request = require('supertest');
const app = require('../src/index');

describe('Hisn al-Muslim API Endpoints', () => {
  test('GET /health should return 200 and status UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('UP');
  });

  test('GET /api/v1/chapters should return all chapters', async () => {
    const res = await request(app).get('/api/v1/chapters');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/v1/items should return paginated items', async () => {
    const res = await request(app).get('/api/v1/items?page=1&limit=5');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(5);
    expect(res.body.meta.pagination.page).toBe(1);
  });

  test('GET /api/v1/items/:id should return a single item', async () => {
    const res = await request(app).get('/api/v1/items/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.id).toBe(1);
  });

  test('GET /api/v1/search should return search results', async () => {
    const res = await request(app).get('/api/v1/search?q=Allah');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/v1/random should return a random item', async () => {
    const res = await request(app).get('/api/v1/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('id');
  });
});
