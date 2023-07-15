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
import deadlineManagementApi from "../../../../Service/Api/deadlineManagementApi";
import moment from "moment";
import dayjs from "dayjs";
import notifyApi from "../../../../Service/Api/notifyApi";
const CustomDatePicker = styled(DesktopDatePicker)({
  width: "100%",
  "& input": {
    padding: "10px",
    fontSize: "14px",
  },
});
const AddDeadlineManagement = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [genderError, setGenderError] = useState("");
  const [valueSelectNotify, setValueSelectNotify] = useState(null);
  const [valuePicker, setValuePicker] = useState(null);
  const [selectNotify, setSelectNotify] = useState("");
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
    const getNotify = async () => {
      const responseNotify = await notifyApi.getAll();
      console.log("responseNotify", responseNotify);
      const dataTable = await responseNotify.data.map((res) => {
        return {
          MaTB: res.MaTB,
          TenTB: res.TenTB,
          NgayBatDau: moment(res.NgayBatDau).format("DD/MM/YYYY"),
          NgayKetThuc: moment(res.NgayKetThuc).format("DD/MM/YYYY"),
        };
      });
      // console.log(dataTable);
      setSelectNotify(dataTable);
    };
    getNotify();
    // setNameDefault(getFacultyData.TenGiangVien);
    // setEmailDefault(getFacultyData.Email);
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  useEffect(() => {
    if (localStorage.status === "edit") {
      // // console.log(localStorage.getItem("deadlineManagementEdit"));
      const id = localStorage.getItem("idDeadlineManagement");
      // setNameDefault(id)
      // // console.log(id);
      const getDeadlineManagement = async () => {
        const responseDeadlineManagement = await deadlineManagementApi.get({
          id,
        });
        // console.log("responseDeadlineManagement", responseDeadlineManagement);
        const dataTable = await responseDeadlineManagement.data.map((res) => {
          return {
            Cot: res.Cot,
            MaTB: res.MaTB,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].Cot);
        setValue("notify", dataTable[0].MaTB);
        // setValue("startDay", dataTable[0].NgayBatDau.toDateString());
        // setValue("endDay", dataTable[0].NgayKetThuc.toDateString());
        // setValue("startDay", dayjs(dataTable[0].NgayBatDau));
        // setValue("endDay", dayjs(dataTable[0].NgayKetThuc));
        // console.log(getValues("startDay"), getValues("endDay"));
        // getValues("startDay");
        // getValues("endDay");
      };
      getDeadlineManagement();
      // setNameDefault(getDeadlineManagementData.TenGiangVien);
      // setEmailDefault(getDeadlineManagementData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      // console.log(dayjs(data.startDay));
      // console.log(dayjs(data.endDay));
      try {
        await deadlineManagementApi
          .put({
            name: data.name,
            notify: data.notify,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Deadline Management")} ${t("Success")}`);
              navigate(`../${routes.admin.deadlineManagement}`);
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
        await deadlineManagementApi
          .post({
            name: data.name,
            startDay: dayjs(data.startDay + 1).add(1, "day"),
            endDay: dayjs(data.endDay + 1).add(1, "day"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Deadline Management")} ${t("Success")}`);
              navigate(`../${routes.admin.deadlineManagement}`);
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
    navigate(`../${routes.admin.deadlineManagement}`);
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
              {t("Deadline Management")}
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
                      disabled
                      label={t("Name")}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.name)}
                      helperText={errors.name ? errors.name.message : ""}
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
              <Grid item xs={12}>
                <Controller
                  name="notify"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Notify cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`notify`}
                      id={`notify`}
                      label={t("Notify")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectNotify}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectNotify(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.notify)}
                      helperText={errors.notify ? errors.notify.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Notify</MenuItem>
                      {selectNotify &&
                        selectNotify.map((item) => {
                          return (
                            <MenuItem value={item.MaTB} fullWidth>
                              {item.NgayBatDau} - {item.NgayKetThuc} -{" "}
                              {item.TenTB}
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
export default AddDeadlineManagement;
