import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import "cropperjs/dist/cropper.css";

export default function CropperMain({ src, getCroppedFile, setValue, setCompanyLogo }) {
  const cropperRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const img = cropper.getCroppedCanvas().toDataURL();
    getCroppedFile(img);

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }  
  //Usage example:
  var file = dataURLtoFile(img, 'avater.png');
  setValue('logo', file)
  // setCompanyLogo(null)
  };
  
  return (
    <>
      {loading && (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}
      <Cropper
        src={src}
        style={{ height: 300, width:300 }}
        // Cropper.js options
        // initialAspectRatio={16 / 9}
        guides={false}
        ready={() => {
          setLoading(false);
        }}
        ref={cropperRef}
      />
      <Button
        sx={{
          float: "right",
          mt: 1
        }}
        onClick={handleClick}
        autoFocus
        color="success"
        variant="contained"
      >
        Crop
      </Button>
    </>
  );
}