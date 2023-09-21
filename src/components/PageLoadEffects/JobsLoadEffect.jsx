import { Container } from "@mui/material";
import React, { Fragment } from "react";
import { ShimmerTable, ShimmerText } from "react-shimmer-effects";
export default function JobsLoadEffect() {
  return (
    <Fragment>
      <Container>
        <ShimmerText line={5} gap={10} />
        <ShimmerText line={5} gap={10} />
        <ShimmerText line={5} gap={10} />
        <ShimmerText line={5} gap={10} />
        <ShimmerText line={5} gap={10} />
        <ShimmerText line={5} gap={10} />
      </Container>
    </Fragment>
  );
}
