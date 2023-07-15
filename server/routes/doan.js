const express = require("express");

let router = express.Router();

const initAPIDoAn = (app, db) => {
  router.get("/api/doan", (req, res) => {
    const sql = "SELECT da.MaDeTai, da.TenDeTai, da.MaChuDe, cd.TenChuDe, da.MaSinhVien, sv.TenSinhVien, sv.GioiTinh as'GioiTinhSV', sv.NamSinh as'NamSinhSV', sv.QueQuan as'QueQuanSV', sv.Email as'EmailSV', sv.SDT as'SDTSV', da.MaGiangVien, gv.TenGiangVien, gv.GioiTinh as'GioiTinhGV', gv.Email as'EmailGV', gv.SoDT as'SDTGV',hd.NhanXet, hd.XacNhanGV, hd.XacNhanBDT, da.BanMemDA, f1.`name` AS `nameBanMem`, f1.`path` AS `pathBanMem`, da.DiemDA , da.BienBan, f2.`name` AS `nameBienBan`, f2.`path` AS `pathBienBan` FROM ((((((doan da LEFT JOIN chude cd ON da.MaChuDe = cd.MaChuDe) LEFT JOIN sinhvien sv ON da.MaSinhVien = sv.MaSinhVien) LEFT JOIN giangvien gv ON da.MaGiangVien = gv.MaGiangVien) LEFT JOIN huongdan hd ON da.MaDeTai = hd.MaDeTai) LEFT JOIN files f1 ON da.BanMemDA = f1.`id`) LEFT JOIN files f2 ON da.BienBan = f2.`id`)";
    db.query(sql, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.post("/api/doan", (req, res) => {
    const { name, topic, student, lecturer, softCopy, point, minutes } =
      req.body;
    // const sql = `INSERT INTO doan ( TenDeTai, GioiTinh, NamSinh, QueQuan, Email, SDT, MaLop) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql = `INSERT INTO doan (MaDeTai, TenDeTai, MaChuDe, MaSinhVien, MaGiangVien, BanMemDA, DiemDA, BienBan) SELECT COUNT(*)+1, ?, ?, ?, ?, ?, ?, ? FROM doan`;
    db.query(
      sql,
      [name, topic, student, lecturer, softCopy, point, minutes],
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

  router.delete("/api/doan/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM doan WHERE MaDeTai = ?";
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

  router.get("/api/doan/:id", (req, res) => {
    const { id } = req.params;
    const sql =
      "SELECT da.MaDeTai, da.TenDeTai, da.MaChuDe, cd.TenChuDe, da.MaSinhVien, sv.TenSinhVien, sv.GioiTinh as'GioiTinhSV', sv.NamSinh as'NamSinhSV', sv.QueQuan as'QueQuanSV', sv.Email as'EmailSV', sv.SDT as'SDTSV', da.MaGiangVien, gv.TenGiangVien, gv.GioiTinh as'GioiTinhGV', gv.Email as'EmailGV', gv.SoDT as'SDTGV',hd.NhanXet, hd.XacNhanGV, hd.XacNhanBDT, da.BanMemDA, f1.`name` AS `nameBanMem`, f1.`path` AS `pathBanMem`, da.DiemDA , da.BienBan, f2.`name` AS `nameBienBan`, f2.`path` AS `pathBienBan` FROM ((((((doan da LEFT JOIN chude cd ON da.MaChuDe = cd.MaChuDe) LEFT JOIN sinhvien sv ON da.MaSinhVien = sv.MaSinhVien) LEFT JOIN giangvien gv ON da.MaGiangVien = gv.MaGiangVien) LEFT JOIN huongdan hd ON da.MaDeTai = hd.MaDeTai) LEFT JOIN files f1 ON da.BanMemDA = f1.`id`) LEFT JOIN files f2 ON da.BienBan = f2.`id`) WHERE da.`MaDeTai` = ?";
    db.query(sql, id, (err, result) => {
      if (err) res.json(err);
      else res.json(result);
    });
  });

  router.put("/api/doan/:id", (req, res) => {
    const { id } = req.params;
    const { name, topic, student, lecturer, softCopy, point, minutes } =
      req.body;
    // const sql = `INSERT INTO doan ( TenDeTai, GioiTinh, NamSinh, QueQuan, Email, SDT, MaLop) VALUES (?, ?, ?, ?, ?, 1)`;
    const sql =
      "UPDATE doan SET TenDeTai=?, MaChuDe=?, MaSinhVien=?, MaGiangVien=?, BanMemDA=?, DiemDA=?, BienBan=? WHERE MaDeTai=?";
    db.query(
      sql,
      [name, topic, student, lecturer, softCopy, point, minutes, id],
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

module.exports = { initAPIDoAn };
