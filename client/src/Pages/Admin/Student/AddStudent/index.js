import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm, setValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GenderSelect from "../../../../Components/GenderSelect";
import routes from "../../../../Routes";
import classApi from "../../../../Service/Api/classApi";
import studentApi from "../../../../Service/Api/studentApi";

const AddStudent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [genderError, setGenderError] = useState("");
  const [valueSelectClass, setValueSelectClass] = useState(null);
  const [selectClass, setSelectClass] = useState("");
  const [valueSelectGender, setValueSelectGender] = useState(null);
  const [selectGender, setSelectGender] = useState("");
  // const [genderDefault, setGenderDefault] = useState("");
  // const [nameDefault, setNameDefault] = useState("");
  // const [emailDefault, setEmailDefault] = useState("");
  // const [phoneDefault, setPhoneDefault] = useState("");
  // const [defaultNameValue, setDefaultNameValue] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({});
  useEffect(() => {
    const getClass = async () => {
      const responseClass = await classApi.getAll();
      // console.log("responseClass", responseClass);
      const dataTable = await responseClass.data.map((res) => {
        return {
          MaLop: res.MaLop,
          TenLop: res.TenLop,
          SoSV: res.SoSV,
          Email: res.Email,
          SoDT: res.SoDT,
          MaNganh: res.MaNganh,
          MaKhoaDaoTao: res.MaKhoaDaoTao,
        };
      });
      // console.log(dataTable);
      setSelectClass(dataTable);
    };
    getClass();
    // setNameDefault(getFacultyData.TenGiangVien);
    // setEmailDefault(getFacultyData.Email);
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  useEffect(() => {
    if (localStorage.status === "edit") {
      // // console.log(localStorage.getItem("studentEdit"));
      const id = localStorage.getItem("idStudent");
      // setNameDefault(id)
      // // console.log(id);
      const getStudent = async () => {
        const responseStudent = await studentApi.get({ id });
        // console.log("responseStudent", responseStudent);
        const dataTable = await responseStudent.data.map((res) => {
          return {
            id: res.MaSinhVien,
            TenSinhVien: res.TenSinhVien,
            GioiTinh: res.GioiTinh,
            NamSinh: res.NamSinh,
            QueQuan: res.QueQuan,
            Email: res.Email,
            SDT: res.SDT,
            MaLop: res.MaLop,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].TenSinhVien);
        setValue("gender", dataTable[0].GioiTinh);
        setValue("yearOfBirth", dataTable[0].NamSinh);
        setValue("homeTown", dataTable[0].QueQuan);
        setValue("email", dataTable[0].Email);
        setValue("phone", dataTable[0].SDT);
        setValue("classroom", dataTable[0].MaLop);
      };
      getStudent();
      // setNameDefault(getStudentData.TenGiangVien);
      // setEmailDefault(getStudentData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      // console.log(data);
      try {
        await studentApi
          .put({
            name: data.name,
            gender: data.gender,
            yearOfBirth: data.yearOfBirth,
            homeTown: data.homeTown,
            email: data.email,
            phone: data.phone,
            classroom: data.classroom,
            id: localStorage.getItem("idStudent"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Student")} ${t("Success")}`);
              navigate(`../${routes.admin.student}`);
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
      try {
        // console.log(data);
        await studentApi
          .post({
            name: data.name,
            gender: data.gender,
            yearOfBirth: data.yearOfBirth,
            homeTown: data.homeTown,
            email: data.email,
            phone: data.phone,
            classroom: data.classroom,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Student")} ${t("Success")}`);
              navigate(`../${routes.admin.student}`);
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
  const handleOnClose = (event) => {
    navigate(`../${routes.admin.student}`);
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
              {t("Student")}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={5.8}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Name cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
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
              <Grid item xs={5.8}>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Gender cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`gender`}
                      id={`gender`}
                      label={t("Gender")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectGender}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectGender(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.gender)}
                      helperText={errors.gender ? errors.gender.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Gender</MenuItem>
                      <MenuItem value="Nam" fullWidth>
                        Nam
                      </MenuItem>
                      <MenuItem value="Nữ" fullWidth>
                        Nữ
                      </MenuItem>
                      <MenuItem value="Khác" fullWidth>
                        Khác
                      </MenuItem>
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
              <Grid item xs={5.8}>
                <Controller
                  name="yearOfBirth"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Year of birth cannot be empty",
                    minLength: {
                      value: 4,
                      message: "This input has only 4 characters",
                    },
                    maxLength: {
                      value: 4,
                      message: "This input has only 4 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label={t("Year of birth")}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.yearOfBirth)}
                      helperText={
                        errors.yearOfBirth ? errors.yearOfBirth.message : ""
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5.8}>
                <Controller
                  name="homeTown"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Home town cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      label={t("Home town")}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.homeTown)}
                      helperText={
                        errors.homeTown ? errors.homeTown.message : ""
                      }
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
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email cannot be empty",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.email)}
                      helperText={errors.email ? errors.email.message : ""}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5.8}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Phone cannot be empty",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "This input is number only.",
                    },
                    minLength: {
                      value: 10,
                      message: "This input has only 10 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "This input has only 10 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label={t("Phone")}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.phone)}
                      helperText={errors.phone ? errors.phone.message : ""}
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
              <Grid item xs={12}>
                <Controller
                  name="classroom"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Class cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`classroom`}
                      id={`classroom`}
                      label={t("Class")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectClass}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectClass(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.classroom)}
                      helperText={
                        errors.classroom ? errors.classroom.message : ""
                      }
                      {...field}
                    >
                      <MenuItem fullWidth>Select Class</MenuItem>
                      {selectClass &&
                        selectClass.map((item) => {
                          return (
                            <MenuItem value={item.MaLop} fullWidth>
                              Lớp {item.TenLop}
                            </MenuItem>
                          );
                        })}
                      {/* <MenuItem value="1" fullWidth>
                        Ngành Công nghệ thông tin
                      </MenuItem>
                      <MenuItem value="ct" fullWidth>
                        Ngành Kỹ thuật công trình
                      </MenuItem>
                      <MenuItem value="other" fullWidth>
                        Other
                      </MenuItem> */}
                    </TextField>
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
export default AddStudent;
