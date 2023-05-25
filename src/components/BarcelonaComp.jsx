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

export function BarcelonaComp() {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/2/26/%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg)`,
      }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          Barcelona
        </Title>
      </div>
      <Link to="/spots/barcelona">
        <Button variant="white" color="dark">
          See Spots
        </Button>
      </Link>
    </Paper>
  );
}
export default BarcelonaComp;
