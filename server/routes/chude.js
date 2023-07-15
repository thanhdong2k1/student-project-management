const express = require("express");

let router = express.Router();

const initAPIChuDe = (app, db) => {
  router.get("/api/chude", (req, res) => {
    const sql = "SELECT * FROM `chude`";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/chude", (req, res) => {
    const { name, note } = req.body;
    // const sql = `INSERT INTO chude ( TenGiangVien, GioiTinh, Email, SoDT, MaChuDe, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO chude (MaChuDe, TenChuDe, GhiChu) SELECT COUNT(*)+1, ?, ? FROM chude`;
    db.query(sql, [name, note], (err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(result);
        res.json(result);
      }
      // if (err) {
      //   console.error(err);
      //   console.log(`Thêm giảng viên ${name} thất bại`);
      //   res.status(500).send("Lỗi trong quá trình xử lý yêu cầu");
      // } else {
      //   console.log(`Thêm giảng viên ${name} thành công`);
      //   res.send("Thêm giảng viên thành công");
      // }
    });
  });

  router.delete("/api/chude/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM chude WHERE MaChuDe = ?";
    db.query(sql, id, (err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(result);
        res.json(result);
      }
    });
  });

  router.get("/api/chude/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM chude where MaChuDe=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/chude/:id", (req, res) => {
    const { id } = req.params;
    const { name, note } = req.body;
    // const sql = `INSERT INTO chude ( TenGiangVien, GioiTinh, Email, SoDT, MaChuDe, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = "UPDATE chude SET TenChuDe=?,GhiChu=? WHERE MaChuDe=?";
    db.query(sql, [name, note, id], (err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(result);
        res.json(result);
      }
    });
  });

  return app.use("/", router);
};

module.exports = { initAPIChuDe };
