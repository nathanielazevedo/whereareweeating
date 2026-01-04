import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { contactSchema } from "../create/CreateHelpers";
import { TextField, Button, Typography, Box, Stack, Card } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { logo } from "../../assets";

const Contact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setErr] = useState("");
  const values = useState({
    name: "",
    email: "",
    message: "",
  })[0];

  const handleSubmit = (vals: typeof values) => {
    setLoading(true);
    emailjs
      .send(
        "service_v9iy1dd",
        "template_tdpddgu",
        {
          from_name: vals.name,
          to_name: "Where are we eating?",
          from_email: vals.email,
          to_email: "nathanielpaulazevedo@gmail.com",
          message: vals.message,
        },
        "DM5GqOU5YKOfGkf4I"
      )
      .then(
        () => {
          setLoading(false);
          setSubmitted(true);
        },
        (error) => {
          setLoading(false);
          console.log(error);
          setErr(error);
        }
      );
  };

  if (submitted) {
    return (
      <>
        {/* Top Navigation */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            bgcolor: "background.default",
            borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
            backdropFilter: "blur(10px)",
            py: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: "800px",
              mx: "auto",
              px: { xs: 2, sm: 3 },
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Where are we eating?"
              onClick={() => navigate("/")}
              sx={{
                height: "60px",
                width: "auto",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: "600px",
            mx: "auto",
            px: { xs: 2, sm: 3 },
            py: { xs: 4, md: 8 },
          }}
        >
          <Card
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              textAlign: "center",
              background:
                "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            <Stack spacing={3} alignItems="center">
              <CheckCircleIcon
                sx={{
                  fontSize: 64,
                  color: "#F59E0B",
                  animation: "bounce 1s ease-in-out",
                  "@keyframes bounce": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                  },
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Thank You!
              </Typography>
              <Typography variant="h6" color="text.secondary">
                We received your message and will get back to you as soon as
                possible.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  mt: 2,
                  borderColor: "#F59E0B",
                  color: "#F59E0B",
                  "&:hover": {
                    borderColor: "#FBBF24",
                    bgcolor: "rgba(245, 158, 11, 0.1)",
                  },
                }}
              >
                Back to Home
              </Button>
            </Stack>
          </Card>
        </Box>
      </>
    );
  }

  return (
    <>
      {/* Top Navigation */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "background.default",
          borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
          backdropFilter: "blur(10px)",
          py: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Where are we eating?"
            onClick={() => navigate("/")}
            sx={{
              height: "60px",
              width: "auto",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: "600px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 8 },
        }}
      >
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Box
              sx={{
                p: 2,
                borderRadius: "50%",
                bgcolor: "rgba(245, 158, 11, 0.1)",
                display: "inline-flex",
              }}
            >
              <EmailIcon sx={{ fontSize: 40, color: "#F59E0B" }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Have a question or feedback? We'd love to hear from you.
            </Typography>
          </Stack>

          {/* Form Card */}
          <Card
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            <Formik
              initialValues={values}
              onSubmit={handleSubmit}
              validationSchema={contactSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Your Name"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name && errors.name}
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#F59E0B",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#F59E0B",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="email"
                      label="Your Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#F59E0B",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#F59E0B",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      multiline
                      name="message"
                      label="Message"
                      error={
                        Boolean(touched.message) && Boolean(errors.message)
                      }
                      onBlur={handleBlur}
                      helperText={touched.message && errors.message}
                      onChange={handleChange}
                      value={values.message}
                      rows={6}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#F59E0B",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#F59E0B",
                        },
                      }}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      disabled={loading}
                      variant="contained"
                      sx={{
                        height: "56px",
                        bgcolor: "#F59E0B",
                        color: "#000",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        borderRadius: 2,
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "#FBBF24",
                        },
                        "&:active": {
                          bgcolor: "#D97706",
                        },
                        "&:disabled": {
                          bgcolor: "rgba(245, 158, 11, 0.3)",
                          color: "rgba(0, 0, 0, 0.5)",
                        },
                      }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                    {error && (
                      <Typography color="error" textAlign="center">
                        {error}
                      </Typography>
                    )}
                  </Stack>
                </form>
              )}
            </Formik>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default Contact;
