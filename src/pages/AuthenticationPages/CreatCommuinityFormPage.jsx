import React, { Fragment } from "react";
import CreatCommuinityForm from "../../components/CreatCommuinityForm/CreatCommuinityForm";
import GeneralTopNavigation from "./GeneralTopNavigation";
import { Box } from "@mui/material";

const CreatCommuinityFormPage = () => {
  return (
    <Fragment>
      <GeneralTopNavigation back={true} />
      <Box sx={{mt:3}}>
        <CreatCommuinityForm />
      </Box>
     
    </Fragment>
  );
};

export default CreatCommuinityFormPage;
