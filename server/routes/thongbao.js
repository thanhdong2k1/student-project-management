const express = require("express");

let router = express.Router();

const initAPIThongBao = (app, db) => {
  router.get("/api/thongbao", (req, res) => {
    const sql = "SELECT * FROM `thongbao` ORDER BY NgayBatDau DESC";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/thongbao", (req, res) => {
    const { name, startDay, endDay } = req.body;
    // const sql = `INSERT INTO thongbao ( TenTB, NgayBatDau, NgayKetThuc, MaBanDaoTao) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO thongbao ( TenTB, NgayBatDau, NgayKetThuc, MaBanDaoTao) VALUES ( ?, ?, ?, "1")`;
    db.query(sql, [name, startDay, endDay], (err, result) => {
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

  router.delete("/api/thongbao/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM thongbao WHERE MaTB = ?";
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

  router.get("/api/thongbao/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM thongbao where MaTB=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/thongbao/:id", (req, res) => {
    const { id } = req.params;
    const { name, startDay, endDay } = req.body;
    console.log(name, startDay, endDay, id);
    // const sql = `INSERT INTO thongbao ( TenTB, NgayBatDau, NgayKetThuc, MaBanDaoTao) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql =
      "UPDATE thongbao SET TenTB=?,NgayBatDau=?,NgayKetThuc=?,MaBanDaoTao='1' WHERE MaTB=?";
    db.query(sql, [name, startDay, endDay, id], (err, result) => {
      console.log(sql);
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

module.exports = { initAPIThongBao };
