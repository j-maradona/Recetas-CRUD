const db = require('../db/db');

const index = (req, res) => {
    const sql = "SELECT * FROM tbl_recetas";

    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }

        res.json(rows);
    });
};

const show = (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;

    const sql = "SELECT * FROM tbl_recetas WHERE id_receta = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }

        if (rows.length == 0) {
            return res.status(404).json({ error: "Receta no encontrada"});
        }

        res.json(rows[0]);
    });
};

const store = (req, res) => {
    const {titulo, descripcion, texto, categoria, usuario} = req.body;

    const sql = "INSERT INTO tbl_recetas (titulo, descripcion, texto, categoria, usuario) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [titulo, descripcion, texto, categoria, usuario], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }
        const receta = { ...req.body, id: result.insertId };
        res.json(receta);
    })
}

const update = (req, res) => {
    const { id } = req.params;
    const {titulo, descripcion, texto, categoria, usuario} = req.body;

    const sql = "UPDATE tbl_recetas SET titulo = ?, descripcion = ?, texto = ?, categoria = ?, usuario = ? WHERE id_receta = ?";
    db.query(sql, [titulo, descripcion, texto, categoria, usuario, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }

        if (result.affectedRows == 0) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }

        const receta = { ...req.body, ...req.params };

        res.json(receta);
    });
    
};

const destroy = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM tbl_recetas WHERE id_receta = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente más tarde" });
        }
        
        if (result.affectedRows == 0) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }

        res.json({mensaje: `Receta ${id} borrada`});

    });
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
