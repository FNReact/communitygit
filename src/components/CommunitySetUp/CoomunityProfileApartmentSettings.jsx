import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { Image, Modal, Upload } from "antd";
import React, { useState } from "react";

const CoomunityProfileApartmentSettings = ({ values, setValue, handleChangeStatus,magazineLogo,setMagazineLogo,storeMagazineImage,setStoreMagazineImage }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
  const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
      };
    
      //  multiple files upload
      const handleChange = ({ fileList: newFileList  }) => {
        var files = newFileList;
       
          setValue('magazine_logo',newFileList);
        }      
      const uploadButton = (
        <div>
          <div
            style={{
              marginTop: 0,
              padding: "40px",
            }}
          >
            Magazine Logo
          </div>
        </div>
      );
  return (
    <>
   
    {/* mobile */}
      <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
        <Box sx={{ml:2}} >
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.individual_mobile_status)}
                    onChange={(e) => handleChangeStatus(e, "individual_mobile_status")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Mobile Show"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
        <Box>
          <TextField
            type="number"
            label="Mobile Number"
            disabled={JSON.parse(values.individual_mobile_status)=== true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_mobile", e.target.value)}
            value={values.individual_mobile}
          />
        </Box>
      </Grid>

    {/* email */}
      <Grid item lg={2} md={2} sm={2} xs={12} sx={{mt:3}} >
        <Box sx={{ml:2}} >
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.individual_email_status)}
                    onChange={(e) => handleChangeStatus(e, "individual_email_status")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Email Show"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
        <Box>
          <TextField
            label="Email"
            disabled={JSON.parse(values.individual_email_status)=== true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_email", e.target.value)}
            value={values.individual_email}
          />
        </Box>
      </Grid>

      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Box sx={{ml:2}} ><TextField name="Profession" label="Profession"  variant="filled" fullWidth  focused onChange={(e)=>setValue("individual_profession",e.target.value)} value={values.individual_profession} /></Box>
      </Grid>

      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Contractors Name"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_contractors_name", e.target.value)}
            value={values.individual_contractors_name}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Builder"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_builder", e.target.value)}
            value={values.individual_builder}
          />
        </Box>
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} sx={{mt:3}} >
        <Box sx={{ml:2}} >
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.individual_willing_to_response_emgergency_needs)}
                    onChange={(e) => handleChangeStatus(e, "individual_willing_to_response_emgergency_needs")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Response Emgergency Needs"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>

      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Electrical Contractor Name"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_electrical_contractor_name", e.target.value)}
            value={values.individual_electrical_contractor_name}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Electrical Contractor Address"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_electrical_contractor_address", e.target.value)}
            value={values.individual_electrical_contractor_address}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            type="number"
            label="Electrical Contractor Phone"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_electrical_contractor_phone", e.target.value)}
            value={values.individual_electrical_contractor_phone}
          />
        </Box>
      </Grid>


      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Plubing Contractor Name"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_plumbing_contractor_name", e.target.value)}
            value={values.individual_plumbing_contractor_name}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Plubing Contractor Address"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_plumbing_contractor_address", e.target.value)}
            value={values.individual_plumbing_contractor_address}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            type="number"
            label="Plubing Contractor Phone"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_plumbing_contractor_phone", e.target.value)}
            value={values.individual_plumbing_contractor_phone}
          />
        </Box>
      </Grid>

      
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Windows And Glass Contractor Name"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_windows_and_glass_contractor_name", e.target.value)}
            value={values.individual_windows_and_glass_contractor_name}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Windows And Glass Contractor Address"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_windows_and_glass_contractor_address", e.target.value)}
            value={values.individual_windows_and_glass_contractor_address}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            type="number"
            label="Windows And Glass Contractor Phone"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_windows_and_glass_contractor_phone", e.target.value)}
            value={values.individual_windows_and_glass_contractor_phone}
          />
        </Box>
      </Grid>


      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Landscape Contractor Name"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_landscape_contractor_name", e.target.value)}
            value={values.individual_landscape_contractor_name}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Landscape Contractor Address"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_landscape_contractor_address", e.target.value)}
            value={values.individual_landscape_contractor_address}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            type="number"
            label="Landscape Contractor Phone"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_landscape_contractor_phone", e.target.value)}
            value={values.individual_landscape_contractor_phone}
          />
        </Box>
      </Grid>

      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Retention Wall Contractor Name"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_retention_wall_contractor_name", e.target.value)}
            value={values.individual_retention_wall_contractor_name}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Retention Wall Contractor Address"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_retention_wall_contractor_address", e.target.value)}
            value={values.individual_retention_wall_contractor_address}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            type="number"
            label="Retention Wall Contractor Phone"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_retention_wall_contractor_phone", e.target.value)}
            value={values.individual_retention_wall_contractor_phone}
          />
        </Box>
      </Grid>


      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Air Condition Contractor Name"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_air_condition_contractor_name", e.target.value)}
            value={values.individual_air_condition_contractor_name}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            label="Air Condition Contractor Address"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_air_condition_contractor_address", e.target.value)}
            value={values.individual_air_condition_contractor_address}
          />
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} >
        <Box>
          <TextField
            type="number"
            label="Air Condition Contractor Phone"
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("individual_air_condition_contractor_phone", e.target.value)}
            value={values.individual_air_condition_contractor_phone}
          />
        </Box>
      </Grid>

    </>
  );
};

export default CoomunityProfileApartmentSettings;
