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
  onRightClick?(): void;
  children?: Element;
  onClose(): void;
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
        <Button onPress={onRightClick} transparent>
          {iconRight && <Icon {...iconRight} />}
        </Button>
      </Right>
    </Header>
    {children}
  </ModalWrapper>
);

export default Modal;
