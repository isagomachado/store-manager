const connection = require('./connection');

const productsModel = {
  async getAll() {
    const sql = 'SELECT * FROM StoreManager.products';

    const [item] = await connection.query(sql);

    return item;
  },

  async getById(id) {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id=?
    `;

    const [[item]] = await connection.query(sql, [id]);
    
    return item;
  },
};

module.exports = productsModel;
