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
  createStyles,
  LoadingOverlay,
  Flex,
  Text,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(42),
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,

    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },
}));

const Spots = () => {
  const { classes, theme } = useStyles();
  return (
    <Container mt={30} mb={30} size={1920}>
      <Text mt={50} ml={0} className={classes.title}>
        Find Spots In Your City
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
