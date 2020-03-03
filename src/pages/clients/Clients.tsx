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
  Icon,
  Toast
} from "native-base";
import { useCollections } from "../../collections-module/Collection.hook";
import { IClient, Client } from "../../models/Client.model";
import Collections from "../../utils/collections.constants";
import { StyleSheet } from "react-native";
import NumberToMoney from "../../components/number-format/NumberFormat";
import ClientEdit from "./ClientEdit";
import { Event } from "../../models/Event.model";
import Modal from "../../components/modal/Modal";
import Header from "../../components/header/Header";
import ClientList from "./ClientList";
import { RouterEnum } from "../../App";

const Schedule = ({ route, navigation }: any) => {
  const { items: clients } = useCollections<IClient>(Collections.clients);
  const [clientEdit, setClientEdit] = useState<IClient | null>(null);
  const [scheduleDays, setScheduleDays] = useState<[] | null>(null);

  useEffect(() => {
    if (route?.params?.days) {
      navigation.navigate(RouterEnum.Clients, {
        days: null
      });
      setClientEdit({} as IClient);
      setScheduleDays(route.params.days);
    }
  });

  function changeClientEdit(obj: Partial<IClient>) {
    setClientEdit({ ...(clientEdit as IClient), ...obj });
  }

  const cleanClientEdit = () => {
    setClientEdit(null);
    setScheduleDays(null);
  };

  async function onSave() {
    if (clientEdit?.id) {
      const { id, ...rest } = clientEdit;
      await Client.update(id, rest);
      Toast.show({
        text: "Cliente atualizado com Sucesso",
        type: "success"
      });
    } else if (clientEdit) {
      await Client.add(clientEdit);

      if (scheduleDays) {
        navigation.navigate(RouterEnum.Schedule, { scheduleDays });
        Toast.show({
          text: "Cliente e Evento cadastrado com Sucesso",
          type: "success"
        });
      } else {
        Toast.show({
          text: "Cliente cadastrado com Sucesso",
          type: "success"
        });
      }
    }
    cleanClientEdit();
  }

  async function onRemove() {
    if (!clientEdit) return;
    await Client.remove(clientEdit.id);
    await Event.removeMultiples([
      { key: "client_id", operation: "==", value: clientEdit.id }
    ]);
    cleanClientEdit();
  }

  return (
    <>
      <Header hasTabs title="Clientes" />
      <Content style={{ backgroundColor: "#fff" }}>
        <ClientList
          clients={clients}
          onPress={setClientEdit}
          emptyMsg="Crie o seu primeiro Cliente"
        />
      </Content>

      <Fab position="bottomRight" onPress={() => setClientEdit({} as IClient)}>
        <Icon type="AntDesign" name="plus" />
      </Fab>
      <Modal
        title={"Cliente"}
        isVisible={Boolean(clientEdit)}
        iconRight={{ name: "save", type: "FontAwesome5" }}
        onRightClick={onSave}
        onClose={cleanClientEdit}
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

export default Schedule;
