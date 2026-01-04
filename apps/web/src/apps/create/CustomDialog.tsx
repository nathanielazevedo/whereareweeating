import React from "react";
import { Formik } from "formik";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { RestaurantCreate } from "../../models/Restaurant";
import { TransitionProps } from "@mui/material/transitions";
import { restaurantSchema, rvaluesInitial } from "./CreateHelpers";
import {
  FormControl,
  Slide,
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { logo } from "../../assets";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  createRestaurant: (restaurant: RestaurantCreate) => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CustomDialog = ({ open, setOpen, createRestaurant }: Props) => {
  rvaluesInitial.id = Math.floor(Math.random() * 1000) as unknown as string;
  const values = useState(rvaluesInitial)[0];

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "500px",
          maxWidth: "90vw",
          padding: 0,
          backgroundImage: "none",
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(24, 27, 34, 0) 100%)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
          p: 3,
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "text.secondary",
            "&:hover": {
              bgcolor: "rgba(245, 158, 11, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          component="img"
          src={logo}
          alt="Add Custom Place"
          sx={{
            height: "48px",
            width: "auto",
            mb: 1,
          }}
        />
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Add Your Own Place
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Can't find what you're looking for? Add it manually.
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Formik
          initialValues={values}
          onSubmit={createRestaurant}
          validationSchema={restaurantSchema}
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
              <FormControl
                sx={{
                  gap: 2.5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  name="name"
                  label="Place Name"
                  placeholder="e.g., Joe's Pizza"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#F59E0B",
                      },
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
                  name="location"
                  label="Address"
                  placeholder="e.g., 123 Main St, New York, NY"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#F59E0B",
                      },
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    height: "48px",
                    bgcolor: "#F59E0B",
                    color: "#000000",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    mt: 1,
                    "&:hover": {
                      bgcolor: "#D97706",
                    },
                  }}
                >
                  Add Place
                </Button>
              </FormControl>
            </form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default CustomDialog;
