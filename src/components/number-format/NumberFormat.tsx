import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { Text } from "native-base";

const NumberToMoney = (props: NumberFormatProps) => (
  <NumberFormat
    displayType={"text"}
    renderText={value => <Text>{value}</Text>}
    thousandSeparator={true}
    decimalScale={2}
    fixedDecimalScale={true}
    prefix={"R$"}
    {...props}
  />
);

export default NumberToMoney;
