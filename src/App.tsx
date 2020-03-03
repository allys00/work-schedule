import "react-native-gesture-handler";
import React from "react";
import { Icon, Root } from "native-base";
import Schedule from "./pages/schedule/Schedule";
import Clients from "./pages/clients/Clients";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export enum RouterEnum {
  Schedule = "Agenda",
  Clients = "Clientes",
  Reports = "Relatórios"
}

const IconTab = (style: any): any => ({
  [RouterEnum.Schedule]: (
    <Icon style={style} type="FontAwesome" name="calendar" />
  ),
  [RouterEnum.Clients]: (
    <Icon style={style} type="FontAwesome" name="hospital-o" />
  ),
  [RouterEnum.Reports]: <Icon style={style} type="Entypo" name="bar-graph" />
});

const App = () => {
  return (
    <Root>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            style: {
              backgroundColor: "white"
            }
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              return IconTab({ fontSize: 22, color })[route.name];
            }
          })}
        >
          <Tab.Screen name={RouterEnum.Schedule} component={Schedule} />
          <Tab.Screen name={RouterEnum.Clients} component={Clients} />
          <Tab.Screen name={RouterEnum.Reports} component={Clients} />
        </Tab.Navigator>
      </NavigationContainer>
    </Root>
  );
};

export default App;
