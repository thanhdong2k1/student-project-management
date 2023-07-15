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
import facultyApi from "../../../../Service/Api/facultyApi";

const AddBranch = () => {
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
      // // console.log(localStorage.getItem("branchEdit"));
      const id = localStorage.getItem("idBranch");
      // setNameDefault(id)
      // console.log(id);
      const getBranch = async () => {
        const responseBranch = await branchApi.get({ id });
        // console.log("responseBranch", responseBranch);
        const dataTable = await responseBranch.data.map((res) => {
          return {
            TenNganh: res.TenNganh,
            MaKhoa: res.MaKhoa,
          };
        });
        // console.log(`dataTable`, dataTable);

        setValue("name", dataTable[0].TenNganh);
        setValue("faculty", dataTable[0].MaKhoa);
      };
      getBranch();
      // setNameDefault(getBranchData.TenKhoa);
      // setEmailDefault(getBranchData.Email);
    }
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  useEffect(() => {
    const getFaculty = async () => {
      const responseFaculty = await facultyApi.getAll();
      // console.log("responseFaculty", responseFaculty);
      const dataTable = await responseFaculty.data.map((res) => {
        return {
          MaKhoa: res.MaKhoa,
          TenKhoa: res.TenKhoa,
        };
      });
      // console.log(dataTable);
      setSelectFacutly(dataTable);
    };
    getFaculty();
    // setNameDefault(getBranchData.TenKhoa);
    // setEmailDefault(getBranchData.Email);
    // // console.log(`nameDefault: ${nameDefault}`);
  }, []);
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };
  const handleFormSubmit = async (data) => {
    if (localStorage.status == "edit") {
      try {
        await branchApi
          .put({
            name: data.name,
            faculty: data.faculty,
            id: localStorage.getItem("idBranch"),
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Update")} ${t("Branch")} ${t("Success")}`);
              navigate(`../${routes.admin.branch}`);
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
        await branchApi
          .post({
            name: data.name,
            faculty: data.faculty,
          })
          .then((res) => {
            if (res.data.affectedRows) {
              // console.log(res);
              toast.success(`${t("Create")} ${t("Branch")} ${t("Success")}`);
              navigate(`../${routes.admin.branch}`);
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
    navigate(`../${routes.admin.branch}`);
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
              {t("Branch")}
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
                  name="faculty"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Faculty cannot be empty",
                  }}
                  render={({ field }) => (
                    <TextField
                      labelId={`faculty`}
                      id={`faculty`}
                      label={t("Faculty")}
                      variant="outlined"
                      size="small"
                      select
                      fullWidth
                      value={valueSelectFacutly}
                      onChange={(event) => {
                        // console.log(event.target.value);
                        setValueSelectFacutly(event.target.value);
                        field.onChange(event);
                      }}
                      error={Boolean(errors.faculty)}
                      helperText={errors.faculty ? errors.faculty.message : ""}
                      {...field}
                    >
                      <MenuItem fullWidth>Select Facutly</MenuItem>
                      {selectFacutly.map((item) => {
                        return [
                          <MenuItem value={item.MaKhoa} fullWidth>
                            {item.TenKhoa}
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
export default AddBranch;
