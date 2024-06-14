// utiliza base de datos local
//const db = require('../db/db');
// utiliza base de datos alwaysdata
const db = require('../db/dbw');

const index = (req, res) => {
  //  console.log('index');
  const sql = 'SELECT * FROM productos';
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

  const sql = 'SELECT * FROM productos WHERE id = ?';
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
  db.query(sql, [email], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length != 0) {
      return res.status(200).send({ error: 'Este mail ya esta registrado' });
    }

    // console.log(req.body);
    const { email, first_name, last_name, zip, password } = req.body;

    const sql =
      'INSERT INTO productos (email, first_name, last_name, zip, password) VALUES (?, ?, ?,?,?)';
    db.query(
      sql,
      [email, first_name, last_name, zip, password],
      (error, result) => {
        // console.log(result);
        if (error) {
          return res.status(500).json({ error: 'Intente mas tarde' });
        }

        const producto = { ...req.body, id: result.insertId };

        res.status(201).json(producto);
      }
    );
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name, zip, password } = req.body;

  const sql =
    'UPDATE productos SET email = ? ,first_name = ?, last_name = ?, zip = ? ,  password = ? WHERE id = ?';
  db.query(
    sql,
    [email, first_name, last_name, zip, password, id],
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

  const sql = 'DELETE FROM productos WHERE id = ?';
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
