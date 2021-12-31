export const sub_column = [
  {
    name: "date",
    required: true,
    label: "date",
    align: "left",
    headerStyle: "padding-left: 10.5em",
    style: "width: 100px; padding-left:10.5em; white-space:normal",
  },
  {
    name: "userActivity",
    required: true,
    label: "User Activity",
    align: "left",
    style: "width: 200px; padding-right:3em; white-space:normal",
  },
  {
    name: "detail",
    required: true,
    label: "Detail",
    align: "left",
    style: "width: 300px; padding-right:5em; white-space:normal",
  },
];

export const columns = [
  {
    name: "dropdown",
    required: true,
    label: "",
    align: "left",
  },
  {
    name: "firstName",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.firstName,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "userStatus",
    align: "left",
    label: "User Status",
    field: "userStatus",
    sortable: true,
  },
  {
    name: "paymentStatus",
    align: "left",
    label: "Payment Status",
    field: "paymentStatus",
    sortable: true,
  },
  {
    name: "amountInCents",
    align: "right",
    label: "Amount",
    field: "amountInCents",
  },
  { name: "more", align: "right", label: "", field: "" },
];
