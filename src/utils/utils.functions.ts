

export const numberToMoney = (value: number) => {
  return (value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}