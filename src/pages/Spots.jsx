import React from "react";
import London from "../components/LondonComp";
import Barcelona from "../components/BarcelonaComp";
import Rome from "../components/RomeComp";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  rem,
  LoadingOverlay,
  Flex,
  Text,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";

const Spots = () => {
  return (
    <Container mt={30} mb={30} size={1920}>
      <Text mt={50} ml={50}>
        Find Spots in your city
      </Text>
      <Flex
        mih={50}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        mt={50}
      >
        <London />
        <Rome />
        <Barcelona />
      </Flex>
    </Container>
  );
};

export default Spots;

{
  /* <London />
<Rome />
<Barcelona /> */
}
