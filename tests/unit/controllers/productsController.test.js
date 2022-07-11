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
});
