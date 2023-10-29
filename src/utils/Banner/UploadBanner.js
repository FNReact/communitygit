import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Input = styled("input")({
  display: "none"
});

export default function UploadBanner({ getUploadedFile }) {
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files.length === 0) {
      return alert("Please select a file.");
    }
    const reader = new FileReader();
    reader.onload = () => {
      getUploadedFile(reader.result);
    };
    reader.readAsDataURL(files[0])

  };
  return (
    <label htmlFor="contained-button-file-banner">
      <Box className='Uploadbtnn'>
        <Input
          accept="image/*"
          id="contained-button-file-banner"
          multiple
          type="file"
          onChange={onChange}
        />
        {/* <Button variant="contained" component="span" className="btn" >
          Upload
        </Button> */}

        <FileUploadIcon />
      </Box>
    </label>
  );
}