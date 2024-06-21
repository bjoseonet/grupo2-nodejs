// utiliza base de datos local
//const db = require('../db/db');
// utiliza base de datos alwaysdata
const db = require('../db/dbw');

const fs = require('fs');
const path = require('path');

const index = (req, res) => {
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
  let imageName = '';
  if (req.file) {
    imageName = req.file.filename;
  }
  const { product_name, description, price, image } = req.body;

  const sql =
    'INSERT INTO product (product_name, description, price, image) VALUES (?, ?, ?, ?)';
  db.query(
    sql,
    [product_name, description, price, imageName],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Intente mas tarde' });
      }

      const producto = { ...req.body, id: result.insertId };

      res.status(201).json(producto);
    }
  );
};

const update = (req, res) => {
  const { id } = req.params;

  let sql = 'SELECT * FROM product WHERE id = ?';
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length == 0) {
      return res
        .status(404)
        .send({ error: 'No existe el producto (SELECT update)' });
    }
    if (rows[0].image != '') {
      fs.unlinkSync(
        path.resolve(__dirname, '../public/uploads', rows[0].image)
      );
    }

    let imageName = '';
    if (req.file) {
      imageName = req.file.filename;
    }

    const { product_name, description, price, date_sale, image } = req.body;

    sql =
      'UPDATE product SET product_name = ? ,description = ?, price = ? ,date_sale = ?, image = ? WHERE id = ?';
    db.query(
      sql,
      [product_name, description, price, date_sale, imageName, id],
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Intente mas tarde' });
        }

        if (result.affectedRows == 0) {
          return res
            .status(404)
            .send({ error: 'No existe el producto update' });
        }

        const producto = { ...req.body, ...req.params };

        res.json(producto);
      }
    );
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  let sql = 'SELECT * FROM product WHERE id = ?';
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length == 0) {
      return res
        .status(404)
        .send({ error: 'No existe el producto (SELECT destroy)' });
    }
    if (rows[0].image != '') {
      fs.unlinkSync(
        path.resolve(__dirname, '../public/uploads', rows[0].image)
      );
    }

    sql = 'DELETE FROM product WHERE id = ?';
    db.query(sql, [id], (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Intente mas tarde' });
      }

      if (result.affectedRows == 0) {
        return res
          .status(404)
          .send({ error: 'No existe el producto (destroy)' });
      }

      res.json({ mensaje: 'producto eliminado' });
    });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
