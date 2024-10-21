import { AccountInterface } from "@/interface";

export const formatCurrencyUI = (amount: Number, currency: string | undefined = 'USD') => {
  const formatter = Intl.NumberFormat('en-us', {
    currency: currency,
    style: 'currency',
    minimumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol'
  })
  const newAmount = Number(amount) / 100;
  return formatter.format(newAmount);
};

export const formatCurrencyDB = (amount: Number) =>{
  const formattedBalance = Number(amount) * 100
  return formattedBalance;
}

export const sumAmount = (amount: AccountInterface[]) => {
  const sum = amount.reduce(
    (accumulator, amount) => accumulator + Number(amount.balance),
    0
  );
  console.log(sum);
  return sum.toString();
};
