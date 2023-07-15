import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm, setValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button3D from "../../../../Components/Button3D";
import FileUpload from "../../../../Components/FileUpload";
import GenderSelect from "../../../../Components/GenderSelect";
import routes from "../../../../Routes";
import guideApi from "../../../../Service/Api/guideApi";
import lecturerApi from "../../../../Service/Api/lecturerApi";
import projectManagementApi from "../../../../Service/Api/projectManagementApi";
import studentApi from "../../../../Service/Api/studentApi";
import topicApi from "../../../../Service/Api/topicApi";
const getSteps = () => {
  return ["Giảng viên nhận xét", "Ban đào tạo xác nhận"];
};
const AddProjectManagement = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [valueSelectStudent, setValueSelectStudent] = useState(null);
  const [selectStudent, setSelectStudent] = useState([]);
  const [valueSelectTopic, setValueSelectTopic] = useState(null);
  const [selectTopic, setSelectTopic] = useState([]);
  const [valueSelectLecturer, setValueSelectLecturer] = useState(null);
  const [selectLecturer, setSelectLecturer] = useState([]);
  const [idFile, setIdFile] = useState(null);
  const [idFileSoftCopy, setIdFileSoftCopy] = useState(null);
  const [idFileMinutes, setIdFileMinutes] = useState(null);
  const [nameBanMem, setNameBanMem] = useState(null);
  const [nameBienBan, setNameBienBan] = useState(null);
  const [pathBanMem, setPathBanMem] = useState(null);
  const [pathBienBan, setPathBienBan] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({});
  useEffect(() => {
    if (localStorage.status === "edit") {
      // // console.log(localStorage.getItem("projectManagementEdit"));
      const id = localStorage.getItem("idProjectManagement");
      // setNameDefault(id)
      // // console.log(id);
      const getProjectManagement = async () => {
        const responseProjectManagement = await projectManagementApi.get({
          id,
        });
        // console.log("responseProjectManagement", responseProjectManagement);
        const dataTable = await responseProjectManagement.data.map((res) => {
          return {
            MaDeTai: res.MaDeTai,
            TenDeTai: res.TenDeTai,
            MaChuDe: res.MaChuDe,
            MaSinhVien: res.MaSinhVien,
            MaGiangVien: res.MaGiangVien,
            BanMemDA: res.BanMemDA,
            DiemDA: res.DiemDA,
            BienBan: res.BienBan,
            TenDeTai: res.TenDeTai,
            nameBanMem: res.nameBanMem,
            nameBienBan: res.nameBienBan,
            pathBanMem: res.pathBanMem,
            pathBienBan: res.pathBienBan,
          };
        });
        // console.log(`dataTable`, dataTable);
        setValue("name", dataTable[0].TenDeTai);
        setValue("topic", dataTable[0].MaChuDe);
        setValue("student", dataTable[0].MaSinhVien);
        setValue("lecturer", dataTable[0].MaGiangVien);
        setValue("softCopy", dataTable[0].BanMemDA);
        setValue("point", dataTable[0].DiemDA);
        setValue("minutes", dataTable[0].BienBan);
        setNameBanMem(dataTable[0].nameBanMem);
        setNameBienBan(dataTable[0].nameBienBan);
        setPathBanMem(dataTable[0].pathBanMem);
        setPathBienBan(dataTable[0].pathBienBan);
        // console.log("Đây là value softCopy", getValues("softCopy"));
        // console.log("Đây là value minutes", getValues("minutes"));
        setIdFileSoftCopy(getValues("softCopy"));
        setIdFileMinutes(getValues("minutes"));
      };
      const getGuide = async () => {
        const responseGuide = await guideApi.get({
          id,
        });
        // console.log("responseGuide", responseGuide);
        const dataTable = await responseGuide.data.map((res) => {
          return {
            MaDeTai: res.MaDeTai,
            MaGiangVien: res.MaGiangVien,
            NhanXet: res.NhanXet,
            XacNhanGV: res.XacNhanGV,
            XacNhanBDT: res.XacNhanBDT,
          };
        });
        // console.log(`dataTable`, dataTable);
        setValue("note", dataTable[0].NhanXet);
        setActiveStep(
          dataTable[0].XacNhanBDT == "1"
            ? 2
            : dataTable[0].XacNhanGV == "1"
            ? 1
            : 0
        );
      };
      getProjectManagement();
      getGuide();

      // setNameDefault(getProjectManagementData.TenGiangVien);
      // setEmailDefault(getProjectManagementData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  const softCopy = watch("softCopy");
  // console.log("aaaaaâ Đây là softCopy:", softCopy);
  const minutes = watch("minutes");
  // console.log("aaaaaâ Đây là minutes:", minutes);
  const status = localStorage.getItem("status");

  useEffect(() => {
    const getStudent = async () => {
      const responseStudent = await studentApi.getAll();
      // console.log("responseStudent", responseStudent);
      const dataTable = await responseStudent.data.map((res) => {
        return {
          MaSinhVien: res.MaSinhVien,
          TenSinhVien: res.TenSinhVien,
          GioiTinh: res.GioiTinh,
          NamSinh: res.NamSinh,
          QueQuan: res.QueQuan,
          Email: res.Email,
          SDT: res.SDT,
          MaLop: res.MaLop,
        };
      });
      // console.log(dataTable);
      setSelectStudent(dataTable);
    };
    // const getTopic = async () => {
    //   const responseTopic = await studentApi.getAll();
    //   // console.log("responseTopic", responseTopic);
    //   const dataTable = await responseTopic.data.map((res) => {
    //     return {
    //       MaLop: res.MaLop,
    //       TenLop: res.TenLop,
    //       SoSV: res.SoSV,
    //       Email: res.Email,
    //       SoDT: res.SoDT,
    //       MaNganh: res.MaNganh,
    //       MaKhoaDaoTao: res.MaKhoaDaoTao,
    //     };
    //   });
    //   // console.log(dataTable);
    //   setSelectTopic(dataTable);
    // };
    const getLecturer = async () => {
      const responseLecturer = await lecturerApi.getAll();
      // console.log("responseLecturer", responseLecturer);
      const dataTable = await responseLecturer.data.map((res) => {
        return {
          MaGiangVien: res.MaGiangVien,
          TenGiangVien: res.TenGiangVien,
          GioiTinh: res.GioiTinh,
          Email: res.Email,
          SoDT: res.SoDT,
          MaNganh: res.MaNganh,
          MaBDT: res.MaBDT,
        };
      });
      // console.log(dataTable);
      setSelectLecturer(dataTable);
    };
    const getTopic = async () => {
      const responseTopic = await topicApi.getAll();
      // console.log("responseTopic", responseTopic);
      const dataTable = await responseTopic.data.map((res) => {
        return {
          MaChuDe: res.MaChuDe,
          TenChuDe: res.TenChuDe,
          GhiChu: res.GhiChu,
        };
      });
      // console.log(dataTable);
      setSelectTopic(dataTable);
    };
    getLecturer();
    getStudent();
    getTopic();
    // setNameDefault(getFacultyData.TenGiangVien);
    // setEmailDefault(getFacultyData.Email);
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };

  // useEffect(() => {
  //   // console.log("id", idFile);
  //   // console.log("softCopy", getValues("softCopy"));
  //   setIdFile(getValues("softCopy"));
  //   // console.log();
  // }, []);
  const handleFormSubmit = async (data) => {
    // data.preventDefault();
    console.log(data);
    if (localStorage.status == "edit") {
      // console.log(data, idFileSoftCopy, idFileMinutes);
      try {
        await projectManagementApi
          .put({
            name: data.name,
            topic: data.topic,
            student: data.student,
            lecturer: data.lecturer,
            softCopy: idFileSoftCopy,
            point: data.point ? data.point : null,
            minutes: idFileMinutes,
            id: localStorage.getItem("idProjectManagement"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              guideApi
                .put({
                  note: data.note,
                  lecturerConfirm: activeStep >= 1 ? 1 : 0,
                  trainingConfirm: activeStep >= 2 ? 1 : 0,
                  id: localStorage.getItem("idProjectManagement"),
                })
                .then((res) => {
                  // console.log(res.response.status == 200);
                  if (res.data.affectedRows) {
                    toast.success(`${t("Comment")} ${t("Success")}`);
                    toast.success(
                      `${t("Update")} ${t("Project Management")} ${t(
                        "Success"
                      )}`
                    );
                    navigate(`../${routes.admin.projectManagement}`);
                  } else {
                    // console.log(res);
                    toast.error(res.data.sqlMessage);
                  }
                  // // console.log("id đã nhận", response.data.id);
                  // setIdFile(response.data.id);
                })
                .catch((error) => {
                  console.log(error);
                  if (error.response.status == 500)
                    toast.error(`${t(error.response.data.sqlMessage)}`);
                });
            } else {
              // console.log(res);
              toast.error(res.data.sqlMessage);
            }
          })
          .catch((error) => {});
      } catch (error) {
        // console.log("Lỗi:", error.message);
      }
    } else {
      // console.log(data);
      try {
        await projectManagementApi
          .post({
            name: data.name,
            topic: data.topic,
            student: data.student,
            lecturer: data.lecturer,
            softCopy: idFileSoftCopy,
            point: data.point ? data.point : null,
            minutes: idFileMinutes,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(
                `${t("Create")} ${t("Project Management")} ${t("Success")}`
              );
              navigate(`../${routes.admin.projectManagement}`);
            } else {
              // console.log(res);
              toast.error(res.data.sqlMessage);
            }
          })
          .catch((error) => {});
      } catch (error) {
        // console.log("Lỗi:", error.message);
      }
    }
    // // console.log(response);
  };
  const roleUser = localStorage.getItem("roleUser");

  const [activeStep, setActiveStep] = useState(0);
  const [comment, setComment] = useState("");
  const [savedComment, setSavedComment] = useState("");
  const steps = getSteps();

  const handleNext = async () => {
    if (window.confirm("Are you sure you want to confirm?")) {
      // const responseGuide = await guideApi.get({
      //   id,
      // });
      // // console.log("responseGuide", responseGuide);
      // const dataTable = await responseGuide.data.map((res) => {
      //   return {
      //     MaDeTai: res.MaDeTai,
      //     MaGiangVien: res.MaGiangVien,
      //     NhanXet: res.NhanXet,
      //     XacNhanGV: res.XacNhanGV,
      //     XacNhanBDT: res.XacNhanBDT,
      //   };
      // });
      // // console.log(`dataTable`, dataTable);
      // setValue("note", dataTable[0].NhanXet);
      toast.success("Confirm Successfully");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // await projectManagementApi.delete({ id }).then(() => {
      //   toast.success(`${t("Delete")} ${t("Success")}`);
      //   setTimeout(() => {
      //     navigate(0);
      //   }, 500);
      // });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setComment("");
    setSavedComment("");
  };

  const handleSaveComment = () => {
    setSavedComment(comment);
  };
  const handleOnClose = (event) => {
    navigate(`../${routes.admin.projectManagement}`);
  };
  return (
    <>
      <Grid
        container
        direction={{ xs: "columns", sm: "row", md: "row", xl: "row" }}
        spacing={2}
        width={{ xs: "90%", sm: "90%", md: "80%", xl: "80%" }}
        sx={{ margin: "0 auto" }}
      >
        <Paper sx={{ width: "100%", height: "100%", px: "40px" }}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid
              item
              xs={12}
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {localStorage.getItem("status") == "edit"
                ? `${t("Update")}`
                : `${t("Add")}`}{" "}
              {t("Project")}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  // value={nameDefault}
                  rules={{
                    required: "Name cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      disabled={roleUser == "bandaotao" ? false : true}
                      label={t("Name")}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.name)}
                      helperText={errors.name ? errors.name.message : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={5.8}>
                <Controller
                  name="student"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Student cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      disabled={roleUser == "bandaotao" ? false : true}
                      labelId={`student`}
                      id={`student`}
                      label={t("Student")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectStudent}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectStudent(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.student)}
                      helperText={errors.student ? errors.student.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Student</MenuItem>
                      {selectStudent &&
                        selectStudent.map((item) => {
                          return (
                            <MenuItem value={item.MaSinhVien} fullWidth>
                              {item.TenSinhVien}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={5.8}>
                <Controller
                  name="topic"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Topic cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      disabled={roleUser == "bandaotao" ? false : true}
                      labelId={`topic`}
                      id={`topic`}
                      label={t("Topic")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectTopic}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectTopic(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.topic)}
                      helperText={errors.topic ? errors.topic.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Topic</MenuItem>
                      {selectTopic &&
                        selectTopic.map((item) => {
                          return (
                            <MenuItem value={item.MaChuDe} fullWidth>
                              {item.TenChuDe}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={12}>
                <Controller
                  name="lecturer"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Lecturer cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      disabled={roleUser == "bandaotao" ? false : true}
                      labelId={`lecturer`}
                      id={`lecturer`}
                      label={t("Lecturer")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectLecturer}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectLecturer(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.lecturer)}
                      helperText={
                        errors.lecturer ? errors.lecturer.message : ""
                      }
                      {...field}
                    >
                      <MenuItem fullWidth>Select Lecturer</MenuItem>
                      {selectLecturer &&
                        selectLecturer.map((item) => {
                          return (
                            <MenuItem value={item.MaGiangVien} fullWidth>
                              {item.TenGiangVien}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={5.8} sx={{ overflow: "hidden" }}>
                {roleUser === "sinhvien" ? (
                  <>
                    <Controller
                      name="softCopy"
                      control={control}
                      fullWidth
                      defaultValue=""
                      // rules={{
                      //   required: "Soft copy cannot be empty",
                      // }}
                      render={({ field }) => (
                        <FileUpload
                          {...field}
                          name="file"
                          setIdFile={setIdFileSoftCopy}
                          idFile={idFileSoftCopy}
                          label="Project Soft Copy"
                        />
                      )}
                    />
                    <Button3D sx={{ maxWidth: "100%" }}>
                      <Link
                        href={`http://phuongnamdts.com:5000/${pathBanMem}`}
                        target="_blank"
                        download
                        underline="none"
                        sx={{ ml: 1, maxWidth: "100%" }}
                      >
                        {t("Project soft copy")}: {nameBanMem}
                      </Link>
                    </Button3D>
                    {pathBanMem && pathBanMem.endsWith(".pdf") && (
                      <iframe
                        id="iframepdf"
                        style={{ width: "100%" }}
                        src={`http://phuongnamdts.com:5000/${pathBanMem}`}
                      ></iframe>
                    )}
                  </>
                ) : (
                  <>
                    <Button3D sx={{ maxWidth: "100%" }}>
                      <Link
                        href={`http://phuongnamdts.com:5000/${pathBanMem}`}
                        target="_blank"
                        download
                        underline="none"
                        sx={{ ml: 1, maxWidth: "100%" }}
                      >
                        {t("Project soft copy")}: {nameBanMem}
                      </Link>
                    </Button3D>
                    {pathBanMem && pathBanMem.endsWith(".pdf") && (
                      <iframe
                        id="iframepdf"
                        style={{ width: "100%" }}
                        src={`http://phuongnamdts.com:5000/${pathBanMem}`}
                      ></iframe>
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs={5.8}>
                {status && (
                  <div>
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      sx={{
                        "& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiStepIcon-root.Mui-completed":
                          {
                            color: "green",
                          },
                      }}
                    >
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <div>
                      {activeStep === steps.length &&
                      roleUser === "bandaotao" ? (
                        <div>
                          <Typography>Đồ án đã được xác nhận</Typography>
                          <Button onClick={handleReset}>Reset</Button>
                        </div>
                      ) : (
                        <div>
                          {activeStep === 0 && roleUser === "giangvien" && (
                            <>
                              {/* <TextField
                              label="Nhận xét của giảng viên"
                              value={comment}
                              onChange={(event) =>
                                setComment(event.target.value)
                              }
                              fullWidth
                              margin="normal"
                            /> */}
                              <Controller
                                name="note"
                                control={control}
                                defaultValue=""
                                // value={noteDefault}
                                // rules={{
                                //   required: "Name cannot be empty",
                                // }}
                                render={({ field }) => (
                                  <TextField
                                    label="Nhận xét của giảng viên"
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{ my: 1 }}
                                    error={Boolean(errors.note)}
                                    helperText={
                                      errors.note ? errors.note.message : ""
                                    }
                                    {...field}
                                  />
                                )}
                              />
                              {/* <Button onClick={handleSaveComment}>
                              Lưu nhận xét
                            </Button> */}
                            </>
                          )}
                          <Box sx={{ display: "flex" }}>
                            {((roleUser === "giangvien" && activeStep === 1) ||
                              (roleUser === "bandaotao" &&
                                activeStep === 1)) && (
                              <Button
                                // disabled={activeStep === 0}
                                variant="contained"
                                onClick={handleBack}
                                sx={{ my: 1, mr: 2 }}
                              >
                                Hủy
                              </Button>
                            )}
                            {(roleUser === "giangvien" && activeStep === 0) ||
                            (roleUser === "bandaotao" && activeStep === 1) ? (
                              <Button
                                variant="contained"
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  my: 1,
                                }}
                                onClick={handleNext}
                              >
                                {activeStep === steps.length - 1
                                  ? "Hoàn thành"
                                  : "Xác nhận"}
                              </Button>
                            ) : null}
                          </Box>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={5.8} sx={{ overflow: "hidden" }}>
                {roleUser === "bandaotao" ? (
                  <>
                    <Controller
                      name="minutes"
                      control={control}
                      fullWidth
                      defaultValue=""
                      // rules={{
                      //   required: "Soft copy cannot be empty",
                      // }}
                      render={({ field }) => (
                        <FileUpload
                          {...field}
                          name="file"
                          setIdFile={setIdFileMinutes}
                          idFile={idFileMinutes}
                          label="Project Minutes"
                        />
                      )}
                    />
                    <Button3D sx={{ maxWidth: "100%" }}>
                      <Link
                        href={`http://phuongnamdts.com:5000/${pathBienBan}`}
                        target="_blank"
                        download
                        underline="none"
                        sx={{ ml: 1, maxWidth: "100%" }}
                      >
                        {t("Project minutes")}: {nameBienBan}
                      </Link>
                    </Button3D>
                  </>
                ) : (
                  <Button3D sx={{ maxWidth: "100%" }}>
                    <Link
                      href={`http://phuongnamdts.com:5000/${pathBienBan}`}
                      target="_blank"
                      download
                      underline="none"
                      sx={{ ml: 1, maxWidth: "100%" }}
                    >
                      {t("Project minutes")}: {nameBienBan}
                    </Link>
                  </Button3D>
                )}
              </Grid>
              <Grid item xs={5.8}>
                <Controller
                  name="point"
                  control={control}
                  defaultValue=""
                  // value={pointDefault}
                  // rules={{
                  //   required: "Point cannot be empty",
                  // }}
                  render={({ field }) => (
                    <TextField
                      disabled={roleUser !== "bandaotao"}
                      label="Point"
                      type="number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.point)}
                      helperText={errors.point ? errors.point.message : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid xs={12} sx={{ m: 4, mb: { xs: "32px", lg: "56px" } }}>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={handleOnClose}
                  sx={{
                    margin: "0 10px",
                    height: "26px",
                    width: "115px",
                    border: "1px solid #BDBDBD",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    boxShadow:
                      "1px 2px 3px 0px #ccc, -8px -12px 15px -18px #666666 inset",
                    "&:hover": {
                      boxShadow:
                        "1px 2px 1px 0px #ccc, -9px 12px 12px -18px #666666 inset",
                    },
                  }}
                >
                  {t("Cancel")}
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    margin: "0 10px",
                    height: "26px",
                    width: "115px",
                    border: "1px solid #BDBDBD",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    boxShadow:
                      "1px 2px 3px 0px #ccc, -8px -12px 15px -18px #666666 inset",
                    "&:hover": {
                      boxShadow:
                        "1px 2px 1px 0px #ccc, -9px 12px 12px -18px #666666 inset",
                    },
                  }}
                >
                  {t("Save")}
                </Button>
              </div>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};
export default AddProjectManagement;
