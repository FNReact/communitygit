import { Container } from "@mui/material";
import React, { Fragment } from "react";
import { ShimmerPostList } from "react-shimmer-effects";
export default function ClassifiedItemsEffect() {
  return (
    <Fragment>
      <Container>
        <ShimmerPostList postStyle="STYLE_FOUR" col={12}  row={1} gap={30} />
      </Container>
    </Fragment>
  );
}
