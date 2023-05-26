import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  TextInput,
  Textarea,
  FileInput,
  Select,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: rem(350),
    height: rem(402),
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
  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(18),
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
}));

const UpdatePage = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    address: "",
    rating: "",
    city: "London",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { classes, theme } = useStyles();

  const fetchSpot = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`
      );
      const spot = response.data;
      delete spot._id;
      console.log(spot);
      console.log(inputs);
      setInputs(spot);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error-500");
    }
  };

  useEffect(() => {
    fetchSpot();
  }, [spotId]);

  const handleChange = (event) => {
    /* setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    })) */
    /* Condition ? iftrue : iffalse */
    setInputs((prevInputs) => {
      let currentValue = event.target.value;
      const currentTarget = event.target.name;

      if (event.target.type === "checkbox") {
        currentValue = event.target.checked;
        console.log(event.target.checked);
      }

      return { ...prevInputs, [currentTarget]: currentValue };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...inputs };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("All good");
        // Navigate to the details page
        navigate(`/spots/${inputs.city.toLowerCase()}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Container mt={30} mb={30} size={720}>
      <form onSubmit={handleSubmit}>
        <Flex
          mih={50}
          // bg="rgba(0, 0, 0, .3)"
          gap={30}
          justify="flex-center"
          align="flex-center"
          direction="column"
          wrap="wrap"
        >
          <Text
            ta="center"
            className={classes.title}
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Update Spot
          </Text>
          <TextInput
            label="Spot Title"
            value={inputs.title}
            name="title"
            onChange={handleChange}
          />
          <Textarea
            label="Description"
            value={inputs.description}
            name="description"
            onChange={handleChange}
          />
          <TextInput
            label="Address"
            name="address"
            value={inputs.address}
            onChange={handleChange}
          />

          <TextInput
            type="number"
            label="Rating"
            value={inputs.rating}
            name="rating"
            onChange={handleChange}
          />
          <div>
            <select value={inputs.city} name="city" onChange={handleChange}>
              <option value="London">London</option>
              <option value="Rome">Rome</option>
              <option value="Barcelona">Barcelona</option>
            </select>
          </div>
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            size="lg"
          >
            Update Spot
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default UpdatePage;
