import chai from 'chai';
import should from 'should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Test account related endpoints - POST, GET, PATH, DELETE', () => {
  let clientToken;
  let adminToken;
  let myNewAccountNumber;

  /**
     * Sign in user to generate user token before test
     */
  before('Sign in user to obtain auth token to be used in other account operations', (done) => {
    const userCredential = {
      email: 'juwavictor@gmail.com',
      password: 'mypassword',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(userCredential)
      .end((err, res) => {
        res.should.have.status(200);
        if (!err) {
          clientToken = res.body.data.token;
        }
        done();
      });
  });

  /**
     * Test the POST /accounts/ endpoint
     */
  describe('POST /accounts', () => {
    it('it should check for token in the request header', (done) => {
      const details = {
        type: 'savings',
        balance: 0.00,
      };

      chai
        .request(app)
        .post('/api/v1/accounts')
        .send(details)
        .end((err, res) => {
          should(res.headers['x-access-token']).be.type('undefined');
          done();
        });
    });

    it('it should check if token is invalid', (done) => {
      const details = {
        type: 'savings',
        balance: 0.00,
      };

      chai
        .request(app)
        .post('/api/v1/accounts')
        .set('x-access-token', 10000)
        .send(details)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('invalid request token');
          done();
        });
    });



    it('it throw an error if user already have a current account', (done) => {
      const details = {
        type: 'current',
        balance: 0.00,
      };

      chai
        .request(app)
        .post('/api/v1/accounts')
        .set('x-access-token', clientToken)
        .send(details)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('it should throw error when account type is not specified', (done) => {
      const details = {
        balance: 0.00,
      };
      

      chai
        .request(app)
        .post('/api/v1/accounts')
        .send(details)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('type is required');
          done();
        });
    });

    it('it should throw error when account type is different from savings and account', (done) => {
      const details = {
        type: 'somethingdifferent',
      };

      chai
        .request(app)
        .post('/api/v1/accounts')
        .set('x-access-token', clientToken)
        .send(details)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('type must be one of [savings, current]');
          done();
        });
    });
  });


  /**
     * Test the GET /accounts/ routes
     */
 


 
});
