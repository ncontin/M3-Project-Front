import React, { useEffect, useState } from "react";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  rem,
  Button,
  Input,
  Card,
  Image,
  ActionIcon,
  Badge,
  Center,
  Rating,
} from "@mantine/core";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    maxWidth: "600px",
    padding: rem(24),
    boxShadow:
      theme.colorScheme === "dark" ? theme.shadows.md : theme.shadows.sm,
  },
  spotImage: {
    marginBottom: rem(16),
    maxHeight: "540px",
    width: "100%",
    objectFit: "cover",
  },
  title: {
    marginBottom: rem(16),
  },
  description: {
    marginBottom: rem(8),
  },
  rating: {
    marginBottom: rem(8),
  },
  createdBy: {
    marginBottom: rem(16),
  },
  commentHeader: {
    marginTop: rem(32),
    marginBottom: rem(16),
  },
  noComments: {
    marginBottom: rem(16),
  },
  commentForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: rem(24),
  },
  commentInput: {
    marginBottom: rem(16),
    width: "100%",
  },
}));

function SpotDetails() {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { classes } = useStyles();

  const fetchSpot = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`
      );
      if (response.status === 200) {
        setSpot(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/comments/${spotId}`
      );
      if (response.status === 200) {
        console.log(response.data);
        setComments(response.data);
      }
    } catch (error) {
      console.log(error);
      navigate("/error-500");
    }
  };

  useEffect(() => {
    fetchSpot();
    fetchComments();
  }, [spotId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const localToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/comments`,
        {
          spotId: spotId,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );

      if (response.status === 201) {
        // Comment successfully posted, update the comments list
        fetchComments();
        setNewComment(""); // Clear the comment input field
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL}/api/spots/${spotId}`
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      {spot ? (
        <Card withBorder padding="lg" radius="md" className={classes.card}>
          <Card.Section mb="sm">
            <Image
              src={spot.imageUrl}
              alt={spot.title}
              className={classes.spotImage}
            />
          </Card.Section>

          <Text fw={700} className={classes.title} mt="xs">
            {spot.title}
          </Text>

          <Text size="md" weight={500} className={classes.description}>
            {spot.description}
          </Text>
          <Text size="sm" color="gray" className={classes.rating}>
            Rating:
            <Rating
              value={spot.rating}
              size="xs"
              readOnly
              style={{ marginLeft: rem(8) }}
            />
          </Text>
          <Text size="sm" color="gray" style={{ marginBottom: rem(8) }}>
            City: {spot.city}
          </Text>
          <Text size="sm" color="gray" style={{ marginBottom: rem(16) }}>
            Address: {spot.address}
          </Text>
          <Text size="sm" color="gray" className={classes.createdBy}>
            Created by: {spot.user_id.username}
          </Text>

          <Link to={`/spots/update/${spotId}`} style={{ marginRight: rem(16) }}>
            <Button size="sm" variant="outline">
              Update
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            color="red"
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Text size="lg" weight={700} className={classes.commentHeader}>
            Comments:
          </Text>
          {comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <div key={comment._id} className={classes.comment}>
                  <Group>
                    <Avatar
                      src={comment.user_id.avatarUrl}
                      alt={comment.user_id.username}
                      radius="xl"
                    />
                    <div>
                      <Text size="sm" weight={700}>
                        {comment.user_id.username}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {new Date(comment.date).toLocaleString()}
                      </Text>
                    </div>
                  </Group>
                  <Text size="sm">{comment.content}</Text>
                </div>
              ))}
            </div>
          ) : (
            <Text size="sm" color="gray" className={classes.noComments}>
              No comments yet.
            </Text>
          )}
          <form onSubmit={handleSubmitComment} className={classes.commentForm}>
            <Input
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Add a comment"
              fullWidth
              required
              className={classes.commentInput}
            />
            <Button
              type="submit"
              variant="outline"
              color="blue"
              size="sm"
              mt="sm"
            >
              Post Comment
            </Button>
          </form>
        </Card>
      ) : (
        // Render loading state
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
      )}
    </div>
  );
}

export default SpotDetails;
