import React, { Fragment } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function ThreeDotLoaderEffect(value) {
  return (
    <ThreeDots 
        height="30" 
        width="80" 
        radius="9"
        color="#1976d2" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{top: '200px'}}
        wrapperClassName="" 
        visible={value}
        />
  );
}
