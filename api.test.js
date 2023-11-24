const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');
const expect = chai.expect;
//let {expect} = require('chai');

chai.use(chaiHttp);

describe.only('Book API', () => {
    let bookId;

    it('Should POST a book', (done) => {
        const book = { id: "1", title: "Test Book", author: "Test Author" };
        chai.request(app)
            .post('/books')
            .send(book)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                bookId = res.body.id;
                done();
            });
    });

    it('Should GET all book', (done) => {
        chai.request(app)
            .get('/books')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });
});

//npx mocha api.test.js