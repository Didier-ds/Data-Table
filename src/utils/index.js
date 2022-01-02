export const CENTSTODOLLARS = (value) => {
  // 1 cents = 0.01 dollars
  // const value = Math.round(+value * 0.01);
  const val = (Math.round(+value * 0.01) / 1).toFixed(2).replace(",", ".");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const checkPaymentStatus = (status) => {
  let any = "";
  console.log(status);
  switch (status) {
    case "paid":
      {
        any = "Paid";
      }
      break;
    case "unpaid":
      {
        any = "Dues";
      }
      break;
    case "overdue": {
      any = "overdue";
    }
  }
  return any;
};
