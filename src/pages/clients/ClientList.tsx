import React from "react";
import { IClient } from "../../models/Client.model";
import { List, ListItem, Text, Spinner } from "native-base";
import ClientCard from "../../components/client-card/ClientCard";
import { StyleSheet } from "react-native";

interface ListProps {
  clients: IClient[];
  title?: string;
  emptyMsg?: string;
  onPress?(client: IClient): void;
  loading?: boolean;
}

const ClientList = ({
  clients,
  title,
  emptyMsg = "Vazio",
  onPress = () => {},
  loading
}: ListProps) => (
  <List>
    {title && (
      <ListItem key={0}>
        <Text> {title} </Text>
      </ListItem>
    )}

    {loading ? (
      <Spinner color="#888" />
    ) : (
      <>
        {clients.map(client => (
          <ListItem avatar key={client.id} onPress={() => onPress(client)}>
            <ClientCard {...client} />
          </ListItem>
        ))}

        {!clients.length && (
          <ListItem key={1}>
            <Text style={styles.empty}> {emptyMsg}</Text>
          </ListItem>
        )}
      </>
    )}
  </List>
);

const styles = StyleSheet.create({
  empty: {
    color: "#ccc",
    textAlign: "center",
    width: "100%"
  }
});

export default ClientList;
