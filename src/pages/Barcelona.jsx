import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
  Flex,
  Container,
  Rating,
} from "@mantine/core";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: rem(350),
    height: rem(425),
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
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
}));

export function Barcelona() {
  const { classes, theme } = useStyles();
  const [spots, setSpots] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/spots`
      );
      if (response.status === 200) {
        const barcelonaSpots = response.data.filter(
          (spot) => spot.city === "Barcelona"
        );
        setSpots(barcelonaSpots);
      }
    } catch (error) {
      console.log(error);
      navigate("/error-500");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {spots.length > 0 ? (
        <>
          <Container mt={30} mb={30} size={1920}>
            <Text
              ta="center"
              className={classes.title}
              component="span"
              variant="gradient"
              gradient={{
                from: "red",
                to: "yellow",
              }}
              inherit
            >
              Barcelona Spots
            </Text>
            <Search searchText={searchText} setSearchText={setSearchText} />
            <Flex
              mih={50}
              // bg="rgba(0, 0, 0, .3)"
              gap={30}
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              {spots
                .filter((spot) => {
                  if (
                    spot.title.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return spot;
                  }
                })
                .map((spot) => (
                  <div key={spot._id}>
                    <Card
                      withBorder
                      radius="md"
                      p="md"
                      className={classes.card}
                      width={200}
                    >
                      <Card.Section>
                        <Image
                          src={`${spot.imageUrl}`}
                          alt={"title"}
                          height={180}
                        />
                      </Card.Section>

                      <Card.Section className={classes.section} mt="md">
                        <Group position="apart">
                          <Text fz="lg" fw={500}>
                            {spot.title}
                          </Text>
                          <Badge size="sm">{spot.city}</Badge>
                        </Group>
                        <Text fz="sm" mt="xs" mb={40}>
                          {spot.description}
                        </Text>
                      </Card.Section>

                      <Card.Section className={classes.section}>
                        {/* <Text mt="md" className={classes.label} c="dimmed">
                          Perfect for you, if you enjoy
                        </Text> */}
                        {/* <Group spacing={7} mt={5}>
                        {spot.rating}
                      </Group> */}
                        <Group position="start" pt={15}>
                          <Text className={classes.label} c="dimmed">
                            Rating
                          </Text>
                          <Rating value={spot.rating} fractions={2} readOnly />
                        </Group>
                      </Card.Section>

                      <Group mt="xs">
                        <Link to={`/spots/barcelona/${spot._id}`}>
                          <Button radius="md" style={{ flex: 1 }}>
                            Show details
                          </Button>
                        </Link>
                        {/* <ActionIcon variant="default" radius="md" size={36}>
                          <IconHeart
                            size="1.1rem"
                            className={classes.like}
                            stroke={1.5}
                          />
                        </ActionIcon> */}
                      </Group>
                    </Card>
                  </div>
                ))}
            </Flex>
          </Container>
        </>
      ) : (
        <Container mt={200} mb={30} size={200}>
          <Flex
            mih={50}
            // bg="rgba(0, 0, 0, .3)"
            gap={30}
            justify="flex-center"
            align="flex-center"
            direction="column"
            wrap="wrap"
          >
            <div
              aria-label="Orange and tan hamster running in a metal wheel"
              role="img"
              className="wheel-and-hamster"
            >
              <div className="wheel"></div>
              <div className="hamster">
                <div className="hamster__body">
                  <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                  </div>
                  <div className="hamster__limb hamster__limb--fr"></div>
                  <div className="hamster__limb hamster__limb--fl"></div>
                  <div className="hamster__limb hamster__limb--br"></div>
                  <div className="hamster__limb hamster__limb--bl"></div>
                  <div className="hamster__tail"></div>
                </div>
              </div>
              <div className="spoke"></div>
            </div>
          </Flex>
        </Container>
      )}
    </>
  );
}

export default Barcelona;
