const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { initAPIGiangVien } = require("./routes/giangvien");
const { initAPIKhoa } = require("./routes/khoa");
const { initAPINganh } = require("./routes/nganh");
const { initAPIKhoaDaoTao } = require("./routes/khoadaotao");
const { initAPILop } = require("./routes/lop");
const { initAPISinhVien } = require("./routes/sinhvien");
const { initAPIDoAn } = require("./routes/doan");
const multer = require("multer");
const path = require("path");
const { initAPIChuDe } = require("./routes/chude");
const { initAPIHuongDan } = require("./routes/huongdan");
const { initAPIThongBao } = require("./routes/thongbao");
const { initAPIDangNhap } = require("./routes/dangnhap");
const { initAPIThongKe } = require("./routes/thongke");
const { initAPIKiemTraThongBao } = require("./routes/kiemtra_thongbao");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "qldasv",
  port: "3306",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("./public"));
app.use(bodyParser.json());

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./upload"); // './public/images/' directory name where save the file
  },
  filename: (req, file, res) => {
    console.log(file);
    res(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/files", (req, res) => {
  const { name, path } = req.body;
  const sql = `INSERT INTO files (name, path) VALUES (?,?)`;
  db.query(sql, [name, path], (error, result) => {
    if (error) {
      console.error("Error: ", error);
      res.status(500).json(error);
    } else {
      console.log(result);
      const fileId = result.insertId;
      res.status(200).json({
        message: "File saved successfully",
        id: fileId,
        result,
      });
    }
  });
});
app.put("/files/:id", (req, res) => {
  const { id } = req.params;
  const { name, path } = req.body;
  const sql = `UPDATE files SET name=?,path=? WHERE id=?`;
  db.query(sql, [name, path, id], (error, result) => {
    if (error) {
      console.error("Error: ", error);
      res.status(500).json(error);
    } else {
      console.log(result);
      const fileId = result.insertId;
      res.status(200).json({
        message: "File saved successfully",
        id: fileId,
        result,
      });
    }
  });
});
app.get("/files", (req, res) => {
  const sql = "SELECT * FROM files";
  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error: ", error);
      res.json(error);
    } else {
      res.json(results);
    }
  });
});
app.get("/files/:id", (req, res) => {
  const fileId = req.params.id;
  const sql = "SELECT * FROM files WHERE id = ?";
  db.query(sql, [fileId], (error, results, fields) => {
    if (error) {
      console.error("Error: ", error);
      res.json(error);
    } else {
      res.json(results);
    }
  });
});
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.json({ path: "upload/" + req.file.filename });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
});
app.get("/upload/:filename", (req, res) => {
  const { filename } = req.params;
  const file = path.join(__dirname, "upload", filename);
  res.sendFile(file);
});
app.use("/upload", express.static("./upload"));

// app.get("/upload/:id", (req, res) => {
//   const avatarId = req.params.id;
//   res.sendFile(path.join(__dirname, `uploads/avatar-${avatarId}.jpg`));
// });
// //@type   POST
// //route for post data
// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     console.log("No file upload");
//   } else {
//     console.log(req.file);
//     var imgsrc = "http://127.0.0.1:5000/upload/" + req.file.filename;
//     console.log(imgsrc);
//     var insertData = "INSERT INTO users_file(file_src)VALUES(?)";
//     db.query(insertData, [imgsrc], (err, result) => {
//       if (err) throw err;
//       console.log("file uploaded");
//     });
//   }
// });

// Giang Vien
initAPIGiangVien(app, db);

// khoa
initAPIKhoa(app, db);

// nganh
initAPINganh(app, db);

// khoadaotao
initAPIKhoaDaoTao(app, db);

// lop
initAPILop(app, db);

// chude
initAPIChuDe(app, db);

// Sinh Vien
initAPISinhVien(app, db);

// doan
initAPIDoAn(app, db);

// huongdan
initAPIHuongDan(app, db);

// ThongBao
initAPIThongBao(app, db);

// KiemTraThongBao
initAPIKiemTraThongBao(app, db);

// DangNhap
initAPIDangNhap(app, db);

// ThongKe
initAPIThongKe(app, db);

const port = 1142;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
