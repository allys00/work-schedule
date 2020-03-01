import React from "react";
import {
  Header as HeaderWrapper,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  NativeBase
} from "native-base";

interface Props extends NativeBase.Header {
  iconLeft?: NativeBase.Icon;
  iconRight?: NativeBase.Icon;
  title?: string;
  onRightClick?(): void;
  onLeftClick?(): void;
}

export type IHeaderProps = Props;

const Header = ({
  iconLeft,
  iconRight,
  onRightClick,
  onLeftClick,
  title,
  ...headerProps
}: Props) => (
  <HeaderWrapper {...headerProps}>
    <Left>
      <Button onPress={onLeftClick} transparent>
        {iconLeft && <Icon {...iconLeft} />}
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
  </HeaderWrapper>
);

export default Header;
