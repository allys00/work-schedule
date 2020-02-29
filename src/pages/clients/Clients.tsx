import React, { useState, useEffect } from "react";
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
import { useCollections } from "../../collections-module/Collection.hook";
import { IClient, Client } from "../../models/Client.model";
import Collections from "../../utils/collections.constants";
import { StyleSheet } from "react-native";
import NumberToMoney from "../../components/number-format/NumberFormat";
import ClientEdit from "./ClientEdit";
import { Event } from "../../models/Event.model";
import Modal from "../../components/modal/Modal";

const Schedule = () => {
  const { items: clients } = useCollections<IClient>(Collections.clients);
  const [clientEdit, setClientEdit] = useState<IClient | null>(null);

  function changeClientEdit(obj: Partial<IClient>) {
    setClientEdit({ ...(clientEdit as IClient), ...obj });
  }

  async function onSave() {
    if (clientEdit) {
      const { id, ...rest } = clientEdit;
      await Client.update(id, rest);
    } else if (clientEdit) {
      await Client.add(clientEdit);
    }
    setClientEdit(null);
  }

  async function onRemove() {
    if (!clientEdit) return;
    await Client.remove(clientEdit.id);
    await Event.removeMultiples([
      { key: "client_id", operation: "==", value: clientEdit.id }
    ]);
    setClientEdit(null);
  }

  return (
    <>
      <Content>
        <List>
          {clients.map(client => (
            <ListItem
              avatar
              key={client.id}
              onPress={() => setClientEdit(client)}
            >
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
        title={"Cliente"}
        visible={Boolean(clientEdit)}
        iconRight={{ name: "save", type: "FontAwesome5" }}
        onRightClick={onSave}
        onClose={() => setClientEdit(null)}
      >
        <ClientEdit
          client={clientEdit as IClient}
          onChange={changeClientEdit}
          onRemove={onRemove}
        />
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
