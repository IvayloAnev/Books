const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const expect = chai.expect;
//let {expect} = require('chai');

chai.use(chaiHttp);

describe.only('Book API', () => {
    let bookId;

    it('Should POST a book', (done) => {
        const book = { id: "1", title: "Test Book", author: "Test Author" };
        chai.request(server)
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
        chai.request(server)
            .get('/books')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });

    it('Should GET a single book', (done) => {
        const bookId = 1;

        chai.request(server)
            .get(`/books/${bookId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                done();
            });
    });

    it('Should PUT an existing book', (done) => {
        const bookId = 1;
        const updatedBook = { id: bookId, title: "Updated Test Book", author: "Updated Test Author" };
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.title).to.equal('Updated Test Book');
                expect(res.body.author).to.equal('Updated Test Author');
                done();
            });
    });

    it('Should return 404 when trying to GET, PUT or DELETE a non-existing book', (done) => {
        chai.request(server)
            .get('/books/9999')
            .end((err, res) => {
                expect(res).to.have.status(404);
            });

        chai.request(server)
            .put('/books/9999')
            .send({ id: "9999", title: "Non-existing Book", author: "Non-existing Author" })
            .end((err, res) => {
                expect(res).to.have.status(404);
            })

        chai.request(server)
            .delete('/books/9999')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });

    });
});




//npx mocha api.test.js