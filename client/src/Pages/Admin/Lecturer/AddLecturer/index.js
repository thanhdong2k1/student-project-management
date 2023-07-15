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
import lecturerApi from "../../../../Service/Api/lecturerApi";

const AddLecturer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [genderError, setGenderError] = useState("");
  const [valueSelectBranch, setValueSelectBranch] = useState(null);
  const [valueSelectGender, setValueSelectGender] = useState(null);
  const [selectBranch, setSelectBranch] = useState("");
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
    getBranch();
    // setNameDefault(getFacultyData.TenGiangVien);
    // setEmailDefault(getFacultyData.Email);
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  useEffect(() => {
    if (localStorage.status === "edit") {
      // // console.log(localStorage.getItem("lecturerEdit"));
      const id = localStorage.getItem("idLecturer");
      // setNameDefault(id)
      // // console.log(id);
      const getLecturer = async () => {
        const responseLecturer = await lecturerApi.get({ id });
        // console.log("responseLecturer", responseLecturer);
        const dataTable = await responseLecturer.data.map((res) => {
          return {
            TenGiangVien: res.TenGiangVien,
            GioiTinh: res.GioiTinh,
            Email: res.Email,
            SoDT: res.SoDT,
            MaNganh: res.MaNganh,
            MaBDT: res.MaBDT,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].TenGiangVien);
        setValue("gender", dataTable[0].GioiTinh);
        setValue("email", dataTable[0].Email);
        setValue("phone", dataTable[0].SoDT);
        setValue("industry", dataTable[0].MaNganh);
      };
      getLecturer();
      // setNameDefault(getLecturerData.TenGiangVien);
      // setEmailDefault(getLecturerData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);

  const handleOnClose = (event) => {
    navigate(`../${routes.admin.lecturer}`);
  };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      try {
        await lecturerApi
          .put({
            name: data.name,
            gender: data.gender,
            email: data.email,
            phone: data.phone,
            industry: data.industry,
            id: localStorage.getItem("idLecturer"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Lecturer")} ${t("Success")}`);
              navigate(`../${routes.admin.lecturer}`);
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
        await lecturerApi
          .post({
            name: data.name,
            gender: data.gender,
            email: data.email,
            phone: data.phone,
            industry: data.industry,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Lecturer")} ${t("Success")}`);
              navigate(`../${routes.admin.lecturer}`);
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
              {t("Lecturer")}
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
                      helperText={
                        errors.gender ? errors.gender.message : ""
                      }
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
                  name="industry"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Branch cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`industry`}
                      id={`industry`}
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
                      error={Boolean(errors.industry)}
                      helperText={
                        errors.industry ? errors.industry.message : ""
                      }
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
export default AddLecturer;
