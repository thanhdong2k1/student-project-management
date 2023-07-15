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
import branchApi from "../../../../Service/Api/branchApi";
import classApi from "../../../../Service/Api/classApi";
import courseApi from "../../../../Service/Api/courseApi";

const AddClass = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quanltyError, setGenderError] = useState("");
  const [valueSelectBranch, setValueSelectBranch] = useState(null);
  const [selectBranch, setSelectBranch] = useState(null);
  const [valueSelectCourse, setValueSelectCourse] = useState(null);
  const [selectCourse, setSelectCourse] = useState(null);
  const [quanltyDefault, setGenderDefault] = useState("");
  const [nameDefault, setNameDefault] = useState("");
  const [emailDefault, setEmailDefault] = useState("");
  const [phoneDefault, setPhoneDefault] = useState("");
  const [defaultNameValue, setDefaultNameValue] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({});
  useEffect(() => {
    if (localStorage.status === "edit") {
      // // console.log(localStorage.getItem("classEdit"));
      const id = localStorage.getItem("idClass");
      // setNameDefault(id)
      // // console.log(id);
      const getClass = async () => {
        const responseClass = await classApi.get({ id });
        // console.log("responseClass", responseClass);
        const dataTable = await responseClass.data.map((res) => {
          return {
            TenLop: res.TenLop,
            SoSV: res.SoSV,
            Email: res.Email,
            SoDT: res.SoDT,
            MaNganh: res.MaNganh,
            MaKhoaDaoTao: res.MaKhoaDaoTao,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].TenLop);
        setValue("quantity", dataTable[0].SoSV);
        setValue("branch", dataTable[0].MaNganh);
        setValue("course", dataTable[0].MaKhoaDaoTao);
      };
      getClass();
      // setNameDefault(getClassData.TenLop);
      // setEmailDefault(getClassData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  useEffect(() => {
    const getBranch = async () => {
      const responseBranch = await branchApi.getAll();
      // console.log("responseBranch", responseBranch);
      const dataTable = await responseBranch.data.map((res) => {
        return {
          MaNganh: res.MaNganh,
          TenNganh: res.TenNganh,
          MaKhoa: res.MaKhoa,
        };
      });
      // console.log(dataTable);
      setSelectBranch(dataTable);
    };
    const getCourse = async () => {
      const responseCourse = await courseApi.getAll();
      // console.log("responseCourse", responseCourse);
      const dataTable = await responseCourse.data.map((res) => {
        return {
          MaKhoaDaoTao: res.MaKhoaDaoTao,
          NienKhoa: res.NienKhoa,
        };
      });
      // console.log(dataTable);
      setSelectCourse(dataTable);
    };
    getBranch();
    getCourse();
    // setNameDefault(getFacultyData.TenGiangVien);
    // setEmailDefault(getFacultyData.Email);
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      try {
        await classApi
          .put({
            name: data.name,
            quantity: data.quantity,
            branch: data.branch,
            course: data.course,
            id: localStorage.getItem("idClass"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Account")} ${t("Success")}`);
              navigate(`../${routes.admin.class}`);
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
        await classApi
          .post({
            name: data.name,
            quantity: data.quantity ? "" : 0,
            branch: data.branch,
            course: data.course,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Class")} ${t("Success")}`);
              navigate(`../${routes.admin.class}`);
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
    navigate(`../${routes.admin.class}`);
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
              {t("Class")}
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
                  name="quantity"
                  control={control}
                  defaultValue=""
                  rules={
                    {
                      // required: "Name cannot be empty",
                    }
                  }
                  render={({ field }) => (
                    <TextField
                      disabled
                      label={t("Quantity")}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.quantity)}
                      helperText={
                        errors.quantity ? errors.quantity.message : ""
                      }
                      {...field}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
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
                {/* <Controller
                  name="branch"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Branch cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`branch`}
                      id={`branch`}
                      label={t("Branch")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectBranch}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectBranch(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.branch)}
                      helperText={errors.branch ? errors.branch.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Branch</MenuItem>
                      {selectBranch &&
                        selectBranch.map((item) => {
                          return (
                            <MenuItem value={item.MaNganh} fullWidth>
                              Ngành {item.TenNganh}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  )}
                /> */}
                {/* <Controller
                  name="branch"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Branch cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`branch`}
                      id={`branch`}
                      label={t("Branch")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectBranch}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectBranch(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.branch)}
                      helperText={errors.branch ? errors.branch.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Branch</MenuItem>
                      {selectBranch.map((item) => {
                        return [
                          <MenuItem value={item.MaNganh} fullWidth>
                            {item.TenNganh}
                          </MenuItem>,
                        ];
                      })}
                    </TextField>
                  )}
                /> */}
                <Controller
                  name="branch"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Branch cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`branch`}
                      id={`branch`}
                      label={t("Branch")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectBranch}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectBranch(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.branch)}
                      helperText={errors.branch ? errors.branch.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Branch</MenuItem>
                      {selectBranch &&
                        selectBranch.map((item) => {
                          return (
                            <MenuItem value={item.MaNganh} fullWidth>
                              Lớp {item.TenNganh}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={5.8}>
                <Controller
                  name="course"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Course cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`course`}
                      id={`course`}
                      label={t("Course")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectCourse}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectCourse(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.course)}
                      helperText={errors.course ? errors.course.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Course</MenuItem>
                      {selectCourse &&
                        selectCourse.map((item) => {
                          return (
                            <MenuItem value={item.MaKhoaDaoTao} fullWidth>
                              {item.NienKhoa}
                            </MenuItem>
                          );
                        })}
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
export default AddClass;
