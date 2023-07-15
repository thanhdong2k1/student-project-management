const express = require("express");

let router = express.Router();

const initAPILop = (app, db) => {
  router.get("/api/lop", (req, res) => {
    const sql = "SELECT l.MaLop, l.TenLop, l.SoSV, l.MaNganh, n.TenNganh, l.MaKhoaDaoTao, kdt.GhiChu, kdt.NienKhoa FROM ( lop l LEFT JOIN nganh n ON l.MaNganh = n.MaNganh LEFT JOIN khoadaotao kdt ON l.MaKhoaDaoTao = kdt.MaKhoaDaoTao )";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/lop", (req, res) => {
    const { name, quantity, branch, course } = req.body;
    // const sql = `INSERT INTO lop ( TenGiangVien, GioiTinh, Email, SoDT, MaLop, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO lop (MaLop, TenLop, SoSV, MaNganh, MaKhoaDaoTao) SELECT COUNT(*)+1, ?, ?, ?, ? FROM lop`;
    db.query(sql, [name, quantity, branch, course], (err, result) => {
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

  router.delete("/api/lop/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM lop WHERE MaLop = ?";
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

  router.get("/api/lop/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM lop where MaLop=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/lop/:id", (req, res) => {
    const { id } = req.params;
    const { name, quantity, branch, course } = req.body;
    // const sql = `INSERT INTO lop ( TenGiangVien, GioiTinh, Email, SoDT, MaLop, MaBDT) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql =
      "UPDATE lop SET TenLop=?,SoSV=?,MaNganh=?,MaKhoaDaoTao=? WHERE MaLop=?";
    db.query(sql, [name, quantity, branch, course, id], (err, result) => {
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

module.exports = { initAPILop };
