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

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: rem(350),
    height: rem(480),
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
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
}));

export function London() {
  const { classes, theme } = useStyles();
  const [spots, setSpots] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/spots`);
      if (response.status === 200) {
        const londonSpots = response.data.filter((spot) => spot.city === "London");
        setSpots(londonSpots);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>London Spots</h2>
      {spots.length > 0 ? (
        <>
          <Container mt={30} mb={30} size={1920}>
            <Flex
              mih={50}
              // bg="rgba(0, 0, 0, .3)"
              gap={30}
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              {spots.map((spot) => (
                <div key={spot._id}>
                  <Card withBorder radius="md" p="md" className={classes.card} width={200}>
                    <Card.Section>
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                        }
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
                      <Text fz="sm" mt="xs">
                        {spot.description}
                      </Text>
                    </Card.Section>

                    <Card.Section className={classes.section}>
                      <Text mt="md" className={classes.label} c="dimmed">
                        Perfect for you, if you enjoy
                      </Text>
                      {/* <Group spacing={7} mt={5}>
                        {spot.rating}
                      </Group> */}
                      <Group position="center">
                        <Rating value={spot.rating} fractions={2} readOnly />
                      </Group>
                    </Card.Section>

                    <Group mt="xs">
                      <Link to={`/spots/london/${spot._id}`}>
                        <Button radius="md" style={{ flex: 1 }}>
                          Show details
                        </Button>
                      </Link>
                      <ActionIcon variant="default" radius="md" size={36}>
                        <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
                      </ActionIcon>
                    </Group>
                  </Card>
                </div>
              ))}
            </Flex>
          </Container>
        </>
      ) : (
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
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
      )}
    </>
  );
}

export default London;
