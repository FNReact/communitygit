import React, { Fragment } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
export default function BoxLoadEffect() {
  return (
    <Fragment>
      <ShimmerThumbnail height={180} rounded />
    </Fragment>
  );
}
