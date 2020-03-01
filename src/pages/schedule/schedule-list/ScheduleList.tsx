import React from "react";
import { IClient } from "../../../models/Client.model";
import { List, ListItem, Text } from "native-base";
import ClientCard from "../../../components/client-card/ClientCard";
import { StyleSheet } from "react-native";

interface ListProps {
  clients: IClient[];
  title: string;
  emptyMsg?: string;
}

const ScheduleList = ({ clients, title, emptyMsg = "Vazio" }: ListProps) => (
  <List>
    <ListItem key={0}>
      <Text> {title} </Text>
    </ListItem>
    {clients.map(client => (
      <ListItem avatar key={client.id}>
        <ClientCard {...client} />
      </ListItem>
    ))}

    {!clients.length && (
      <ListItem key={1}>
        <Text style={styles.empty}> {emptyMsg}</Text>
      </ListItem>
    )}
  </List>
);

const styles = StyleSheet.create({
  empty: {
    color: "#ccc"
  }
});

export default ScheduleList;
