const express = require("express");

let router = express.Router();

const initAPIThongKe = (app, db) => {
  router.get("/api/thongkegiangviendoan/:id", (req, res) => {
    const { id } = req.params;
    const sql =
      "SELECT gv.MaGiangVien, gv.TenGiangVien, doan.MaDeTai, doan.TenDeTai, IF( hd.XacNhanGV = 0, 'Chưa xác nhận', 'Đã xác nhận' ) AS XacNhanGV, IF( hd.XacNhanBDT = 0, 'Chưa xác nhận', 'Đã xác nhận' ) AS XacNhanBDT, IF(doan.BanMemDA IS NULL, 'Chưa nộp','Đã nộp') AS BanMemDA, IF(doan.DiemDA IS NULL, 'Chưa có','Đã có') AS DiemDA, IF(doan.BienBan IS NULL, 'Chưa có','Đã có') AS BienBan, sv.TenSinhVien FROM giangvien gv LEFT JOIN doan ON gv.MaGiangVien = doan.MaGiangVien LEFT JOIN huongdan hd ON doan.MaDeTai = hd.MaDeTai LEFT JOIN sinhvien sv ON doan.MaSinhVien = sv.MaSinhVien WHERE doan.MaGiangVien=? ORDER BY gv.MaGiangVien, doan.MaDeTai;";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.get("/api/thongkegiangvien/:id", (req, res) => {
    const { id } = req.params;
    const sql =
      "SELECT gv.MaGiangVien, gv.TenGiangVien, COUNT(1) AS SoDoAn, COUNT(CASE WHEN hd.XacNhanGV = 0 THEN 1 END) AS ChuaXacNhanGV, COUNT(CASE WHEN hd.XacNhanGV = 1 THEN 1 END) AS DaXacNhanGV, COUNT(CASE WHEN hd.XacNhanBDT = 0 THEN 1 END) AS ChuaXacNhanBDT, COUNT(CASE WHEN hd.XacNhanBDT = 1 THEN 1 END) AS DaXacNhanBDT, COUNT(CASE WHEN doan.BanMemDA IS NULL THEN 1 END) AS ChuaNopDA, COUNT(CASE WHEN doan.BanMemDA IS NOT NULL THEN 1 END) AS DaNopDA, COUNT(CASE WHEN doan.BienBan IS NOT NULL THEN 1 END) AS DaCoBienBan, COUNT(CASE WHEN doan.DiemDA IS NOT NULL THEN 1 END) AS DaCoDiem FROM giangvien gv LEFT JOIN doan ON gv.MaGiangVien = doan.MaGiangVien LEFT JOIN huongdan hd ON doan.MaDeTai = hd.MaDeTai WHERE doan.MaGiangVien = ? GROUP BY gv.MaGiangVien, gv.TenGiangVien ORDER BY gv.MaGiangVien";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  return app.use("/", router);
};

module.exports = { initAPIThongKe };
