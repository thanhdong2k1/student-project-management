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
import accountApi from "../../../../Service/Api/accountApi";
import courseApi from "../../../../Service/Api/courseApi";

const AddAccount = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [quanltyError, setGenderError] = useState("");
  const [valueSelectBranch, setValueSelectBranch] = useState(null);
  const [selectBranch, setSelectBranch] = useState("");
  const [valueSelectCourse, setValueSelectCourse] = useState(null);
  const [selectCourse, setSelectCourse] = useState("");
  const [quanltyDefault, setGenderDefault] = useState("");
  const [nameDefault, setNameDefault] = useState("");
  const [emailDefault, setEmailDefault] = useState("");
  const [phoneDefault, setPhoneDefault] = useState("");
  const [defaultNameValue, setDefaultNameValue] = useState("");
  const [accountType, setAccountType] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({});
  useEffect(() => {
    if (localStorage.status === "edit") {
      // // console.log(localStorage.getItem("accountEdit"));
      const id = localStorage.getItem("idAccount");
      // setNameDefault(id)
      // // console.log(id);
      const getAccount = async () => {
        const responseAccount = await accountApi.get({ id });
        // console.log("responseAccount", responseAccount);
        const dataTable = await responseAccount.data.map((res) => {
          return {
            Email: res.Email,
            MatKhau: res.MatKhau,
            MaGiangVien: res.MaGiangVien,
            TenGiangVien: res.TenGiangVien,
            MaSinhVien: res.MaSinhVien,
            TenSinhVien: res.TenSinhVien,
          };
        });
        console.log(`dataTablea`, dataTable);
        setAccountType(dataTable[0].MaGiangVien ? "giangvien" : "sinhvien");
        setValue("email", dataTable[0].Email);
        setValue("password", dataTable[0].MatKhau);
        setValue("lecturer", dataTable[0].TenGiangVien);
        // console.log(getValues("lecturer", dataTable[0].TenGiangVien));
        setValue("student", dataTable[0].TenSinhVien);
      };
      getAccount();
      // setNameDefault(getAccountData.Email);
      // setEmailDefault(getAccountData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      try {
        await accountApi
          .put({
            email: data.email,
            password: data.password,
            id: localStorage.getItem("idAccount"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Account")} ${t("Success")}`);
              navigate(`../${routes.admin.account}`);
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
        await accountApi
          .post({
            email: data.email,
            password: data.password,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Account")} ${t("Success")}`);
              navigate(`../${routes.admin.account}`);
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
    navigate(`../${routes.admin.account}`);
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
              {t("Account")}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              {accountType && accountType === "giangvien" ? (
                <Grid item xs={12}>
                  <Controller
                    name="lecturer"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        disabled
                        label={t("Lecturer")}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={Boolean(errors.lecturer)}
                        helperText={
                          errors.lecturer ? errors.lecturer.message : ""
                        }
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        {...field}
                      />
                    )}
                  />
                  {/* <Controller
                    name="lecturer"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        disabled
                        label={t("Lecturer")}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={Boolean(errors.lecturer)}
                        helperText={
                          errors.lecturer ? errors.lecturer.message : ""
                        }
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        {...field}
                      />
                    )}
                  /> */}
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Controller
                    name="student"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        disabled
                        label={t("Student")}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={Boolean(errors.student)}
                        helperText={
                          errors.student ? errors.student.message : ""
                        }
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              )}
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
                    required: "Name cannot be empty",
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
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={
                    {
                      // required: "Name cannot be empty",
                    }
                  }
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
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
export default AddAccount;
