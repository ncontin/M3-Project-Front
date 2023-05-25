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
    fontSize: rem(42),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export function RomeComp() {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `url(https://res.klook.com/image/upload/Mobile/City/afmqgg5h0jl9wnr1dfmf.jpg)`,
      }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          Rome
        </Title>
      </div>
      <Link to="/spots/rome">
        <Button variant="white" color="dark">
          See Spots
        </Button>
      </Link>
    </Paper>
  );
}
export default RomeComp;
