const express = require("express");

let router = express.Router();

const initAPIGiangVien = (app,db) => {
  router.get("/api/giangvien", (req, res) => {
    const sql = "SELECT gv.MaGiangVien, gv.TenGiangVien, gv.GioiTinh , gv.Email, gv.SoDT, gv.MaNganh, n.TenNganh, gv.MaBDT FROM (giangvien gv LEFT JOIN nganh n ON gv.MaNganh = n.MaNganh)";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/giangvien", (req, res) => {
    const { name, gender, email, phone, industry } = req.body;
    // const sql = `INSERT INTO giangvien ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO giangvien (MaGiangVien, TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) SELECT COUNT(*)+1, ?, ?,?, ?, ?, 1 FROM giangvien`;
    db.query(sql, [name, gender, email, phone, industry], (err, result) => {
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

  router.delete("/api/giangvien/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM giangvien WHERE MaGiangVien = ?";
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

  router.get("/api/giangvien/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM giangvien where MaGiangVien=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/giangvien/:id", (req, res) => {
    const { id } = req.params;
    const { name, gender, email, phone, industry } = req.body;
    // const sql = `INSERT INTO giangvien ( TenGiangVien, GioiTinh, Email, SoDT, MaNganh, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql =
      "UPDATE giangvien SET TenGiangVien=?,GioiTinh=?,Email=?,SoDT=?,MaNganh=?,MaBDT=1 WHERE MaGiangVien=?";
    db.query(sql, [name, gender, email, phone, industry, id], (err, result) => {
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

module.exports = { initAPIGiangVien };
