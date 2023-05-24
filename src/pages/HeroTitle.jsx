import { createStyles, Container, Text, Button, Group, rem } from "@mantine/core";
// import { GithubIcon } from "@mantine/ds";
import { Link } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: rem(200),
    paddingBottom: rem(40),

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan("sm")]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

export function HeroTitle() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Uncover{" "}
          <Text component="span" variant="gradient" gradient={{ from: "blue", to: "cyan" }} inherit>
            cool spots
          </Text>
          {", "}
          <Text component="span" variant="gradient" gradient={{ from: "red", to: "yellow" }} inherit>
            ignite your adventure
          </Text>{" "}
          with KoolSpots.
        </h1>

        <Text className={classes.description} color="dimmed">
          Welcome to KoolSpots, your ultimate guide to finding the coolest spots near you. Discover hidden gems, trendy
          cafes, breathtaking views, and more, all at your fingertips. Explore your city like never before and unlock
          unforgettable experiences. Let the adventure begin!
        </Text>

        <Group className={classes.controls}>
          <Link to="/spots">
            <Button size="xl" className={classes.control} variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
              Get started
            </Button>
          </Link>
          {/* <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            // leftIcon={<GithubIcon size={20} />}
          >
            GitHub
          </Button> */}
        </Group>
      </Container>
    </div>
  );
}

export default HeroTitle;
