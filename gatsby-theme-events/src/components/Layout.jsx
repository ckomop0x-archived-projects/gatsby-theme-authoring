import React from "react";
import { Heading, Container, Flex, Box } from "theme-ui";
const Layout = ({ children }) => {
  return (
    <Flex>
      <Container>
        <Box>
          <Heading>
            <h1>Gatsby Events Theme</h1>
          </Heading>
          <Container>{children}</Container>
        </Box>
      </Container>
    </Flex>
  );
};
export default Layout;
