import React from "react";
import { Modal as ModalWrapper, Alert, ModalProps } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  NativeBase
} from "native-base";

interface IProps extends ModalProps {
  title: string;
  iconRight?: NativeBase.Icon;
  children?: Element;
  onClose(): void;
}

const Modal = ({
  iconRight,
  children,
  title,
  onClose,
  ...modalProps
}: IProps) => (
  <ModalWrapper {...modalProps}>
    <Header>
      <Left>
        <Button transparent onPress={onClose}>
          <Icon name="close" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>

      <Right>
        <Button transparent>{iconRight && <Icon {...iconRight} />}</Button>
      </Right>
    </Header>
    {children}
  </ModalWrapper>
);

export default Modal;
