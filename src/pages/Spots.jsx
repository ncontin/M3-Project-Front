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
    <Box w={1680} mx="auto">
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
    </Box>
  );
};



export default Spots;

{
  /* <London />
<Rome />
<Barcelona /> */
}
