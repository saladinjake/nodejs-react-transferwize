import chai from 'chai';
import should from 'should';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

describe('Test account related endpoints - POST, GET, PATH, DELETE', () => {
  
  let clientToken;
  let givenAccoutWalletID;

  /**
     * Sign in user to generate user token before test
     */
  before('Sign in user to obtain auth token to be used in other wallet account operations', (done) => {
    const userCredential = {
      email: 'sholaadeola@gmail.com',
      password: 'password',
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


    it('it should create a wallet account', (done) => {
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
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('balance');
          if (!err) {
            givenAccoutWalletID = Number(res.body.data.accountNumber);
          }
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

    it('it should throw error when wallet account type is not specified', (done) => {
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
  describe('GET /accounts', () => {
    it('it should throw permission error if user is not an admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('error').eql('only a staff can perform this operation');
          done();
        });
    });

    before('Sign in as can get list of wallet accounts', (done) => {
      const userCredential = {
        email: 'juwavictor@gmail.com',
        password: 'password',
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




  describe('GET /accounts/:accountNumber', () => {
    it('it should throw an error if a client wants to get other user\'s account', (done) => {
      const accountNumber = 2220107727;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('only a staff has the permission to view other accounts and transactions');
          done();
        });
    });

    it('it should GET a wallet account details as a client if i own the account', (done) => {
      const accountNumber = givenAccoutWalletID;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('ownerEmail');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('balance');
          res.body.data.should.have.property('createdOn');
          done();
        });
    });

    it('it should throw an error if account number is invalid', (done) => {
      const accountNumber = '2220107727ff';
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('accountNumber must be an integer');
          done();
        });
    });

    it('it should GET a wallet account details as a staff', (done) => {
      const accountNumber = 2220107727;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('ownerEmail');
          res.body.data.should.have.property('type');
          res.body.data.should.have.property('balance');
          res.body.data.should.have.property('createdOn');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 2220107724455; // octal number format
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('account number doesn\'t exist');
          done();
        });
    });
  });


  /**
     * Test the GET /user/<user-email-address>/accounts
     */
  describe('GET /user/<user-email-address>/accounts', () => {
    it('it should throw an error if email address is not found', (done) => {
      const email = 'unknownemail.willywilly@gmail.com';
      chai
        .request(app)
        .get(`/api/v1/user/${email}/accounts`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('user with this email address not found');
          done();
        });
    });

    it('it should throw an error if email address is not valid', (done) => {
      const email = 'daddysharkodogmail.com';
      chai
        .request(app)
        .get(`/api/v1/user/${email}/accounts`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('email must be a valid email');
          done();
        });
    });

    it('it should ahould get all accounts that belong to a user', (done) => {
      const email = 'juwavictor@gmail.com';
      chai
        .request(app)
        .get(`/api/v1/user/${email}/accounts`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });

  /**
     * Test the PATCH /accounts/:accountNumber route
     */
  describe('PATCH /accounts/:accountNumber', () => {
    it('it should throw permission error if user is not an admin', (done) => {
      const accountNumber = 2220108726;
      const body = { status: 'active' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('only an admin can perform this operation');
          done();
        });
    });


    it('it should activate a user wallet account', (done) => {
      const accountNumber = 2220108726;

      const body = { status: 'active' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('status').eql(body.status);
          done();
        });
    });


    it('it should throw an error if accountNumber is not valid', (done) => {
      const accountNumber = '2220108726gggg';

      const body = { status: 'active' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('accountNumber must be an integer');
          done();
        });
    });

    it('it should set a wallet account as dormant', (done) => {
      const accountNumber = 2220108726;
      const body = { status: 'dormant' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('accountNumber').eql(accountNumber);
          res.body.data.should.have.property('status').eql(body.status);
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 2220108723333;
      const body = { status: 'dormant' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('account number doesn\'t exist');
          done();
        });
    });

    it('it should throw error when request body status is different from dormant or active', (done) => {
      const accountNumber = 2220108726;
      const body = { status: 'validate' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('status must be one of [dormant, active]');
          done();
        });
    });
  });

  /**
     * Test  DELETE /accounts/:accountNumber route
     */
  describe('DELETE /accounts/:accountNumber', () => {
    it('it should throw permission error if user is not an admin', (done) => {
      const accountNumber = 2220108726;
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('error').eql('only a staff can perform this operation');
          done();
        });
    });

    it('it should throw an error if account number is not valid', (done) => {
      const accountNumber = '2220108726ggg';
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('accountNumber must be an integer');
          done();
        });
    });

    it('it should DELETE a bank record ', (done) => {
      const accountNumber = 2220108726;
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Account successfully deleted');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 2220108726;
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', clientToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('account number doesn\'t exist');
          done();
        });
    });
  });
});
