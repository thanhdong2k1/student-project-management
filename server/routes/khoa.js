const express = require("express");

let router = express.Router();

const initAPIKhoa = (app, db) => {
  router.get("/api/khoa", (req, res) => {
    const sql = "SELECT * FROM `khoa`";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/khoa", (req, res) => {
    const { name, dean } = req.body;
    // const sql = `INSERT INTO khoa ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO khoa (MaKhoa, TenKhoa, TruongKhoa) SELECT COUNT(*)+1, ?, ? FROM khoa`;
    db.query(sql, [name, dean], (err, result) => {
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

  router.delete("/api/khoa/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM khoa WHERE MaKhoa = ?";
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

  router.get("/api/khoa/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM khoa where MaKhoa=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/khoa/:id", (req, res) => {
    const { id } = req.params;
    const { name, dean } = req.body;
    // const sql = `INSERT INTO khoa ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = "UPDATE khoa SET TenKhoa=?,TruongKhoa=? WHERE MaKhoa=?";
    db.query(sql, [name, dean, id], (err, result) => {
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

module.exports = { initAPIKhoa };
