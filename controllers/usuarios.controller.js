// utiliza base de datos local
const db = require('../db/db');
// utiliza base de datos alwaysdata
//const db = require('../db/dbw');

const index = (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }
    if (rows.length == 0) {
      return res.status(404).send({ error: 'No existen usuarios' });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: 'No existe el usuario' });
    }

    res.json(rows[0]);
  });
};

const store = (req, res) => {
  const email = req.body.email;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length != 0) {
      return res.status(200).send({ error: 'Este mail ya esta registrado' });
    }

    const { email, first_name, last_name, zip, password } = req.body;

    const sql =
      'INSERT INTO usuarios (email, first_name, last_name, zip, password) VALUES (?, ?, ?, ?, ?)';
    db.query(
      sql,
      [email, first_name, last_name, zip, password],
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Intente mas tarde' });
        }

        const usuario = { ...req.body, id: result.insertId };

        res.status(201).json(usuario);
      }
    );
  });
};

const update = (req, res) => {
  const email = req.body.email;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length != 0) {
      return res.status(200).send({ error: 'Este mail ya esta registrado' });
    }

    const { id } = req.params;
    const { email, first_name, last_name, zip, password } = req.body;

    const sql =
      'UPDATE usuarios SET email = ? ,first_name = ?, last_name = ?, zip = ? ,  password = ? WHERE id = ?';
    db.query(
      sql,
      [email, first_name, last_name, zip, password, id],
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Intente mas tarde' });
        }

        if (result.affectedRows == 0) {
          return res.status(404).send({ error: 'No existe el usuario' });
        }

        const usuario = { ...req.body, ...req.params };

        res.json(usuario);
      }
    );
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: 'No existe el usuario' });
    }

    res.json({ mensaje: 'Usuario eliminado' });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
