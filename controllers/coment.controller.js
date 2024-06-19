// utiliza base de datos local
//const db = require('../db/db');
// utiliza base de datos alwaysdata
const db = require('../db/dbw');

const index = (req, res) => {
  const sql = 'SELECT * FROM coment';
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }
    if (rows.length == 0) {
      return res.status(404).send({ error: 'No existe el comentario' });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM coment WHERE id = ?';
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: 'No existe el comentario' });
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

    if (rows.length == 0) {
      return res
        .status(200)
        .send({ error: 'debe estar registrado para dejar comentarios' });
    }
    const id_usuario = rows[0]['id'];

    const coment = req.body.coment;

    const sql = 'INSERT INTO coment (usuario, coment) VALUES (?, ?)';
    db.query(sql, [id_usuario, coment], (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Intente mas tarde' });
      }

      const comentario = { ...req.body, id: result.insertId };

      res.status(201).json(comentario);
    });
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { usuario, coment } = req.body;

  const sql = 'UPDATE coment SET usuario = ? ,coment = ? WHERE id = ?';
  db.query(sql, [usuario, coment, id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: 'No existe el comentario' });
    }

    const comentario = { ...req.body, ...req.params };

    res.json(comentario);
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM coment WHERE id = ?';
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Intente mas tarde' });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: 'No existe el comentario' });
    }

    res.json({ mensaje: 'comentario eliminado' });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
