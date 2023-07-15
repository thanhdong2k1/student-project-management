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
import facultyApi from "../../../../Service/Api/facultyApi";
import lecturerApi from "../../../../Service/Api/lecturerApi";

const AddFaculty = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [genderError, setGenderError] = useState("");
  const [valueSelectDean, setValueSelectDean] = useState(null);
  const [selectDean, setSelectDean] = useState([]);
  const [genderDefault, setGenderDefault] = useState("");
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
      // // console.log(localStorage.getItem("facultyEdit"));
      const id = localStorage.getItem("idFaculty");
      // setNameDefault(id)
      // console.log(id);
      const getFaculty = async () => {
        const responseFaculty = await facultyApi.get({ id });
        // console.log("responseFaculty", responseFaculty);
        const dataTable = await responseFaculty.data.map((res) => {
          return {
            TenKhoa: res.TenKhoa,
            TruongKhoa: res.TruongKhoa,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].TenKhoa);
        setValue("dean", dataTable[0].TruongKhoa);
      };
      getFaculty();
      // setNameDefault(getFacultyData.TenGiangVien);
      // setEmailDefault(getFacultyData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  useEffect(() => {
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
      setSelectDean(dataTable);
    };
    getLecturer();
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
        await facultyApi
          .put({
            name: data.name,
            dean: data.dean,
            id: localStorage.getItem("idFaculty"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Faculty")} ${t("Success")}`);
              navigate(`../${routes.admin.faculty}`);
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
        await facultyApi
          .post({
            name: data.name,
            dean: data.dean,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Faculty")} ${t("Success")}`);
              navigate(`../${routes.admin.faculty}`);
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
    navigate(`../${routes.admin.faculty}`);
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
              {localStorage.getItem("status") == "edit" ? `${t("Update")}` : `${t("Add")}`}{" "}
              {t("Faculty")}
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
                  defaultValue={nameDefault}
                  value={nameDefault}
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
                  name="dean"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Dean cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`dean`}
                      id={`dean`}
                      label={t("Dean")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectDean}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectDean(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.dean)}
                      helperText={errors.dean ? errors.dean.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Dean</MenuItem>
                      {selectDean.map((item) => {
                        return [
                          <MenuItem value={item.TenGiangVien} fullWidth>
                            {item.TenGiangVien}
                          </MenuItem>,
                        ];
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
            {/* Submit */}
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
export default AddFaculty;
