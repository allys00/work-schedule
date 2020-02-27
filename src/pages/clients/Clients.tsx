import React, { useState } from "react";
import {
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  View,
  Fab,
  Icon
} from "native-base";
import { useCollections } from "../../hooks/Collections.hook";
import { IClient } from "../../models/Client.interface";
import Collections from "../../utils/collections.constants";
import { StyleSheet, Alert } from "react-native";
import NumberToMoney from "../../components/number-format/NumberFormat";
import ClientEdit from "./ClientEdit";
import Modal from "../../components/modal/Modal";

const Schedule = () => {
  const { items: clients, loading } = useCollections<IClient>(
    Collections.clients
  );
  const [clientEdit, setClientEdit] = useState<IClient | null>(null);

  return (
    <>
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

      <Fab position="bottomRight" onPress={() => setClientEdit({} as IClient)}>
        <Icon type="AntDesign" name="plus" />
      </Fab>
      <Modal
        title="Clientes"
        visible={Boolean(clientEdit)}
        iconRight={{ name: "save", type: "FontAwesome5" }}
        onClose={() => setClientEdit(null)}
      >
        <ClientEdit />
      </Modal>
    </>
  );
};

const style = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden"
  }
});

export default Schedule;
