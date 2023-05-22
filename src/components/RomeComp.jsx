import { createStyles, Paper, Text, Title, Button, rem } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(700),
    width: rem(500),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export function Rome() {
  const { classes } = useStyles();

  return (
    <Link to="/spots/Rome">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{
          backgroundImage: `url(https://media.istockphoto.com/id/1323460157/photo/rome-italy-night-city-skyline-at-rome-colosseum-empty-nobody.jpg?b=1&s=170667a&w=0&k=20&c=XE9O_GYWrL_RaFZH0Gw5P3NAW_YL_BSVcbbq9rlLvXE=)`,
        }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
            Nature
          </Text>
          <Title order={3} className={classes.title}>
            Rome
          </Title>
        </div>
        {/* <Button variant="white" color="dark">
        Read article
      </Button> */}
      </Paper>
    </Link>
  );
}
export default Rome;
