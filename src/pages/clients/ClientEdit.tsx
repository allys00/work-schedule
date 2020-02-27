import React from "react";
import {
  Form,
  Item,
  Input,
  Content,
  Label,
  Text,
  View,
  Textarea
} from "native-base";
import ColorPicker from "../../components/color-pick/ColorPick";
import { StyleSheet } from "react-native";
import InputMask from "../../components/input-mask/InputMask";

const ClientEdit = () => {
  return (
    <Content>
      <Form style={{ padding: 15 }}>
        <View style={styles.inputGroup}>
          <InputMask
            styleView={{ width: "60%" }}
            label="Name"
            onChangeText={console.log}
            placeholder="Unidade Central"
          />
          <InputMask
            styleView={{ width: "35%" }}
            label="Sigla"
            onChangeText={console.log}
            placeholder="UC"
          />
        </View>
        <View style={styles.inputGroup}>
          <InputMask
            styleView={styles.smallInput}
            label="Inicio"
            onChangeText={console.log}
            mask={"[00]{:}[00]"}
            placeholder="HH:mm"
            keyboardType="numeric"
          />
          <InputMask
            styleView={styles.smallInput}
            label="Final"
            onChangeText={console.log}
            mask={"[00]{:}[00]"}
            placeholder="HH:mm"
            keyboardType="numeric"
          />
        </View>
        <InputMask
          label="Valor (R$)"
          onChangeText={console.log}
          mask={"[99999]{,}[99]"}
          keyboardType="numeric"
          placeholder="200"
        />
         <InputMask
          label="Descrição"
          onChangeText={console.log}
          placeholder="Levar Crachá"

        />
        <Label style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
          Selecione uma Cor
        </Label>
        <ColorPicker onColorChange={console.log} />
      </Form>
    </Content>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  smallInput: {
    width: "45%"
  }
});

export default ClientEdit;
