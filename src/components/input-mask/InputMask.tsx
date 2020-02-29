import React from "react";
import TextInputMask, {
  TextInputMaskProps
} from "react-native-text-input-mask";
import { Label, View } from "native-base";
import { StyleSheet } from "react-native";

interface IProps extends TextInputMaskProps {
  label: string;
  styleView?: any;
}

const InputMask = React.forwardRef(
  ({ label, styleView, ...inputProps }: IProps, ref) => (
    <View style={{ ...styles.inputMask, ...styleView }}>
      <Label style={styles.label}>{label}</Label>
      <TextInputMask {...inputProps} ref={ref as any} />
    </View>
  )
);

export default InputMask;

const styles = StyleSheet.create({
  inputMask: {
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderStyle: "solid"
  },
  label: {
    color: "#444",
    fontSize: 16,
    paddingLeft: 3
  }
});
