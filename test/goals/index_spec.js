/*global describe, expect, api, it, beforeEach */

const Goal = require('../../models/goal');
const goalData = [{
  name: 'Vespa SS 180',
  cost: 1200,
  deadline: '24/03/2019',
  alreadySaved: 200,
  imageUrl: 'http://th03.deviantart.net/fs70/PRE/f/2012/140/0/1/flcl_haruko__s_vespa_super_sport_180_by_boomerjinks-d50h9gc.jpg'
}, {
  name: 'Apple Watch',
  cost: 250,
  deadline: '25/12/2018',
  alreadySaved: 7,
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBdZDW8urlFatOLD7pfYaSNFVlwoQxpDLLvnc0nS8xvoQCo2n59g',
  websiteUrl: 'https://www.apple.com/uk/shop/buy-watch/apple-watch'
}, {
  name: 'Fulgurite',
  cost: 200,
  deadline: 'N/A',
  alreadySaved: 15,
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51cNQCKiOXL._UY625_.jpg',
  websiteUrl: 'http://www.minresco.com/fulgurites/fulgurites.htm'
}];

describe('GET /goals', () => {
  beforeEach(done => {
    Goal.remove({})
      .then(()=> Goal.create(goalData))
      .then(() => done());
  });

  xit('returns a 200 responce?', done => {
    api.get('/api/goals')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  xit('returns an array?', done => {
    api.get('/api/goals')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
  xit('returns an array of the correct?', done => {
    api.get('/api/goals')
      .end((err, res) => {
        expect(res.body.length).to.eq(goalData.length);
        done();
      });
  });

  xit('returns an array of objects?', done => {
    api.get('/api/goals')
      .end((err, res) => {
        res.body.forEach(goal => expect(goal).to.be.an('object'));
        done();
      });
  });

  xit('returns the correct data?', done => {
    api.get('/api/goals')
      .end((err, res) => {
        res.body.forEach((goal) => {
          const dataGoal = goalData.filter(gOAL => gOAL.name === goal.name) [0];
          expect(goal.name).to.eq(dataGoal.name);
          expect(goal.cost).to.eq(dataGoal.cost);
          expect(goal.deadline).to.eq(dataGoal.deadline);
          expect(goal.alreadySaved).to.eq(dataGoal.alreadySaved);
          expect(goal.websiteUrl).to.eq(dataGoal.websiteUrl);
        });
        done();
      });
  });
});
