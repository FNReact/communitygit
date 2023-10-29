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
import React, { useContext, useState } from "react";
import { UserContext } from "../../utils/UserContext";

const CoomunityProfileApartmentSettings = ({ values, setValue, handleChangeStatus,professionLabel,magazineLogo,setMagazineLogo,storeMagazineImage,setStoreMagazineImage }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const {msDetails,userDetails} = useContext(UserContext);


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
      <Grid item lg={3} md={3} sm={3} xs={12} sx={{mt:3}} >
        <Box sx={{ml:2}} >
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.tenant_mobile_status)}
                    onChange={(e) => handleChangeStatus(e, "tenant_mobile_status")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Mobile Number Visibility"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid  item lg={3} md={3} sm={3} xs={12} sx={{mt:2}}>
        <Box>
          <TextField
            type="number"
            label="Mobile Number"
            disabled={JSON.parse(values.tenant_mobile_status)=== true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("phone", e.target.value)}
            value={values.phone}
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
                    checked={JSON.parse(values.tenant_email_status)}
                    onChange={(e) => handleChangeStatus(e, "tenant_email_status")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Email Visibility"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid  item lg={4} md={4} sm={4} xs={12} sx={{mt:2}}>
        <Box>
          <TextField
            label="Email"
            disabled={JSON.parse(values.tenant_email_status)=== true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("email", e.target.value)}
            value={values.email}
          />
        </Box>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box sx={{ml:2}} ><TextField name="Profession" label="Profession"  variant="filled" fullWidth  focused onChange={(e)=>setValue("tenant_profession",e.target.value)} value={values.tenant_profession} /></Box>
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
                    checked={JSON.parse(values.tenant_willing_to_response_emgergency_needs)}
                    onChange={(e) => handleChangeStatus(e, "tenant_willing_to_response_emgergency_needs")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Response Emgergency Needs"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
    </>
  );
};

export default CoomunityProfileApartmentSettings;
