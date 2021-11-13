import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Box } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email for example: a@gmail.com")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Register() {

    const URL = `http://localhost:3030/api/users`;

    const navigate = useNavigate();
    
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      const sendItems = async () => {
          await axios.post(URL,values)
        //navigate('../login');
      }
      sendItems();
      
    },
  });

  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#105652" }}>
              <AccessibilityIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit} >
                <TextField
                style={{marginTop: "15px"}}
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <TextField
                style={{marginTop: "15px"}}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                style={{marginTop: "15px"}}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ backgroundColor: "#FFBF86" }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
