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
import { styled } from "@mui/styles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { Controller, useForm, setValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GenderSelect from "../../../../Components/GenderSelect";
import routes from "../../../../Routes";
import branchApi from "../../../../Service/Api/branchApi";
import notifyApi from "../../../../Service/Api/notifyApi";
import moment from "moment";
import dayjs from "dayjs";
const CustomDatePicker = styled(DesktopDatePicker)({
  width: "100%",
  "& input": {
    padding: "10px",
    fontSize: "14px",
  },
});
const AddNotify = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [genderError, setGenderError] = useState("");
  const [valueSelectBranch, setValueSelectBranch] = useState(null);
  const [valuePicker, setValuePicker] = useState(null);
  const [selectBranch, setSelectBranch] = useState("");
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
    getValues,
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
      // // console.log(localStorage.getItem("notifyEdit"));
      const id = localStorage.getItem("idNotify");
      // setNameDefault(id)
      // // console.log(id);
      const getNotify = async () => {
        const responseNotify = await notifyApi.get({ id });
        // console.log("responseNotify", responseNotify);
        const dataTable = await responseNotify.data.map((res) => {
          return {
            TenTB: res.TenTB,
            NgayBatDau: res.NgayBatDau,
            NgayKetThuc: res.NgayKetThuc,
            MaBanDaoTao: res.MaBanDaoTao,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].TenTB);
        // setValue("startDay", dataTable[0].NgayBatDau.toDateString());
        // setValue("endDay", dataTable[0].NgayKetThuc.toDateString());
        setValue("startDay", dayjs(dataTable[0].NgayBatDau));
        setValue("endDay", dayjs(dataTable[0].NgayKetThuc));
        // console.log(getValues("startDay"), getValues("endDay"));
        // getValues("startDay");
        // getValues("endDay");
      };
      getNotify();
      // setNameDefault(getNotifyData.TenGiangVien);
      // setEmailDefault(getNotifyData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    console.log({
      name: data.name,
      startDay: moment(dayjs(data.startDay).$d).format("YYYY/MM/DD"),
      endDay: moment(dayjs(data.endDay).$d).format("YYYY/MM/DD"),
    });
    if (localStorage.status == "edit") {
      // console.log(dayjs(data.startDay));
      // console.log(dayjs(data.endDay));
      try {
        await notifyApi
          .put({
            name: data.name,
            startDay: moment(dayjs(data.startDay).$d).format("YYYY/MM/DD"),
            endDay: moment(dayjs(data.endDay).$d).format("YYYY/MM/DD"),
            id: localStorage.getItem("idNotify"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Notify")} ${t("Success")}`);
              navigate(`../${routes.admin.notify}`);
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
      // console.log(data.startDay, moment(data.startDay.$d).format("DD/MM/YYYY"));
      // console.log(data.endDay, moment(data.endDay.$d).format("DD/MM/YYYY"));
      try {
        await notifyApi
          .post({
            name: data.name,
            startDay: moment(dayjs(data.startDay).$d).format("YYYY/MM/DD"),
            endDay: moment(dayjs(data.endDay).$d).format("YYYY/MM/DD"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Notify")} ${t("Success")}`);
              navigate(`../${routes.admin.notify}`);
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
    navigate(`../${routes.admin.notify}`);
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
              {t("Notify")}
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
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Grid item xs={5.8}>
                <Controller
                  name="startDay"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Please choose a date",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomDatePicker
                        format="DD/MM/YYYY"
                        label={t("Start day")}
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params) => (
                          <TextField
                            error={Boolean(errors.startDay)}
                            helperText={
                              errors.startDay ? errors.startDay.message : ""
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={5.8}>
                <Controller
                  name="endDay"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Please choose a date",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomDatePicker
                        format="DD/MM/YYYY"
                        label={t("End day")}
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params) => (
                          <TextField
                            error={!!error}
                            helperText={error ? error.message : ""}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
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
export default AddNotify;
