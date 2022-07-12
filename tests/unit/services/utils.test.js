const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Joi = require('joi');
const sinon = require('sinon');
const { useSchema } = require('../../../services/utils');

chai.use(chaiAsPromised);

describe('services/utils', () => {
  beforeEach(sinon.restore);
  const schema = Joi.object();

  describe('useSchema', () => {
    it('Deve disparar um erro caso o Joi dispare', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      chai.expect(useSchema(schema)({})).to.be.rejected;
    });

    it('Deve retornar o objeto tratado se sucesso', () => {
      sinon.stub(schema, 'validateAsync').resolves({});
      chai.expect(useSchema(schema)({})).to.eventually.deep.equal({value: {}});
    });
  });
});