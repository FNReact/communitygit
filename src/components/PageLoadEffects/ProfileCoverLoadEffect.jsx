import { Container } from "@mui/material";
import React, { Fragment } from "react";
import { ShimmerText } from "react-shimmer-effects";
export default function ProfileCoverLoadEffect() {
  return (
    <Fragment>
      <Container>
          <ShimmerText line={10} gap={10} />
      </Container>
    </Fragment>
  );
}
