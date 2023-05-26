import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
function Search({ searchText, setSearchText }) {
  //   return (
  //     <>
  //       <label>Search</label>
  //       <input
  //         value={searchText}
  //         type="text"
  //         onChange={(e) => {
  //           setSearchText(e.target.value);
  //         }}
  //       />
  //     </>
  //   );
  // }

  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      value={searchText}
      radius="xl"
      size="md"
      onChange={(e) => {
        setSearchText(e.target.value);
      }}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search Spots"
      rightSectionWidth={42}
      mb={20}
      mt={20}
      w={350}
    />
  );
}
export default Search;
