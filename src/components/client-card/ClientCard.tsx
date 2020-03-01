import React from "react";
import { Left, View, Body, Text, Right } from "native-base";
import NumberToMoney from "../number-format/NumberFormat";
import { IClient } from "../../models/Client.model";
import { StyleSheet } from "react-native";

const ClientCard = ({ color, name, startAt, endAt, value }: Partial<IClient>) => (
  <>
    <Left>
      <View
        style={{
          ...style.avatar,
          backgroundColor: color
        }}
      />
    </Left>
    <Body>
      <Text>{name}</Text>
      <Text note>{`${startAt} ás ${endAt}`}</Text>
    </Body>
    {value && (
      <Right>
        <NumberToMoney value={value} />
      </Right>
    )}
  </>
);

const style = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden"
  }
});

export default ClientCard;
