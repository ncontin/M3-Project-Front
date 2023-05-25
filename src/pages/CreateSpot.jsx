import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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
import { IconUpload } from "@tabler/icons-react";

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

const CreateSpot = () => {
  const { token } = useContext(AuthContext);
  console.log(token);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("London");
  const navigate = useNavigate();
  const { classes, theme } = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fData = new FormData();
    const image = event.target.image.files[0];
    console.log("image", image);
    fData.append("imageUrl", image);
    fData.append("title", title);
    fData.append("description", description);
    fData.append("address", address);
    fData.append("rating", rating);
    fData.append("city", city);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/spots/`,
        fData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //fix
      if (response.status === 201) {
        const newSpot = response.data;
        console.log("New spot created:", newSpot);
        // perform any necessary actions upon successful spot creation
        navigate(`/spots/${newSpot.city.toLowerCase()}`);
      } else {
        console.error("Error creating spot:", response.status);
        // handle the error appropriately
      }
    } catch (error) {
      console.error("Error creating spot:", error);
      navigate("/error-500");
      // handle the error appropriately
    }
  };

  return (
    <Container mt={30} mb={30} size={720}>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
            Create a Spot
          </Text>
          <div>
            <TextInput
              type="text"
              label="Spot Title"
              placeholder="Spot Title"
              value={title}
              withAsterisk
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Description"
              label="Description"
              value={description}
              withAsterisk
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <TextInput
              type="text"
              label="Address"
              placeholder="Address"
              value={address}
              withAsterisk
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <TextInput
              type="number"
              label="Rating"
              placeholder="Rating"
              value={rating}
              withAsterisk
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="London">London</option>
              <option value="Rome">Rome</option>
              <option value="Barcelona">Barcelona</option>
            </select>
          </div>
          <div>
            <FileInput
              type="file"
              name="image"
              label="Spot's image"
              placeholder="Spot's image"
              accept="image/png, image/jpg"
              required
              icon={<IconUpload size={rem(14)} />}
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            size="lg"
          >
            Create Spot
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default CreateSpot;
