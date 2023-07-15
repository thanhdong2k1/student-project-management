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
import topicApi from "../../../../Service/Api/topicApi";
import facultyApi from "../../../../Service/Api/facultyApi";

const AddTopic = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [genderError, setGenderError] = useState("");
  const [valueSelectFacutly, setValueSelectFacutly] = useState(null);
  const [selectFacutly, setSelectFacutly] = useState([]);
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
      // // console.log(localStorage.getItem("topicEdit"));
      const id = localStorage.getItem("idTopic");
      // setNameDefault(id)
      // console.log(id);
      const getTopic = async () => {
        const responseTopic = await topicApi.get({ id });
        // console.log("responseTopic", responseTopic);
        const dataTable = await responseTopic.data.map((res) => {
          return {
            TenChuDe: res.TenChuDe,
            GhiChu: res.GhiChu,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].TenChuDe);
        setValue("note", dataTable[0].GhiChu);
      };
      getTopic();
      // setNameDefault(getTopicData.TenKhoa);
      // setEmailDefault(getTopicData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      try {
        await topicApi
          .put({
            name: data.name,
            note: data.note,
            id: localStorage.getItem("idTopic"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Topic")} ${t("Success")}`);
              navigate(`../${routes.admin.topic}`);
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
        await topicApi
          .post({
            name: data.name,
            note: data.note,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Topic")} ${t("Success")}`);
              navigate(`../${routes.admin.topic}`);
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
    navigate(`../${routes.admin.topic}`);
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
              {t("Topic")}
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
                  name="note"
                  control={control}
                  defaultValue=""
                  // rules={{
                  //   required: "Name cannot be empty",
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
export default AddTopic;
