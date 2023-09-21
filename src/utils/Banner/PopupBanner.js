import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CropperMainBanner from "./CropperMainBanner";

export default function PopupBanner({ open, image, handleClose, getCroppedFile, setValue,setCompanyLogo }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Crop Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CropperMainBanner
              handleClose={handleClose}
              src={image}
              setValue={setValue}
              setCompanyLogo={setCompanyLogo}
              getCroppedFile={getCroppedFile}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}