const express = require("express");

let router = express.Router();

const initAPIDangNhap = (app, db) => {
  router.get("/api/dangnhap", (req, res) => {
    const sql =
      "SELECT dn.MaDN, dn.Email, dn.MatKhau, dn.MaGiangVien, gv.TenGiangVien,dn.MaSinhVien, sv.TenSinhVien, dn.LoaiTaiKhoan FROM ((dangnhap dn LEFT JOIN sinhvien sv ON dn.MaSinhVien = sv.MaSinhVien) LEFT JOIN giangvien gv ON dn.MaGiangVien = gv.MaGiangVien)";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/dangnhap", (req, res) => {
    const { email, password } = req.body;
    // const sql = `INSERT INTO dangnhap ( TenGiangVien, GioiTinh, Email, SoDT, MaDN, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO dangnhap (MaDN, Email, MatKhau) SELECT COUNT(*)+1, ?, ? FROM dangnhap`;
    db.query(sql, [email, password], (err, result) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(result);
        res.json(result);
      }
      // if (err) {
      //   console.error(err);
      //   console.log(`Thêm giảng viên ${email} thất bại`);
      //   res.status(500).send("Lỗi trong quá trình xử lý yêu cầu");
      // } else {
      //   console.log(`Thêm giảng viên ${email} thành công`);
      //   res.send("Thêm giảng viên thành công");
      // }
    });
  });

  router.delete("/api/dangnhap/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM dangnhap WHERE MaDN = ?";
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

  router.get("/api/dangnhap/:id", (req, res) => {
    const { id } = req.params;
    const sql =
      "SELECT dn.MaDN, dn.Email, dn.MatKhau, dn.MaGiangVien, gv.TenGiangVien,dn.MaSinhVien, sv.TenSinhVien, dn.LoaiTaiKhoan FROM ((dangnhap dn LEFT JOIN sinhvien sv ON dn.MaSinhVien = sv.MaSinhVien) LEFT JOIN giangvien gv ON dn.MaGiangVien = gv.MaGiangVien) where MaDN=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/dangnhap/:id", (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    // const sql = `INSERT INTO dangnhap ( TenGiangVien, GioiTinh, Email, SoDT, MaDN, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = "UPDATE dangnhap SET Email=?,MatKhau=? WHERE MaDN=?";
    db.query(sql, [email, password, id], (err, result) => {
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

module.exports = { initAPIDangNhap };
