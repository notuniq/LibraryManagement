const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Book Controller', () => {
    it('should add a new book', (done) => {
        chai.request(app)
            .post('/api/books')
            .send({
                title: 'Test Book',
                author: 'Test Author',
                description: 'Test Description',
                genre: 'Test Genre'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').equal('Book added successfully');
                expect(res.body.book).to.have.property('title').equal('Test Book');
                expect(res.body.book).to.have.property('author').equal('Test Author');
                expect(res.body.book).to.have.property('description').equal('Test Description');
                expect(res.body.book).to.have.property('genre').equal('Test Genre');
                done();
            });
    });
});
