<template>
  <div class="max-w-5xl mx-auto my-8">
    <p class="uppercase font-semibold text-primary">Table Heading</p>
    <div
      class="flex justify-between my-2 border-b border-gray-300 items-center"
    >
      <ul class="flex gap-4">
        <li
          class="p-2 font-medium text-primary text-center cursor-default tab_list active"
        >
          All
        </li>
        <li
          class="p-2 font-medium text-primary text-center cursor-default tab_list"
        >
          Unpaid
        </li>
        <li
          class="p-2 font-medium text-primary text-center cursor-default tab_list"
        >
          Paid
        </li>
        <li
          class="p-2 font-medium text-primary text-center cursor-default tab_list"
        >
          Overdue
        </li>
      </ul>
      <div>
        <p class="text-primary">
          Total payable amount:
          <span class="font-bold text-lg">$900.00 USD</span>
        </p>
      </div>
    </div>
    <div class="border shadow-lg rounded-lg overflow-hidden">
      <q-table
        title="Treats"
        :rows="rows"
        :table-class="''"
        selection="multiple"
        :selected-rows-label="getSelectedString"
        :columns="columns"
        row-key="name"
        flat
        :loading="loading"
        v-model:selected="selected"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-checkbox dense v-model="props.selected" />
            </q-td>
            <q-td key="name">
              {{ props.row.name }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge color="green">
                {{ props.row.status }}
              </q-badge>
            </q-td>
            <q-td key="payment_status" :props="props">
              <q-badge color="purple">
                {{ props.row.payment_status }}
              </q-badge>
            </q-td>
            <q-td key="amount" :props="props">
              <q-badge color="orange">
                {{ props.row.amount }}
              </q-badge>
            </q-td>
            <q-td key="protein" :props="props">
              <q-badge color="primary">
                {{ props.row.protein }}
              </q-badge>
            </q-td>
            <q-td key="sodium" :props="props">
              <q-badge color="teal">
                {{ props.row.sodium }}
              </q-badge>
            </q-td>
            <q-td key="calcium" :props="props">
              <q-badge color="accent">
                {{ props.row.calcium }}
              </q-badge>
            </q-td>
            <q-td key="iron" :props="props">
              <q-badge color="amber">
                {{ props.row.iron }}
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;800&display=swap");
* {
  font-family: "Inter", sans-serif;
}
body {
  background: #e5e5e5;
}
.tab_list.active {
  border-bottom: 2px solid #25213b;
  color: #25213b !important;
}
</style>

<script setup>
import { ref } from "vue";
const selected = ref([]);
const loading = ref(false);
function getSelectedString() {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${rows.length}`;
}
const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "User Status",
    field: "status",
    sortable: true,
  },
  {
    name: "payment_status",
    label: "Payment Status (g)",
    field: "payment_status",
    sortable: true,
  },
  { name: "amount", label: "Amount", field: "amount" },
];

const rows = [
  {
    name: "Frozen Yogurt",
    status: 159,
    payment_status: 6.0,
    amount: 24,
  },
];
</script>
