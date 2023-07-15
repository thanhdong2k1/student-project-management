const express = require("express");

let router = express.Router();

const initAPIKhoaDaoTao = (app, db) => {
  router.get("/api/khoadaotao", (req, res) => {
    const sql = "SELECT * FROM `khoadaotao`";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/khoadaotao", (req, res) => {
    const { name, note } = req.body;
    // const sql = `INSERT INTO khoadaotao ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO khoadaotao (MaKhoaDaoTao, NienKhoa, GhiChu) SELECT COUNT(*)+1, ?, ? FROM khoadaotao`;
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

  router.delete("/api/khoadaotao/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM khoadaotao WHERE MaKhoaDaoTao = ?";
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

  router.get("/api/khoadaotao/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM khoadaotao where MaKhoaDaoTao=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/khoadaotao/:id", (req, res) => {
    const { id } = req.params;
    const { name, note } = req.body;
    // const sql = `INSERT INTO khoadaotao ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql =
      "UPDATE khoadaotao SET NienKhoa=?,GhiChu=? WHERE MaKhoaDaoTao=?";
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

module.exports = { initAPIKhoaDaoTao };
