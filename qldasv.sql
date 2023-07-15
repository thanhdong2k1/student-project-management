-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 12, 2023 lúc 08:31 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qldasv`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chude`
--

CREATE TABLE `chude` (
  `MaChuDe` int(11) NOT NULL,
  `TenChuDe` varchar(200) NOT NULL,
  `GhiChu` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chude`
--

INSERT INTO `chude` (`MaChuDe`, `TenChuDe`, `GhiChu`) VALUES
(1, 'Lập trình Web', ''),
(2, 'Lập trình Mobile', NULL),
(3, 'Trí tuệ nhân tạo', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dangnhap`
--

CREATE TABLE `dangnhap` (
  `MaDN` int(11) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `MatKhau` varchar(200) NOT NULL,
  `MaGiangVien` int(11) DEFAULT NULL,
  `MaSinhVien` int(11) DEFAULT NULL,
  `LoaiTaiKhoan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dangnhap`
--

INSERT INTO `dangnhap` (`MaDN`, `Email`, `MatKhau`, `MaGiangVien`, `MaSinhVien`, `LoaiTaiKhoan`) VALUES
(1, 'bdt@gmail.com', '1', 1, NULL, 1),
(2, 'gv1@gmail.com', '1', 2, NULL, 2),
(3, 'gv2@gmail.com', '1', 3, NULL, 2),
(4, 'gv3@gmail.com', '1', 4, NULL, 2),
(5, 'gv4@gmail.com', '1', 5, NULL, 2),
(6, 'gv5@gmail.com', '1', 6, NULL, 2),
(7, 'sv1@gmail.com', '2', NULL, 1, 3),
(8, 'sv2@gmail.com', '1', NULL, 2, 3),
(9, 'sv3@gmail.com', '1', NULL, 3, 3),
(10, 'sv4@gmail.com', '1', NULL, 4, 3),
(11, 'sv5@gmail.com', '1', NULL, 5, 3),
(12, 'sv6@gmail.com', '1', NULL, 6, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doan`
--

CREATE TABLE `doan` (
  `MaDeTai` int(11) NOT NULL,
  `TenDeTai` varchar(200) NOT NULL,
  `MaChuDe` int(11) NOT NULL,
  `MaSinhVien` int(11) NOT NULL,
  `MaGiangVien` int(11) NOT NULL,
  `BanMemDA` int(11) DEFAULT NULL,
  `DiemDA` float DEFAULT NULL,
  `BienBan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `doan`
--

INSERT INTO `doan` (`MaDeTai`, `TenDeTai`, `MaChuDe`, `MaSinhVien`, `MaGiangVien`, `BanMemDA`, `DiemDA`, `BienBan`) VALUES
(1, 'Báo cáo đồ án Website bán hàng với hệ quản trị nội dung Joomla', 1, 1, 2, 1, 9, 2),
(2, 'Báo cáo đồ án xây dựng Website bán hàng tranh dân gian Việt Nam', 1, 2, 3, 26, 0, NULL),
(3, 'Báo cáo đồ án xây dựng Website bán hàng cho Công ty Cổ phần chế biến gỗ Việt Đức', 1, 3, 3, NULL, NULL, NULL),
(4, 'Báo cáo đồ án xây dựng Ứng dụng Lazada trên android', 2, 4, 5, NULL, NULL, NULL),
(5, 'Báo cáo đồ án xây dựng Ứng dụng gọi món ăn nhà hàng SmartOrder trên android', 2, 5, 5, NULL, NULL, NULL),
(6, 'Báo cáo đồ án xây dựng Ứng dụng trí tuệ nhân tạo nhận dạng chữ viết tay xây dựng ứng dụng học từ vựng Tiếng Anh với NodeJs, Angula', 3, 6, 4, 3, NULL, NULL);

--
-- Bẫy `doan`
--
DELIMITER $$
CREATE TRIGGER `check_dates` BEFORE UPDATE ON `doan` FOR EACH ROW BEGIN
  DECLARE start_date DATE;
  DECLARE end_date DATE;
  IF NOT (NEW.BanMemDA <=> NULL) AND OLD.BanMemDA != NEW.BanMemDA THEN
    SELECT NgayBatDau, NgayKetThuc INTO start_date, end_date FROM thongbao WHERE MaTB IN (SELECT MaTB FROM kiemtra_thongbao WHERE Cot = 'BanMemDA');
    IF DATE(NOW()) < DATE(start_date) OR DATE(NOW()) > DATE(end_date) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Expired';
    END IF;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_delete_huongdan` AFTER DELETE ON `doan` FOR EACH ROW BEGIN
  DELETE FROM huongdan WHERE MaDeTai = OLD.MaDeTai;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_insert_huongdan` AFTER INSERT ON `doan` FOR EACH ROW BEGIN
  INSERT INTO huongdan (MaDeTai, MaGiangVien) VALUES (NEW.MaDeTai, NEW.MaGiangVien);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tg_update_huongdan` AFTER UPDATE ON `doan` FOR EACH ROW BEGIN
  UPDATE huongdan SET MaGiangVien = NEW.MaGiangVien WHERE MaDeTai = NEW.MaDeTai;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `files`
--

INSERT INTO `files` (`id`, `name`, `path`) VALUES
(1, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680595458510.pdf'),
(2, '3. Luat_ket_hop.pdf', 'upload/3. Luat_ket_hop.pdf-1680595883864.pdf'),
(3, 'Inventory Management system (Community).pdf', 'upload/Inventory Management system (Community).pdf-1680020555374.pdf'),
(4, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680336201156.pdf'),
(5, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680337575153.pdf'),
(6, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680338788279.pdf'),
(7, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680338819239.pdf'),
(8, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680338870469.pdf'),
(9, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533088368.pdf'),
(10, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533167651.pdf'),
(11, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533168755.pdf'),
(12, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533170491.pdf'),
(13, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533223588.pdf'),
(14, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533252977.pdf'),
(15, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533255364.pdf'),
(16, '1. Tổng quan.pdf', 'upload/1. Tá»ng quan.pdf-1680533931838.pdf'),
(17, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534047353.pdf'),
(18, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534254322.pdf'),
(19, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534263578.pdf'),
(21, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534486007.pdf'),
(22, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534556613.pdf'),
(23, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534670388.pdf'),
(24, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534681323.pdf'),
(25, '2.Tien_xu_ly_du_lieu.pdf', 'upload/2.Tien_xu_ly_du_lieu.pdf-1680534704613.pdf'),
(26, '3. Luat_ket_hop.pdf', 'upload/3. Luat_ket_hop.pdf-1680539352206.pdf');

--
-- Bẫy `files`
--
DELIMITER $$
CREATE TRIGGER `check_files_and_dates` BEFORE UPDATE ON `files` FOR EACH ROW BEGIN
  DECLARE start_date DATE;
  DECLARE end_date DATE;
  IF EXISTS (SELECT 1 FROM doan WHERE BanMemDA=NEW.id) THEN
    SELECT NgayBatDau, NgayKetThuc INTO start_date, end_date FROM thongbao WHERE MaTB IN (SELECT MaTB FROM kiemtra_thongbao WHERE Cot = 'BanMemDA');
    IF DATE(NOW()) < DATE(start_date) OR DATE(NOW()) > DATE(end_date) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Expired';
    END IF;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giangvien`
--

CREATE TABLE `giangvien` (
  `MaGiangVien` int(11) NOT NULL,
  `TenGiangVien` varchar(200) NOT NULL,
  `GioiTinh` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `SoDT` varchar(10) NOT NULL,
  `MaNganh` int(11) NOT NULL,
  `MaBDT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `giangvien`
--

INSERT INTO `giangvien` (`MaGiangVien`, `TenGiangVien`, `GioiTinh`, `Email`, `SoDT`, `MaNganh`, `MaBDT`) VALUES
(1, 'Ban Đào Tạo', 'Nam', 'bandaotao@gmail.com', '0283514060', 1, 1),
(2, 'Lê Trần Hữu Phúc', 'Nam', 'letranhuuphuc@gmail.com', '0987849567', 1, 1),
(3, 'Viên Thanh Nhã', 'Nam', 'vienthanhnha@gmail.com', '0377849567', 1, 1),
(4, 'Vũ Thị Hạnh', 'Nữ', 'hanhvt@gmail.com', '0348768769', 1, 1),
(5, 'Phạm Hồng Xuân', 'Nam', 'phamhongxuan@gmail.com', '0977132884', 1, 1),
(6, 'Huỳnh Thanh Đông', 'Nam', 'huynhthanhdong05102001@gmail.com', '0866956654', 2, 1);

--
-- Bẫy `giangvien`
--
DELIMITER $$
CREATE TRIGGER `giang_vien_dang_nhap_trigger` AFTER INSERT ON `giangvien` FOR EACH ROW BEGIN
    INSERT INTO dangnhap (Email, MatKhau, MaGiangVien, LoaiTaiKhoan)
    VALUES (NEW.Email, '1', NEW.MaGiangVien, 2);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `huongdan`
--

CREATE TABLE `huongdan` (
  `MaDeTai` int(11) NOT NULL,
  `MaGiangVien` int(11) NOT NULL,
  `NhanXet` varchar(200) DEFAULT NULL,
  `XacNhanGV` varchar(200) DEFAULT NULL,
  `XacNhanBDT` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `huongdan`
--

INSERT INTO `huongdan` (`MaDeTai`, `MaGiangVien`, `NhanXet`, `XacNhanGV`, `XacNhanBDT`) VALUES
(1, 2, 'Bản này cần sửa lại Tên giảng viên aâbcấđâsáđâsdsadsađá', '1', '1'),
(2, 3, 'mâcss', '0', '0'),
(3, 3, 'áđâsdá', '0', '0'),
(4, 5, '', '1', '0'),
(5, 5, '', '0', '0'),
(6, 4, 'sadsadsađasađasa', '0', '0');

--
-- Bẫy `huongdan`
--
DELIMITER $$
CREATE TRIGGER `check_dates_huongdan` BEFORE UPDATE ON `huongdan` FOR EACH ROW BEGIN
  DECLARE start_date DATE;
  DECLARE end_date DATE;
  IF NOT (NEW.NhanXet <=> NULL) AND OLD.NhanXet != NEW.NhanXet THEN
    SELECT NgayBatDau, NgayKetThuc INTO start_date, end_date FROM thongbao WHERE MaTB IN (SELECT MaTB FROM kiemtra_thongbao WHERE Cot = 'NhanXet');
    IF DATE(NOW()) < DATE(start_date) OR DATE(NOW()) > DATE(end_date) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Expired';
    END IF;
  END IF;
  IF NOT (NEW.XacNhanGV <=> NULL) AND OLD.XacNhanGV != NEW.XacNhanGV THEN
    SELECT NgayBatDau, NgayKetThuc INTO start_date, end_date FROM thongbao WHERE MaTB IN (SELECT MaTB FROM kiemtra_thongbao WHERE Cot = 'XacNhanGV');
    IF DATE(NOW()) < DATE(start_date) OR DATE(NOW()) > DATE(end_date) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Expired';
    END IF;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoa`
--

CREATE TABLE `khoa` (
  `MaKhoa` int(11) NOT NULL,
  `TenKhoa` varchar(200) NOT NULL,
  `TruongKhoa` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khoa`
--

INSERT INTO `khoa` (`MaKhoa`, `TenKhoa`, `TruongKhoa`) VALUES
(1, 'Công nghệ thông tin', 'Lê Trần Hữu Phúc');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoadaotao`
--

CREATE TABLE `khoadaotao` (
  `MaKhoaDaoTao` int(11) NOT NULL,
  `GhiChu` varchar(200) DEFAULT NULL,
  `NienKhoa` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khoadaotao`
--

INSERT INTO `khoadaotao` (`MaKhoaDaoTao`, `GhiChu`, `NienKhoa`) VALUES
(1, 'Khóa 59', 'K59'),
(2, 'Khóa 60', 'K60'),
(3, 'Khóa 61', 'K61'),
(4, 'Khóa 62', 'K62'),
(5, 'Khóa 63', 'K63'),
(6, 'Khóa 64', 'K64');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kiemtra_thongbao`
--

CREATE TABLE `kiemtra_thongbao` (
  `Cot` varchar(50) NOT NULL,
  `MaTB` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `kiemtra_thongbao`
--

INSERT INTO `kiemtra_thongbao` (`Cot`, `MaTB`) VALUES
('BanMemDA', 5),
('NhanXet', 9),
('XacNhanGV', 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lop`
--

CREATE TABLE `lop` (
  `MaLop` int(11) NOT NULL,
  `TenLop` varchar(200) NOT NULL,
  `SoSV` int(11) NOT NULL,
  `MaNganh` int(11) NOT NULL,
  `MaKhoaDaoTao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lop`
--

INSERT INTO `lop` (`MaLop`, `TenLop`, `SoSV`, `MaNganh`, `MaKhoaDaoTao`) VALUES
(1, 'S22-61TH1', 2, 3, 3),
(2, 'S22-61TH2', 4, 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nganh`
--

CREATE TABLE `nganh` (
  `MaNganh` int(11) NOT NULL,
  `TenNganh` varchar(200) NOT NULL,
  `MaKhoa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nganh`
--

INSERT INTO `nganh` (`MaNganh`, `TenNganh`, `MaKhoa`) VALUES
(1, 'Công nghệ phần mềm', 1),
(2, 'Khoa học máy tính.', 1),
(3, 'Kỹ thuật máy tính.', 1),
(4, 'An toàn thông tin.', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sinhvien`
--

CREATE TABLE `sinhvien` (
  `MaSinhVien` int(11) NOT NULL,
  `TenSinhVien` varchar(200) NOT NULL,
  `GioiTinh` varchar(200) NOT NULL,
  `NamSinh` varchar(4) NOT NULL,
  `QueQuan` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `SDT` varchar(10) NOT NULL,
  `MaLop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sinhvien`
--

INSERT INTO `sinhvien` (`MaSinhVien`, `TenSinhVien`, `GioiTinh`, `NamSinh`, `QueQuan`, `Email`, `SDT`, `MaLop`) VALUES
(1, 'Nguyễn Văn Anh', 'Nam', '2001', 'Cao Bằng', 'vananhtlus@gmail.com', '0987764543', 1),
(2, 'Nguyễn Anh Ngọc Trân', 'Nữ', '2001', 'Tiền Giang', 'nganhngoctran@gmail.com', '0367429897', 2),
(3, 'Trần Thanh Tuấn', 'Nam', '2001', 'Cần Thơ', 'tranlinh@gmail.com', '0338783289', 1),
(4, 'Phạm Đức Minh', 'Nam', '2002', 'Bình Định', 'phamducminh@gmail.com', '0987652828', 2),
(5, 'Huỳnh Thanh Vy', 'Nữ', '2001', 'Vũng Tàu', 'huynhthanhvy@gmail.com', '0144655789', 2),
(6, 'Lê Thanh Mộc Trà', 'Nữ', '2001', 'An Giang', 'moctra@gmail.com', '0988436768', 2);

--
-- Bẫy `sinhvien`
--
DELIMITER $$
CREATE TRIGGER `reduce_soluong` AFTER DELETE ON `sinhvien` FOR EACH ROW UPDATE lop SET SoSV = SoSV - 1 WHERE MaLop = OLD.MaLop
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `sinh_vien_dang_nhap_trigger` AFTER INSERT ON `sinhvien` FOR EACH ROW BEGIN
    INSERT INTO dangnhap (Email, MatKhau, MaSinhVien, LoaiTaiKhoan)
    VALUES (NEW.Email, '1', NEW.MaSinhVien, 3);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_soluong` AFTER INSERT ON `sinhvien` FOR EACH ROW UPDATE lop SET SoSV = SoSV + 1 WHERE MaLop = NEW.MaLop
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thongbao`
--

CREATE TABLE `thongbao` (
  `MaTB` int(11) NOT NULL,
  `TenTB` varchar(200) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date NOT NULL,
  `MaBanDaoTao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thongbao`
--

INSERT INTO `thongbao` (`MaTB`, `TenTB`, `NgayBatDau`, `NgayKetThuc`, `MaBanDaoTao`) VALUES
(2, 'Thông báo bảo vệ đồ án tốt nghiệp', '2023-03-28', '2023-05-15', 1),
(3, 'Thông báo hướng dẫn bảo vệ đồ án tốt nghiệp', '2023-03-18', '2023-04-02', 1),
(4, 'Thông báo kết quả đề tài đồ án tốt nghiệp', '2023-03-15', '2023-03-16', 1),
(5, 'Thông báo thời hạn nộp đồ án tốt nghiệp', '0000-00-00', '0000-00-00', 1),
(6, 'Thông báo thời gian giảng viên xác nhận đồ án tốt nghiệp', '2023-04-09', '2023-04-12', 1),
(9, 'Thời gian giảng viên nhận xét đồ án tốt nghiệp', '2023-04-01', '2023-04-04', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chude`
--
ALTER TABLE `chude`
  ADD PRIMARY KEY (`MaChuDe`);

--
-- Chỉ mục cho bảng `dangnhap`
--
ALTER TABLE `dangnhap`
  ADD PRIMARY KEY (`MaDN`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `MaGiangVien` (`MaGiangVien`),
  ADD KEY `MaSinhVien` (`MaSinhVien`);

--
-- Chỉ mục cho bảng `doan`
--
ALTER TABLE `doan`
  ADD PRIMARY KEY (`MaDeTai`),
  ADD KEY `MaChuDe` (`MaChuDe`),
  ADD KEY `MaSinhVien` (`MaSinhVien`),
  ADD KEY `MaGiangVien` (`MaGiangVien`),
  ADD KEY `doan_ibfk_4` (`BanMemDA`),
  ADD KEY `doan_ibfk_5` (`BienBan`);

--
-- Chỉ mục cho bảng `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `giangvien`
--
ALTER TABLE `giangvien`
  ADD PRIMARY KEY (`MaGiangVien`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `MaNganh` (`MaNganh`),
  ADD KEY `MaBDT` (`MaBDT`);

--
-- Chỉ mục cho bảng `huongdan`
--
ALTER TABLE `huongdan`
  ADD PRIMARY KEY (`MaDeTai`,`MaGiangVien`),
  ADD KEY `MaDeTai` (`MaDeTai`),
  ADD KEY `MaGV` (`MaGiangVien`);

--
-- Chỉ mục cho bảng `khoa`
--
ALTER TABLE `khoa`
  ADD PRIMARY KEY (`MaKhoa`);

--
-- Chỉ mục cho bảng `khoadaotao`
--
ALTER TABLE `khoadaotao`
  ADD PRIMARY KEY (`MaKhoaDaoTao`);

--
-- Chỉ mục cho bảng `kiemtra_thongbao`
--
ALTER TABLE `kiemtra_thongbao`
  ADD PRIMARY KEY (`Cot`,`MaTB`);

--
-- Chỉ mục cho bảng `lop`
--
ALTER TABLE `lop`
  ADD PRIMARY KEY (`MaLop`),
  ADD KEY `MaNganh` (`MaNganh`),
  ADD KEY `MaKhoaDaoTao` (`MaKhoaDaoTao`);

--
-- Chỉ mục cho bảng `nganh`
--
ALTER TABLE `nganh`
  ADD PRIMARY KEY (`MaNganh`),
  ADD KEY `MaKhoa` (`MaKhoa`);

--
-- Chỉ mục cho bảng `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD PRIMARY KEY (`MaSinhVien`),
  ADD KEY `MaLop` (`MaLop`);

--
-- Chỉ mục cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  ADD PRIMARY KEY (`MaTB`),
  ADD KEY `thongbao_ibfk_1` (`MaBanDaoTao`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `dangnhap`
--
ALTER TABLE `dangnhap`
  MODIFY `MaDN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  MODIFY `MaTB` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `dangnhap`
--
ALTER TABLE `dangnhap`
  ADD CONSTRAINT `dangnhap_ibfk_2` FOREIGN KEY (`MaGiangVien`) REFERENCES `giangvien` (`MaGiangVien`) ON DELETE CASCADE,
  ADD CONSTRAINT `dangnhap_ibfk_3` FOREIGN KEY (`MaSinhVien`) REFERENCES `sinhvien` (`MaSinhVien`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `doan`
--
ALTER TABLE `doan`
  ADD CONSTRAINT `doan_ibfk_1` FOREIGN KEY (`MaChuDe`) REFERENCES `chude` (`MaChuDe`),
  ADD CONSTRAINT `doan_ibfk_2` FOREIGN KEY (`MaSinhVien`) REFERENCES `sinhvien` (`MaSinhVien`),
  ADD CONSTRAINT `doan_ibfk_3` FOREIGN KEY (`MaGiangVien`) REFERENCES `giangvien` (`MaGiangVien`),
  ADD CONSTRAINT `doan_ibfk_4` FOREIGN KEY (`BanMemDA`) REFERENCES `files` (`id`),
  ADD CONSTRAINT `doan_ibfk_5` FOREIGN KEY (`BienBan`) REFERENCES `files` (`id`);

--
-- Các ràng buộc cho bảng `giangvien`
--
ALTER TABLE `giangvien`
  ADD CONSTRAINT `giangvien_ibfk_1` FOREIGN KEY (`MaNganh`) REFERENCES `nganh` (`MaNganh`),
  ADD CONSTRAINT `giangvien_ibfk_2` FOREIGN KEY (`MaBDT`) REFERENCES `giangvien` (`MaGiangVien`);

--
-- Các ràng buộc cho bảng `huongdan`
--
ALTER TABLE `huongdan`
  ADD CONSTRAINT `huongdan_ibfk_1` FOREIGN KEY (`MaDeTai`) REFERENCES `doan` (`MaDeTai`) ON DELETE CASCADE,
  ADD CONSTRAINT `huongdan_ibfk_2` FOREIGN KEY (`MaGiangVien`) REFERENCES `giangvien` (`MaGiangVien`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `lop`
--
ALTER TABLE `lop`
  ADD CONSTRAINT `lop_ibfk_1` FOREIGN KEY (`MaNganh`) REFERENCES `nganh` (`MaNganh`),
  ADD CONSTRAINT `lop_ibfk_2` FOREIGN KEY (`MaKhoaDaoTao`) REFERENCES `khoadaotao` (`MaKhoaDaoTao`);

--
-- Các ràng buộc cho bảng `nganh`
--
ALTER TABLE `nganh`
  ADD CONSTRAINT `nganh_ibfk_1` FOREIGN KEY (`MaKhoa`) REFERENCES `khoa` (`MaKhoa`);

--
-- Các ràng buộc cho bảng `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD CONSTRAINT `sinhvien_ibfk_1` FOREIGN KEY (`MaLop`) REFERENCES `lop` (`MaLop`);

--
-- Các ràng buộc cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  ADD CONSTRAINT `thongbao_ibfk_1` FOREIGN KEY (`MaBanDaoTao`) REFERENCES `giangvien` (`MaGiangVien`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
