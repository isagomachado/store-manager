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

  async add(data) {
    const sql = `
      INSERT INTO StoreManager.products (name)
      VALUES (?);
    `;

    const [{ insertId }] = await connection.query(sql, [
      data.name,
    ]);

    return insertId;
  },

  async edit(id, name) {
    const sql = `
      UPDATE StoreManager.products
      SET name = (?)
      WHERE id = (?);
    `;

    await connection.query(sql, [name, id]);
  },

  async exists(id) {
    const sql = `
      SELECT 1
      FROM StoreManager.products
      WHERE id = (?)
    `;

    const [[item]] = await connection.query(sql, [id]);
    return !!item;
  },
};

module.exports = productsModel;
