const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('services/productsService', () => {
  beforeEach(sinon.restore);

  describe('verifyId', () => {
    it('O id deve ser do tipo number', () => {
      chai.expect(productsService.verifyId('a')).to.eventually.be.rejected;
      chai.expect(productsService.verifyId(1)).to.eventually.to.be.a('number');
    });
    it('Deve retornar o id', () => {
      chai.expect(productsService.verifyId(1)).to.eventually.deep.equal(1);
    });
  });

  describe('getAll', () => {
    it('Deve disparar um erro caso productsModel.getAll dispare um erro', () => {
      sinon.stub(productsModel, 'getAll').rejects();
      chai.expect(productsService.getAll()).to.eventually.be.rejected;
    });

    it('Deve retornar uma lista, caso o productsModel.getAll retorne', () => {
      sinon.stub(productsModel, 'getAll').resolves([{}]);
      chai.expect(productsService.getAll()).to.eventually.deep.equal([{}]);
    });
  });

  describe('getById', () => {
    it('Deve disparar um erro caso o productsModel.getById retorne um erro', () => {
      sinon.stub(productsModel, 'getById').rejects();
      chai.expect(productsService.getById()).to.eventually.be.rejected;
    });

    it('Deve retornar nada caso o productsModel.getById retorne uma lista vazia', () => {
      sinon.stub(productsModel, 'getById').resolves([[]]);
      chai.expect(productsService.getById()).to.eventually.be.undefined;
    });

    it('Deve retornar um objeto caso o productsModel.getById retorne um item na lista', () => {
      sinon.stub(productsModel, 'getById').resolves([[{}]]);
      chai.expect(productsService.getById()).to.eventually.deep.equal({});
    });
  });

  describe('add', () => {
    it('Deve disparar um erro caso o productsModel.add retorne um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      chai.expect(productsService.add({})).to.eventually.be.rejected;
    });

    it('deve retornar o id inserido caso dê sucesso', () => {
      sinon.stub(productsModel, 'add').resolves([{ insertId: 1 }]);
      chai.expect(productsService.add({})).to.eventually.equal(1);
    });
  });
});
