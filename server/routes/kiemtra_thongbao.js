const express = require("express");

let router = express.Router();

const initAPIKiemTraThongBao = (app, db) => {
  router.get("/api/kiemtra_thongbao", (req, res) => {
    const sql =
      "SELECT kttb.Cot, kttb.MaTB,tb.TenTB,tb.NgayBatDau,tb.NgayKetThuc FROM kiemtra_thongbao kttb LEFT JOIN thongbao tb ON kttb.MaTB=tb.MaTB";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/kiemtra_thongbao", (req, res) => {
    const { name, notify, endDay } = req.body;
    // const sql = `INSERT INTO kiemtra_thongbao ( TenTB, NgayBatDau, NgayKetThuc, MaBanDaoTao) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO kiemtra_thongbao ( TenTB, NgayBatDau, NgayKetThuc, MaBanDaoTao) VALUES ( ?, ?, ?, "1")`;
    db.query(sql, [name, notify, endDay], (err, result) => {
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

  router.delete("/api/kiemtra_thongbao/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM kiemtra_thongbao WHERE MaTB = ?";
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

  router.get("/api/kiemtra_thongbao/:id", (req, res) => {
    const { id } = req.params;
    const sql =
      "SELECT kttb.Cot, kttb.MaTB,tb.TenTB,tb.NgayBatDau,tb.NgayKetThuc FROM kiemtra_thongbao kttb LEFT JOIN thongbao tb ON kttb.MaTB=tb.MaTB where Cot=?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/kiemtra_thongbao/:name", (req, res) => {
    const { name } = req.params;
    const { notify } = req.body;
    console.log(name, notify);
    // const sql = `INSERT INTO kiemtra_thongbao ( TenTB, NgayBatDau, NgayKetThuc, MaBanDaoTao) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = "UPDATE kiemtra_thongbao SET MaTB=? WHERE Cot=?";
    db.query(sql, [notify, name], (err, result) => {
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

module.exports = { initAPIKiemTraThongBao };
