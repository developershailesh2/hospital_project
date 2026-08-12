import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addAppointmentSchema } from "../validation/appointmentValidation";
import { addAppointment } from "../services/appointmentService";

export function AddAppointment() {
  const [cookies] = useCookies(["Email"]);
  let navigate = useNavigate();

  const doctors = [
    "Dr. Sharma",
    "Dr. Priti",
    "Dr. Mihika",
    "Dr. Patel",
    "Dr. Reddy",
    "Dr. Kumar",
    "Dr. Singh",
    "Dr. Reddy",
    "Dr. Kumar",
    "Dr. Singh",
    "Dr. Sharma",
    "Dr. Priti",
    "Dr. Mihika",
    "Dr. Patel",
    "Dr. Reddy",
    "Dr. Kumar",
    "Dr. Singh",
    "Dr. Reddy",
    "Dr. Kumar",
    "Dr. Singh",
  ];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formik = useFormik({
    initialValues: {
      Email: cookies["Email"],
      Title: "",
      ClientName: "",
      ClientAddress: "",
      Doctors: "",
      Gender: "",
      Description: "",
      ClientEmail: "",
      Date: "",
    },

    validationSchema: addAppointmentSchema,
    onSubmit: async (user_appointment) => {
      try {
       const response = await addAppointment(user_appointment);
       
        await Swal.fire({
          icon: "success",
          title: "Appointment Booked",
          text: response.message,
          confirmButtonText: "Go to Dashboard",
          confirmButtonColor: "#1976d2",
        }).then(() => {
          navigate("/user-dashboard");
        });

        formik.resetForm();
      } catch (error : any) {
        console.error("Error adding appointment:", error);

        await Swal.fire({
          icon: "error",
          title: "Appointment Failed",
          text: error.response?.data?.message ||"Unable to book the appointment. Please try again.",
        });
      }
    },
  });

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Paper elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(90deg,#1565c0,#42a5f5)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Add Patient Appointment
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Fill all required patient details
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="User Email"
                name="Email"
                value={formik.values.Email}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Title"
                name="Title"
                value={formik.values.Title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Title && Boolean(formik.errors.Title)}
                helperText={formik.touched.Title && formik.errors.Title}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Client Name"
                name="ClientName"
                value={formik.values.ClientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ClientName && Boolean(formik.errors.ClientName)
                }
                helperText={
                  formik.touched.ClientName && formik.errors.ClientName
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Client Address"
                name="ClientAddress"
                value={formik.values.ClientAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ClientAddress &&
                  Boolean(formik.errors.ClientAddress)
                }
                helperText={
                  formik.touched.ClientAddress && formik.errors.ClientAddress
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                options={doctors}
                value={formik.values.Doctors}
                onChange={(_, value) => formik.setFieldValue("Doctors", value)}
                onBlur={() => formik.setFieldTouched("Doctors", true)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Doctor"
                    error={
                      formik.touched.Doctors && Boolean(formik.errors.Doctors)
                    }
                    helperText={formik.touched.Doctors && formik.errors.Doctors}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl
                fullWidth
                error={formik.touched.Gender && Boolean(formik.errors.Gender)}
              >
                <InputLabel>Gender</InputLabel>

                <Select
                  label="Gender"
                  name="Gender"
                  value={formik.values.Gender}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="transgender">Transgender</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Description &&
                  Boolean(formik.errors.Description)
                }
                helperText={
                  formik.touched.Description && formik.errors.Description
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Client Email"
                name="ClientEmail"
                value={formik.values.ClientEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ClientEmail &&
                  Boolean(formik.errors.ClientEmail)
                }
                helperText={
                  formik.touched.ClientEmail && formik.errors.ClientEmail
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Appointment Date"
                name="Date"
                value={formik.values.Date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Date && Boolean(formik.errors.Date)}
                helperText={formik.touched.Date && formik.errors.Date}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                >
                  Add Appointment
                </Button>

                <Button
                  component={Link}
                  to="/user-dashboard"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            p: 2,
            textAlign: "center",
            bgcolor: "#f5f5f5",
          }}
        >
          © {new Date().getFullYear()} Doctor Appointment System. All Rights
          Reserved.
        </Box>
      </Paper>
    </Container>
  );
}
