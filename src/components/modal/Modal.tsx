import React from "react";
import ModalWrapper, { ReactNativeModal, ModalProps } from "react-native-modal";

import {
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  NativeBase,
  View
} from "native-base";
import Header from "../header/Header";
import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

interface IProps {
  title?: string;
  iconRight?: NativeBase.Icon;
  onRightClick?(): void;
  onClose(): void;
  children: Element;
  isVisible: boolean;
}

const Modal = ({
  iconRight,
  children,
  title,
  onClose,
  isVisible,
  onRightClick = () => {}
}: IProps) => (
  <ModalWrapper
    animationIn="slideInUp"
    animationOut="slideOutDown"
    hideModalContentWhileAnimating={true}
    isVisible={isVisible}
    style={styles.modal}
    deviceWidth={deviceWidth}
    deviceHeight={deviceHeight}
    onBackButtonPress={onClose}
    onBackdropPress={onClose}
  >
    <Header
      iconLeft={{ name: "close" }}
      onLeftClick={onClose}
      title={title}
      onRightClick={onRightClick}
      iconRight={iconRight}
    />
    <View style={{ flex: 1 }}>{children}</View>
  </ModalWrapper>
);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    maxHeight: deviceHeight - 100,
    marginTop: 50
  }
});

export default Modal;
