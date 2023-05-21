// import { Link } from "react-router-dom";

// function London() {
//   return <Link to="/spots/london">London</Link>;
// }

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

export function Loncomp() {
  const { classes } = useStyles();

  return (
    <Link to="/spots/london">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{
          backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/London_Big_Ben_Phone_box.jpg/800px-London_Big_Ben_Phone_box.jpg)`,
        }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
            Nature
          </Text>
          <Title order={3} className={classes.title}>
            London
          </Title>
        </div>
        {/* <Button variant="white" color="dark">
          Read article
        </Button> */}
      </Paper>
    </Link>
  );
}
export default Loncomp;
