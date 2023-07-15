const express = require("express");

let router = express.Router();

const initAPINganh = (app, db) => {
  router.get("/api/nganh", (req, res) => {
    const sql = "SELECT n.MaNganh, n.TenNganh, n.MaKhoa, k.TenKhoa, k.Truongkhoa FROM nganh n LEFT JOIN khoa k ON n.MaKhoa=k.MaKhoa";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/nganh", (req, res) => {
    const { name, faculty } = req.body;
    // const sql = `INSERT INTO nganh ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO nganh (MaNganh, TenNganh, MaKhoa) SELECT COUNT(*)+1, ?, ? FROM nganh`;
    db.query(sql, [name, faculty], (err, result) => {
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

  router.delete("/api/nganh/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM nganh WHERE MaNganh = ?";
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

  router.get("/api/nganh/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM nganh where MaNganh=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/nganh/:id", (req, res) => {
    const { id } = req.params;
    const { name, faculty } = req.body;
    // const sql = `INSERT INTO nganh ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = "UPDATE nganh SET TenNganh=?,MaKhoa=? WHERE MaNganh=?";
    db.query(sql, [name, faculty, id], (err, result) => {
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

module.exports = { initAPINganh };
