import { Container } from "@mui/material";
import React, { Fragment } from "react";
import { ShimmerPostDetails } from "react-shimmer-effects";
export default function JobDetailsLoadEffect() {
  return (
    <Fragment>
      <Container>
          <ShimmerPostDetails card cta variant="EDITOR" />
      </Container>
    </Fragment>
  );
}
