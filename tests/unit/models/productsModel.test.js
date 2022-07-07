const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const producstModels = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('models/productModels', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('Deve dispara um erro caso o connection.query dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(producstModels.getAll()).to.eventually.be.rejected;
    });

    it('deve retornar uma lista caso o connection.query retorne', () => {
      sinon.stub(connection, 'query').resolves([{}]);
      chai.expect(producstModels.getAll()).to.eventually.deep.equal([{}]);
    });

  });

  describe('getById', () => {
    it('Deve disparar um erro caso o connection.query retorne um erro', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(producstModels.getById()).to.eventually.be.rejected;
    });

    it('Deve retornar nada caso o connection.query retorne uma lista vazia', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      chai.expect(producstModels.getById()).to.eventually.be.undefined;
    });

    it('Deve retornar um objeto caso o connection.query retorne um item na lista', () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      chai.expect(producstModels.getById()).to.eventually.deep.equal({});
    });
  });
});