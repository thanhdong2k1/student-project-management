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
import courseApi from "../../../../Service/Api/courseApi";

const AddCourse = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [genderError, setGenderError] = useState("");
  const [valueSelectFacutly, setValueSelectFacutly] = useState(null);
  const [selectFacutly, setSelectFacutly] = useState([]);
  const [genderDefault, setGenderDefault] = useState("");
  const [nameDefault, setNameDefault] = useState("");
  const [noteDefault, setNoteDefault] = useState("");
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
      // // console.log(localStorage.getItem("courseEdit"));
      const id = localStorage.getItem("idCourse");
      // setNameDefault(id)
      // console.log(id);
      const getCourse = async () => {
        const responseCourse = await courseApi.get({ id });
        // console.log("responseCourse", responseCourse);
        const dataTable = await responseCourse.data.map((res) => {
          return {
            NienKhoa: res.NienKhoa,
            GhiChu: res.GhiChu,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].NienKhoa);
        setValue("note", dataTable[0].GhiChu);
      };
      getCourse();
      // setNameDefault(getCourseData.TenKhoa);
      // setEmailDefault(getCourseData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      try {
        // console.log(data);
        await courseApi
          .put({
            name: data.name,
            note: data.note,
            id: localStorage.getItem("idCourse"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Cource")} ${t("Success")}`);
              navigate(`../${routes.admin.course}`);
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
        await courseApi
          .post({
            name: data.name,
            note: data.note,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Cource")} ${t("Success")}`);
              navigate(`../${routes.admin.course}`);
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
    navigate(`../${routes.admin.course}`);
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
              {t("Course")}
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
                  // value={nameDefault}
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
                  name="note"
                  control={control}
                  defaultValue=""
                  // value={noteDefault}
                  // rules={{
                  //   required: "Note cannot be empty",
                  // }}
                  render={({ field }) => (
                    <TextField
                      label={t("Note")}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={Boolean(errors.note)}
                      helperText={errors.note ? errors.note.message : ""}
                      {...field}
                    />
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
export default AddCourse;
