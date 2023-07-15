const express = require("express");

let router = express.Router();

const initAPIHuongDan = (app, db) => {
  router.get("/api/huongdan", (req, res) => {
    const sql = "SELECT * FROM `huongdan`";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.get("/api/huongdan/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM huongdan where MaDeTai=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/huongdan/:id", (req, res) => {
    const { id } = req.params;
    const { note, lecturerConfirm, trainingConfirm } = req.body;
    // const sql = `INSERT INTO huongdan ( TenGiangVien, GioiTinh, Email, SoDT, MaDeTai, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql =
      "UPDATE huongdan SET NhanXet=?, XacNhanGV=?, XacNhanBDT=? WHERE MaDeTai=?";
    db.query(
      sql,
      [note, lecturerConfirm, trainingConfirm, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log(result);
          res.status(200).json(result);
        }
      }
    );
  });

  return app.use("/", router);
};

module.exports = { initAPIHuongDan };
