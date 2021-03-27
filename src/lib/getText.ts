const translations = {
  column: "Column",
  value: "Value",
  buy: "Buy",
  sell: "Sell",
  sellAll: "Sell all",
  dividend: "Dividend",
  split: "Split",
  name: "Name",
  shares: "Shares",
  date: "Date",
  currency: "Currency",
  price: "Price",
  comission: "Comission",
  selectColumn: "Select column",
  selectValue: "Select value"
}

export default (key: keyof typeof translations) => translations[key]
