import React, { Fragment } from "react";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
export default function MemberLoadEffect() {
  return (
    <Fragment>
        <ShimmerSimpleGallery col={12} row={1} gap={30} imageType="circular" imageHeight={150} caption />
    </Fragment>
  );
}
