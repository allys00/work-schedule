import React from "react";
import {
  Container,
  Header,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Icon
} from "native-base";
import Schedule from "./pages/schedule/Schedule";
import Clients from "./pages/clients/Clients";


const App = () => {
  return (
    <Container>
      <Header hasTabs />
      <Tabs tabBarPosition="bottom">
        <Tab
          heading={
            <TabHeading>
              <Icon type="FontAwesome" name="calendar" />
            </TabHeading>
          }
        >
          <Schedule />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Icon type="FontAwesome" name="hospital-o" />
            </TabHeading>
          }
        >
          <Clients />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Icon type="Entypo" name="bar-graph" />
            </TabHeading>
          }
        >
          <Text>No Icon</Text>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
