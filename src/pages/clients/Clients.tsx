import React from "react";
import {
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  View
} from "native-base";
import { useCollections } from "../../hooks/Collections.hook";
import { IClient } from "../../models/Client.interface";
import Collections from "../../utils/collections.constants";
import { StyleSheet } from "react-native";
import NumberToMoney from "../../components/number-format/NumberFormat";

const Schedule = () => {
  const { items: clients, loading } = useCollections<IClient>(
    Collections.clients
  );

  return (
    <Content>
      <List>
        {clients.map(client => (
          <ListItem avatar key={client.id}>
            <Left>
              <View
                style={{
                  ...style.avatar,
                  backgroundColor: client.color
                }}
              />
            </Left>
            <Body>
              <Text>{client.name}</Text>
              <Text note>{`${client.startAt} ás ${client.endAt}`}</Text>
            </Body>
            <Right>
              <NumberToMoney value={client.value} />
            </Right>
          </ListItem>
        ))}
      </List>
    </Content>
  );
};

const style = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
});

export default Schedule;
