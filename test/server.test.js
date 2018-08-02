const tape = require('tape');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');

// const server = require('../src/server');
const router = require('../src/router');

const mainCss = fs.readFileSync(path.join(__dirname, '..', 'public', 'main.css'), 'utf8');

tape('Testing home route', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.equal(res.statusCode, 200, 'Should return 200');
      t.equal(/(<html lang="en">)/.test(res.text), true, 'Response should include HTML tag');
      t.equal(res.text.includes('</html>'), true, 'response includes HTML closing tag');
      t.end();
    });
});

tape('Testing public folder file routing', (t) => {
  supertest(router)
    .get('/main.css')
    .expect(200)
    .expect('Content-Type', /css/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.deepEqual(res.text, mainCss, 'response should equal contents of main.css');
      t.end();
    });
});

tape('Testing more public folder file routing', (t) => {
  supertest(router)
    .get('/logic.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.deepEqual(res.statusCode, 200, 'status should equal 200');
      t.end();
    });
});

tape('Testing 404 for non-existent file', (t) => {
  supertest(router)
    .get('/nope.js')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.deepEqual(res.statusCode, 404, 'status should equal 404');
      t.end();
    });
});

// commmenting out these tests as they rely on rate-limited API calls

tape('Testing results route with no query string', (t) => {
  supertest(router)
    .get('/results?q=')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.error(err, 'supertests');
      t.equal(res.statusCode, 200, 'status should equal 200');
      t.equal(res.text, '{}', 'Should send back an empty object');
      t.end();
    });
});

<<<<<<< HEAD
=======
// commented out because Travis is being a spoilsport at 6:30 pm
>>>>>>> master
// tape('Testing results route sends JSON', (t) => {
//   supertest(router)
//     .get('/results?q=brexit')
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end((err, res) => {
//       t.error(err, 'supertests');
//       const parsed = JSON.parse(res.text);
//       t.equal((parsed instanceof Object === true), true, 'instanceOf Object should return true');
//       t.equal(parsed.hasOwnProperty('Guardian'), true, 'returned JSON has Guardian key');
//       t.equal(parsed.hasOwnProperty('NYTimes'), true, 'returned JSON has NYTimes key');
//       t.end();
<<<<<<< HEAD
//     });
// });
=======
//     })
// })
>>>>>>> master
