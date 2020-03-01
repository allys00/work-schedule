import React from "react";
import { Modal as ModalWrapper, Alert, ModalProps } from "react-native";
import {
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  NativeBase
} from "native-base";
import Header from "../header/Header";

interface IProps extends ModalProps {
  title: string;
  iconRight?: NativeBase.Icon;
  onRightClick?(): void;
  onClose(): void;
  children?: Element;
}

const Modal = ({
  iconRight,
  children,
  title,
  onClose,
  onRightClick = () => {},
  ...modalProps
}: IProps) => (
  <ModalWrapper {...modalProps}>
    <Header
      iconLeft={{ name: "close" }}
      onLeftClick={onClose}
      title={title}
      onRightClick={onRightClick}
      iconRight={iconRight}
    />
    {children}
  </ModalWrapper>
);

export default Modal;
