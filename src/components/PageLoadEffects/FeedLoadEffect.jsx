import { Container } from "@mui/material";
import React, { Fragment } from "react";
import { ShimmerSocialPost } from "react-shimmer-effects";
export default function FeedLoadEffect() {
  return (
    <Fragment>
      <Container>
        <ShimmerSocialPost type="image" />
        <ShimmerSocialPost className="mt-3" type="image" />
      </Container>
    </Fragment>
  );
}
