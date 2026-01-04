import { Formik } from "formik";
import SlideIn from "../../components/SlideIn";
import MainButton from "../../components/MainButton";
import { personalSchema, PersonalType } from "./CreateHelpers";
import BackIcon from "../../components/backIcons/BackIconAction";
import { Typography, FormControl, TextField } from "@mui/material";

type Props = {
  pError: string;
  submitting: boolean;
  personalData: PersonalType;
  createParty: (values: PersonalType) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPersonalData: (personalData: PersonalType) => void;
};

const CreateForm = ({
  pError,
  setStep,
  submitting,
  createParty,
  personalData,
  setPersonalData,
}: Props) => {
  return (
    <>
      <BackIcon
        action={() => {
          setStep(3);
          setPersonalData(personalData);
        }}
      />
      <SlideIn>
        <Formik
          onSubmit={createParty}
          initialValues={personalData}
          validationSchema={personalSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "50px",
              }}
            >
              <Typography mb="20px" variant="h3">
                Ready to create your party?
              </Typography>
              <Typography mb="20px" color="text.secondary">
                Your party will be created and you can share it with your
                friends!
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <MainButton
                  disabled={submitting}
                  type="submit"
                  text={submitting ? "Creating Party!" : "Create Party"}
                />
              </FormControl>
              {pError && (
                <Typography color="error" mt="10px">
                  {pError}
                </Typography>
              )}
            </form>
          )}
        </Formik>
      </SlideIn>
    </>
  );
};

export default CreateForm;
