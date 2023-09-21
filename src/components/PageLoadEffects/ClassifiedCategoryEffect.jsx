import { Container } from "@mui/material";
import React, { Fragment } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
export default function CommentsLoadEffect() {
  return (
    <Fragment>
      <Container>
            <ShimmerThumbnail height={125} rounded />
      </Container>
    </Fragment>
  );
}
