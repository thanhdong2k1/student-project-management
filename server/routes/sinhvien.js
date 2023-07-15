const express = require("express");

let router = express.Router();

const initAPISinhVien = (app, db) => {
  router.get("/api/sinhvien", (req, res) => {
    const sql =
      "SELECT sv.MaSinhVien, sv.TenSinhVien, sv.GioiTinh, sv.NamSinh, sv.QueQuan, sv.Email, sv.SDT, sv.MaLop, l.TenLop, l.SoSV, l.MaNganh FROM (sinhvien sv LEFT JOIN lop l ON sv.MaLop = l.MaLop)";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/sinhvien", (req, res) => {
    const { name, gender, yearOfBirth, homeTown, email, phone, classroom } =
      req.body;
    // const sql = `INSERT INTO sinhvien ( TenSinhVien, GioiTinh, NamSinh, QueQuan, Email, SDT, MaLop) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO sinhvien (MaSinhVien, TenSinhVien, GioiTinh, NamSinh, QueQuan, Email, SDT, MaLop) SELECT COUNT(*)+1, ?, ?,?, ?, ?, ?,? FROM sinhvien`;
    db.query(
      sql,
      [name, gender, yearOfBirth, homeTown, email, phone, classroom],
      (err, result) => {
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
      }
    );
  });

  router.delete("/api/sinhvien/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM sinhvien WHERE MaSinhVien = ?";
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

  router.get("/api/sinhvien/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT sv.MaSinhVien, sv.TenSinhVien, sv.GioiTinh, sv.NamSinh, sv.QueQuan, sv.Email, sv.SDT, sv.MaLop, l.TenLop, l.SoSV, l.MaNganh FROM (sinhvien sv LEFT JOIN lop l ON sv.MaLop = l.MaLop) WHERE MaSinhVien=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/sinhvien/:id", (req, res) => {
    const { id } = req.params;
    const { name, gender, yearOfBirth, homeTown, email, phone, classroom } =
      req.body;
    // const sql = `INSERT INTO sinhvien ( TenSinhVien, GioiTinh, NamSinh, QueQuan, Email, SDT, MaLop) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql =
      "UPDATE sinhvien SET TenSinhVien=?,GioiTinh=?, NamSinh=?, QueQuan=?,Email=?,SDT=?,MaLop=? WHERE MaSinhVien=?";
    db.query(
      sql,
      [name, gender, yearOfBirth, homeTown, email, phone, classroom, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          console.log(result);
          res.json(result);
        }
      }
    );
  });

  return app.use("/", router);
};

module.exports = { initAPISinhVien };
