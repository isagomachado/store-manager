const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('controllers/productsController', () => {
  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('Deve disparar um erro se productsService.getAll disparar', () => {
      sinon.stub(productsService, 'getAll').rejects();
      chai.expect(productsController.getAll({}, {})).to.eventually.be.rejected;
    });

    it('Deve retornar res.status(404) e res.json()', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productsService, 'getAll').resolves(false);
      await productsController.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: 'Product not found' });
    });

    it('Deve retornar res.status(200) e res.json()', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productsService, 'getAll').resolves([{}]);
      await productsController.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
    });
  });

  describe('getById', () => {
    it('Deve disparar um erro se productsService.getById disparar', () => {
      sinon.stub(productsService, 'verifyId').rejects();
      chai.expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('Deve disparar um erro se productsService.getById disparar', () => {
      sinon.stub(productsService, 'verifyId').resolves(1);
      sinon.stub(productsService, 'getById').rejects();
      chai.expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('Deve retornar res.status(404) e res.json()', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productsService, 'verifyId').resolves(1);
      sinon.stub(productsService, 'getById').resolves(false);
      await productsController.getById({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({ message: 'Product not found' });
    });

    it('Deve retornar res.status(200) e res.json()', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productsService, 'verifyId').resolves(1);
      sinon.stub(productsService, 'getById').resolves({});
      await productsController.getById({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('add', () => {
    it('Deve disparar um erro caso o productsService.validateBodyAdd retorne um erro', () => {
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      chai.expect(productsController.add({}, {})).to.eventually.be.rejected;
    });

    it('Deve retornar res.status(400) e res.json()', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productsService, 'validateBodyAdd').resolves({});
      await productsController.add({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(400);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{ message: '"name" is required' }]);
    });

    it('Deve retornar res.status(422) e res.json()', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      }
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      await productsController.add({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(422);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{ message: '"name" length must be at least 5 characters long' }]);
    });

    // it('deve retornar o id inserido caso dê sucesso', () => {
    //   sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
    //   chai.expect(producstModel.getById({})).to.eventually.equal(1);
    // });
  });
});
