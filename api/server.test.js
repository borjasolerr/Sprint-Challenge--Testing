const app = require('./server');
const request = require('supertest');

describe('Express app', () => {
  describe('[POST] /games endpoint', () => {
    it('should respond with 422 status code if required fields are missing in req.body', () => {
      return request(app)
        .post('/games')
        .send({
          title: 'Pacman', // required
          genre: null, // required
          releaseYear: 1980 // not required
        })
        .expect(422);
    });

    it('should respond with status code 200 on proper response', () => {
      return request(app)
        .post('/games')
        .send({
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980 // not required
        })
        .expect(200);
    });

    it('will create new game', () => {
      const gameCreated = { message: 'Game created.' };
      return request(app)
        .post('/games')
        .send({
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980 // not required
        })
        .expect(gameCreated);
    });
  });

  describe('[GET] /games endpoint', () => {
    it('responds with status code 200 on successful response', () => {
      return request(app)
        .get('/games')
        .expect(200);
    });

    it('returns an array', async () => {
      const gamesArr = await request(app).get('/games');
      await expect(Array.isArray(JSON.parse(gamesArr.text))).toBeTruthy();
    });

    it('has a JSON content type header', () => {
      return request(app)
        .get('/games')
        .expect('Content-Type', /json/i);
    });
  });
});
