import React, { useEffect,  RefObject } from "react";
import { Form, Content, Label, View, Fab, Icon } from "native-base";
import ColorPicker from "../../components/color-pick/ColorPick";
import { StyleSheet, TextInput, Alert } from "react-native";
import InputMask from "../../components/input-mask/InputMask";
import { IClient } from "../../models/Client.model";

interface Props {
  client: IClient;
  onChange(obj: Partial<IClient>): void;
  onRemove?(): void;
}

type InputRef = { input: TextInput };

const ClientEdit = ({ client, onChange, onRemove }: Props) => {
  const siglaRef = React.createRef<InputRef>();
  const startAtRef = React.createRef<InputRef>();
  const endAtRef = React.createRef<InputRef>();
  const valueRef = React.createRef<InputRef>();
  const descriptionRef = React.createRef<InputRef>();

  useEffect(() => {
    if (!client.color) {
      onChange({ color: "#ff0000" });
    }
  }, [client.color]);

  function goToInput(inputElement: RefObject<InputRef>) {
    if (inputElement.current && inputElement.current.input) {
      inputElement.current.input.focus();
    }
  }

  function confirmRemove() {
    if (!onRemove) return;
    Alert.alert(
      "Tem certeza que deseja excluir?",
      "Todos os eventos deste cliente serão excluidos",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => onRemove() }
      ]
    );
  }

  return (
    <>
      <Content>
        <Form style={{ padding: 15 }}>
          <View style={styles.inputGroup}>
            <InputMask
              styleView={{ width: "60%" }}
              label="Name"
              defaultValue={client.name}
              onChangeText={value => onChange({ name: value })}
              placeholder="Unidade Central"
              returnKeyType={"next"}
              onSubmitEditing={() => goToInput(siglaRef)}
            />
            <InputMask
              ref={siglaRef}
              styleView={{ width: "35%" }}
              label="Sigla"
              defaultValue={client.sigla}
              onChangeText={value => onChange({ sigla: value })}
              placeholder="UC"
              maxLength={6}
              returnKeyType={"next"}
              onSubmitEditing={() => goToInput(startAtRef)}
            />
          </View>
          <View style={styles.inputGroup}>
            <InputMask
              ref={startAtRef}
              styleView={styles.smallInput}
              label="Inicio"
              value={client.startAt}
              onChangeText={value => onChange({ startAt: value })}
              mask={"[00]{:}[00]"}
              placeholder="HH:mm"
              keyboardType="numeric"
              returnKeyType={"next"}
              onSubmitEditing={() => goToInput(endAtRef)}
            />
            <InputMask
              ref={endAtRef}
              styleView={styles.smallInput}
              label="Final"
              value={client.endAt}
              onChangeText={value => onChange({ endAt: value })}
              mask={"[00]{:}[00]"}
              placeholder="HH:mm"
              keyboardType="numeric"
              returnKeyType={"next"}
              onSubmitEditing={() => goToInput(valueRef)}
            />
          </View>
          <InputMask
            ref={valueRef}
            label="Valor (R$)"
            onChangeText={value => onChange({ value: Number(value) })}
            keyboardType="numeric"
            placeholder="150"
            defaultValue={String(client.value || "")}
            returnKeyType={"next"}
            onSubmitEditing={() => goToInput(descriptionRef)}
          />
          <InputMask
            ref={descriptionRef}
            label="Descrição"
            defaultValue={client.description}
            onChangeText={value => onChange({ description: value })}
            placeholder="Avenida Raul Barbosa 1004"
          />
          <Label
            style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
          >
            Selecione uma Cor
          </Label>
          <ColorPicker
            onColorChange={color => onChange({ color })}
            defaultColor="#ff0000"
          />
        </Form>
      </Content>
      {client.id && (
        <Fab
          position="bottomRight"
          style={styles.fabButton}
          onPress={() => confirmRemove()}
        >
          <Icon type="FontAwesome" name="trash" />
        </Fab>
      )}
    </>
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
  },
  fabButton: {
    backgroundColor: "#ff0000"
  }
});

export default ClientEdit;
