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

const CoomunityMenuSettings = ({ values, setValue, handleChangeStatus,magazineLogo,setMagazineLogo,storeMagazineImage,setStoreMagazineImage,magazineBanner,setMagazineBanner,storeMagazineBanner,setStoreMagazineBanner }) => {
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
      const handleChangeLogo = ({ fileList: newFileList  }) => {
        var files = newFileList;
       
          setValue('magazine_logo',newFileList);
        }      
      const handleChangeBanner = ({ fileList: newFileList  }) => {
        var files = newFileList;
       
          setValue('magazine_banner',newFileList);
        }      
      const uploadButton = (
        <div>
          <div
            style={{
              marginTop: 0,
              padding: "40px",
            }}
          >
            Upload Now
          </div>
        </div>
      );
  return (
    <>
    {/* Member */}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.member_enable)}
                    onChange={(e) => handleChangeStatus(e, "member_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Member"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Member Menu Name"
            disabled={JSON.parse(values.member_enable)=== true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("member_menu_name", e.target.value)}
            value={values.member_menu_name}
          />
        </Box>
      </Grid>
    {/* Jobs */}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.my_job_enable)}
                    onChange={(e) => handleChangeStatus(e, "my_job_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable My Job"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="My Job Menu Name"
            disabled={JSON.parse(values.my_job_enable) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("my_job_menu_name", e.target.value)}
            value={values.my_job_menu_name}
          />
        </Box>
      </Grid>
    {/* My Posts */}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.my_lounge_post_enable)}
                    onChange={(e) => handleChangeStatus(e, "my_lounge_post_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable My Lounge"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="My Lounge Menu Name"
            disabled={JSON.parse(values.my_lounge_post_enable )=== true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("my_lounge_menu_name", e.target.value)}
            value={values.my_lounge_menu_name}
          />
        </Box>
      </Grid>
    {/* Events */}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.event_enable)}
                    onChange={(e) => handleChangeStatus(e, "event_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Event"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Event Menu Name"
            disabled={JSON.parse(values.event_enable) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("event_menu_name", e.target.value)}
            value={values.event_menu_name}
          />
        </Box>
      </Grid>
    {/* Resource*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.resource_enable)}
                    onChange={(e) => handleChangeStatus(e, "resource_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Resource"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Resource Menu Name"
            disabled={JSON.parse(values.resource_enable ) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("resource_menu_name", e.target.value)}
            value={values.resource_menu_name}
          />
        </Box>
      </Grid>
    {/* Media*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.media_enable)}
                    onChange={(e) => handleChangeStatus(e, "media_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Media"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Media Menu Name"
            disabled={JSON.parse(values.media_enable) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("media_menu_name", e.target.value)}
            value={values.media_menu_name}
          />
        </Box>
      </Grid>
    {/* Classifieds*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.my_classified_enable)}
                    onChange={(e) => handleChangeStatus(e, "my_classified_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable My Classifieds"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Classified Menu Name"
            disabled={JSON.parse(values.my_classified_enable) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("my_classified_menu_name", e.target.value)}
            value={values.my_classified_menu_name}
          />
        </Box>
      </Grid>
    {/* Business*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.business_enable)}
                    onChange={(e) => handleChangeStatus(e, "business_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Business"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Classified Menu Name"
            disabled={JSON.parse(values.business_enable) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("business_menu_name", e.target.value)}
            value={values.business_menu_name}
          />
        </Box>
      </Grid>
    {/* Representative*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.representative_enable)}
                    onChange={(e) => handleChangeStatus(e, "representative_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Representative"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Representative Menu Name"
            disabled={JSON.parse(values.representative_enable) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("representative_menu_name", e.target.value)}
            value={values.representative_menu_name}
          />
        </Box>
      </Grid>
    {/* Matrimony*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.matrimony_enable)}
                    onChange={(e) => handleChangeStatus(e, "matrimony_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Matrimony"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Matrimony Menu Name"
            disabled={JSON.parse(values.matrimony_enable)  === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("matrimony_menu_name", e.target.value)}
            value={values.matrimony_menu_name}
          />
        </Box>
      </Grid>
    {/* Magazine menu*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.magazine_menu_enable)}
                    onChange={(e) => handleChangeStatus(e, "magazine_menu_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Magazine"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Magazine Menu Name"
            disabled={JSON.parse(values.magazine_menu_enable) === true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("magazine_menu_name", e.target.value)}
            value={values.magazine_menu_name}
          />
        </Box>
      </Grid>
    {/* Magazine name*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.magazine_name_enable)}
                    onChange={(e) => handleChangeStatus(e, "magazine_name_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Magazine Name"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box>
          <TextField
            label="Magazine Name"
            disabled={JSON.parse(values.magazine_name_enable)=== true ? false : true}
            variant="filled"
            fullWidth
            focused
            onChange={(e) => setValue("magazine_name", e.target.value)}
            value={values.magazine_name}
          />
        </Box>
      </Grid>

{/* Magazine logo*/}
      <Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.magazine_logo_enable)}
                    onChange={(e) => handleChangeStatus(e, "magazine_logo_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Magazine Logo"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box display='flex' justifyContent='center' justifyItems='center'>
            {/* ***************Magazine Image start************* */}
            {storeMagazineImage !==null && <Box className="" sx={{mt:2, ml:2, mb:3}}>
                      <Image src={storeMagazineImage} alt="" width='20%'></Image>
                      <Button onClick={()=>{setStoreMagazineImage(null)}}>Update Image</Button>
                    </Box>}

                    {storeMagazineImage===null &&  <Box className="clearfix" sx={{mt:2, ml:2, mb:3}}>
                        <Upload
                          action='https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png'
                          listType="picture-card"
                          fileList={values.magazine_logo}
                          onPreview={handlePreview}
                          onChange={handleChangeLogo}
                          disabled={values.magazine_logo_enable===true?false:true}
                        >
                          {magazineLogo.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                          <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Box>}

        </Box>
      </Grid>

{/* magazine banner */}
<Grid item lg={4} md={12} sm={12} xs={12} sx={{ mt: 1.5 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="myToggleStatus"
                    label="Publish"
                    labelPlacement="start"
                    checked={JSON.parse(values.magazine_banner_enable)}
                    onChange={(e) => handleChangeStatus(e, "magazine_banner_enable")}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Enable Magazine Banner"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item lg={8} md={12} sm={12} xs={12}>
        <Box display='flex' justifyContent='center' justifyItems='center'>
            {/* ***************Magazine Image start************* */}
            {storeMagazineBanner !==null && <Box className="" sx={{mt:2, ml:2, mb:3}}>
                      <Image src={storeMagazineBanner} alt="" width='20%'></Image>
                      <Button onClick={()=>{setStoreMagazineBanner(null)}}>Update Image</Button>
                    </Box>}

                    {storeMagazineBanner===null &&  <Box className="clearfix" sx={{mt:2, ml:2, mb:3}}>
                        <Upload
                          action='https://icircles.app/storage/logo/h9kMsnUQzKZ23PfgkLNhl1UxGWcjFXCSIntrNrD5.png'
                          listType="picture-card"
                          fileList={values.magazine_banner}
                          onPreview={handlePreview}
                          onChange={handleChangeBanner}
                          disabled={values.magazine_banner_enable===true?false:true}
                        >
                          {magazineBanner.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                          <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Box>}

        </Box>
      </Grid>

    </>
  );
};

export default CoomunityMenuSettings;
