import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/AuthContext"; // <== IMPORT
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  Flex,
  rem,
  Container,
} from "@mantine/core";
// import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";

import SwitchToggle from "./SwitchToggle";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconCurrencyBitcoin,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const handleProfileClick = () => {
    closeDrawer(); // Close the drawer when the "Profile" link is clicked
  };

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not
  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to="/" className={classes.link}>
              <IconCurrencyBitcoin width={30} /> Home
            </Link>

            <Link to="/spots" className={classes.link}>
              KoolSpots
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            <SwitchToggle />
            <Link to="/spots/create">
              <Button>Create a spot</Button>
            </Link>

            {/* {isLoggedIn && (
              <Link to="/profile">
                <Button>Profile</Button>
              </Link>
            )} */}
            {!isLoggedIn && (
              <Link to="/login">
                <Button variant="default">Log in</Button>
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/login">
                <Button type="button" variant="default" onClick={logout}>
                  Log Out
                </Button>
              </Link>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      {/* mobile after this line */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        {/* <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md"> */}
        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />

        <Link to="/" className={classes.link} onClick={handleProfileClick}>
          <IconCurrencyBitcoin width={30} /> Home
        </Link>
        <Link to="/spots" className={classes.link} onClick={handleProfileClick}>
          <Text
            ta="center"
            w={100}
            className={classes.title}
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Kool Spots
          </Text>
        </Link>
        <Link to="/spots/create">
          <Button onClick={handleProfileClick}>Create a spot</Button>
        </Link>

        <Divider
          my="sm"
          color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
        />

        <Group position="center" grow pb="xl" px="md">
          <SwitchToggle />
          {/* {isLoggedIn && (
            <Link to="/profile">
              <Button onClick={handleProfileClick}>Profile</Button>
            </Link>
          )} */}
          {!isLoggedIn && (
            <Link to="/login">
              <Button variant="default" onClick={handleProfileClick}>
                Log in
              </Button>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup">
              <Button onClick={handleProfileClick}>Sign up</Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/login">
              <Button type="button" onClick={(logout, handleProfileClick)}>
                Log Out
              </Button>
            </Link>
          )}
        </Group>
        {/* </ScrollArea> */}
      </Drawer>
    </Box>
  );
}

export default Navbar;
