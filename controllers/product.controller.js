// utiliza base de datos local
//const db = require('../db/db');
// utiliza base de datos alwaysdata
const db = require('../db/dbw');

const index = (req, res) => {
  //  console.log('index');
  const sql = 'SELECT * FROM product';
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }
    if (rows.length == 0) {
      return res.status(404).send({ error: 'No existe el producto' });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM product WHERE id = ?';
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: 'No existe el producto' });
    }

    res.json(rows[0]);
  });
};

const store = (req, res) => {
  // console.log(req.body);
  const { product_name, description, price, image } = req.body;

  const sql =
    'INSERT INTO product (product_name, description, price, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [product_name, description, price, image], (error, result) => {
    // console.log(result);
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    const producto = { ...req.body, id: result.insertId };

    res.status(201).json(producto);
  });
};

const update = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;
  const { product_name, description, price, date_sale, image } = req.body;

  const sql =
    'UPDATE product SET product_name = ? ,description = ?, date_sale = ?, image = ? ,  WHERE id = ?';
  db.query(
    sql,
    [product_name, description, price, date_sale, image, id],
    (error, result) => {
      //console.log(result);
      if (error) {
        return res.status(500).json({ error: 'Intente mas tarde' });
      }

      if (result.affectedRows == 0) {
        return res.status(404).send({ error: 'No existe el producto' });
      }

      const producto = { ...req.body, ...req.params };

      res.json(producto);
    }
  );
};

const destroy = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM product WHERE id = ?';
  db.query(sql, [id], (error, result) => {
    // console.log(result);
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: 'No existe el producto' });
    }

    res.json({ mensaje: 'producto eliminado' });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
