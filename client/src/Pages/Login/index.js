import {
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Box,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../../Components/CardLog";
import Layout from "../../Components/Layout";
import accountApi from "../../Service/Api/accountApi";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({});
  const handleFormSubmit = async (role) => {
    setIsLoading(true);
    trigger();
    const data = getValues();
    if (role) {
      const response = await accountApi.getAll();
      // console.log("response", response);
      const dataRes = await response.data.filter(
        (res) => res.Email === getValues("email")
      );
      console.log(dataRes[0].MatKhau, data.password);
      if (
        role == dataRes[0].LoaiTaiKhoan &&
        dataRes[0].MatKhau == data.password
      ) {
        // console.log(data);
        localStorage.setItem(
          "roleUser",
          role == 1 ? "bandaotao" : role == 2 ? "giangvien" : "sinhvien"
        );
        localStorage.setItem(
          "idUser",
          dataRes[0].MaGiangVien || dataRes[0].MaSinhVien
        );
        // console.log(localStorage.getItem("roleUser"));
        if (localStorage.getItem("roleUser")) {
          console.log("Lỗi ở đây");
          setTimeout(() => {
            toast.success("Đăng nhập thành công");
            navigate("/admin/dashboard");
          }, 1000);
        } else {
          console.log("Lỗi ở đây");
        }
      } else {
        console.log("Lỗi ở đây");
        setTimeout(() => {
          toast.error("Sai tài khoản hoặc mật khẩu");
          setIsLoading(false);
        }, 1000);
      }
    }
  };
  return (
    <Layout>
      <Card>
        <Typography
          component="div"
          sx={{
            mx: "auto",
            p: "2rem",
            // width: "22rem",
          }}
        >
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Typography
              variant="h3"
              sx={{
                color: "black",
                mb: 10,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Login
            </Typography>
            <Typography component="div" sx={{ my: 1.5 }}>
              <Typography variant="subtitle2" component="label">
                Email*
              </Typography>
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
                    // label="Email*"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ""}
                    {...field}
                  />
                )}
              />
            </Typography>
            <Typography component="div" sx={{ my: 1.5 }}>
              <Typography variant="subtitle2" component="label">
                Password*
              </Typography>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password cannot be empty",
                }}
                render={({ field }) => (
                  <TextField
                    // label="Email*"
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ""}
                    {...field}
                  />
                )}
              />
            </Typography>
            <Typography
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Remember me"
                labelPlacement="end"
              />
              {/* <Link
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/register", { replace: true });
                }}
                underline="hover"
                color="black"
                sx={{ fontWeight: "bold" }}
              >
                Forgot Password?
              </Link> */}
            </Typography>
            {isLoading ? (
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  fontWeight: "bold",
                  borderRadius: "12px",
                  margin: 0,
                  padding: 0,
                }}
              >
                <CircularProgress
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80%",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  // type="submit"
                  onClick={() => {
                    handleFormSubmit(1);
                  }}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "11px",
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                >
                  Training Login
                </Button>
                <Button
                  variant="contained"
                  // type="submit"
                  onClick={() => {
                    handleFormSubmit(2);
                  }}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "11px",
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                >
                  Lecturer Login
                </Button>
                <Button
                  variant="contained"
                  // type="submit"
                  onClick={() => {
                    handleFormSubmit(3);
                  }}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "11px",
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                >
                  Student Login
                </Button>
              </Box>
            )}
            {/* <Typography
              component="div"
              sx={{
                my: 1.5,
                display: "flex",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography component="div">Not regestered?</Typography>
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/register", { replace: true });
                }}
                underline="hover"
                color="black"
                sx={{ fontWeight: "bold", ml: "5px" }}
              >
                Creat a new account.
              </Link>
            </Typography> */}
          </form>
        </Typography>
      </Card>
    </Layout>
  );
};
export default Login;
