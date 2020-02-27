import React from "react";
import { View, StyleSheet } from "react-native";
import {
  ColorPicker as ColorPickerWrapper,
  fromHsv,
  IHoloPicker
} from "react-native-color-picker";

interface IProps {
  onColorChange(color: string): void;
  style?: any;
}
const ColorPicker = ({ onColorChange, style = {} }: IProps) => {
  return (
    <View style={{ ...styles.colorPicker, ...style }}>
      <ColorPickerWrapper
        onColorChange={color => onColorChange(fromHsv(color))}
        style={{ flex: 1 }}
        hideSliders={true}
        {...{} as IHoloPicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  colorPicker: {
    flex: 1,
    zIndex: 9999,
    backgroundColor: "transparent",
    height: 150
  }
});

export default ColorPicker;
