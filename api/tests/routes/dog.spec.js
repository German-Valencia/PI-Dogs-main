/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Perritu',
  id: 'bcaf121f-4dab-4129-90c5-50ae9512eb7f', 
  weight: '8 - 12',
  height: '25 - 30',
  life_span: '14 - 18',
  temperament: "Clever, Aggressive, Agile, Alert",
  image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Mops-falk-vom-maegdebrunnen-internationaler-champion-fci.jpg' 
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

////////////////////////////////////////////////////////////////////////////////////////
describe("Obtain a Dog by id or name", () => {
  describe("GET /api/dogs/:id", () => {
    it("response 200 if id", () =>
      agent.get("/dogs/bcaf121f-4dab-4129-90c5-50ae9512eb7f").expect(200));
  });
  
  describe("GET /api/dogs?name=xxx", () => {
    it("response 200 if a name", () =>
      agent.get("/dogs?name=Perritu").expect(200));
  });

  describe('/api/temperament', function() {
    it('GET respond with a status 200 if you find temperaments', () =>
      agent.get('/temperaments').expect(200)); 
    });
  })