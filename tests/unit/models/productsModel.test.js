const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const producstModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('models/productModels', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('Deve dispara um erro caso o connection.query dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(producstModel.getAll()).to.eventually.be.rejected;
    });

    it('deve retornar uma lista caso o connection.query retorne', () => {
      sinon.stub(connection, 'query').resolves([{}]);
      chai.expect(producstModel.getAll()).to.eventually.deep.equal([{}]);
    });

  });

  describe('getById', () => {
    it('Deve disparar um erro caso o connection.query retorne um erro', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(producstModel.getById()).to.eventually.be.rejected;
    });

    it('Deve retornar nada caso o connection.query retorne uma lista vazia', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      chai.expect(producstModel.getById()).to.eventually.be.undefined;
    });

    it('Deve retornar um objeto caso o connection.query retorne um item na lista', () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      chai.expect(producstModel.getById()).to.eventually.deep.equal({});
    });
  });

  describe('add', () => {
    it('Deve disparar um erro caso o connection.query retorne um erro', () => {
      sinon.stub(connection, 'query').rejects();
      chai.expect(producstModel.add({})).to.eventually.be.rejected;
    });

    it('deve retornar o id inserido caso dê sucesso', () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      chai.expect(producstModel.getById({})).to.eventually.equal(1);
    });
  });
});