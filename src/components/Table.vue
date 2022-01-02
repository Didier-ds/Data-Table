<template>
  <div class="w-10/12 mx-auto my-8">
    <p class="uppercase font-semibold text-base tracking-wide text-primary">
      Table Heading
    </p>
    <div
      class="flex justify-between my-2 mb-4 border-b border-gray-300 items-center"
    >
      <ul class="flex gap-4">
        <li
          @click="filterData('all')"
          class="p-2 font-medium text-primary text-center text-base cursor-default tab_list"
          :class="tab === 'all' ? 'active' : ''"
        >
          All
        </li>
        <li
          @click="filterData('unpaid')"
          class="p-2 font-medium text-primary text-center text-base cursor-default tab_list"
          :class="tab === 'unpaid' ? 'active' : ''"
        >
          Unpaid
        </li>
        <li
          @click="filterData('paid')"
          class="p-2 font-medium text-primary text-center text-base cursor-default tab_list"
          :class="tab === 'paid' ? 'active' : ''"
        >
          Paid
        </li>
        <li
          @click="filterData('overdue')"
          class="p-2 font-medium text-primary text-center text-base cursor-default tab_list"
          :class="tab === 'overdue' ? 'active' : ''"
        >
          Overdue
        </li>
      </ul>
      <div>
        <p class="text-primary text-base">
          Total payable amount:
          <span class="font-extrabold text-secondary text-xl"
            >${{ CENTSTODOLLARS(total) }}</span
          >
          <span class="pl-1 text-lg">USD</span>
        </p>
      </div>
    </div>

    <div class="border shadow-lg rounded-lg overflow-hidden">
      <q-table
        :rows="filteredResults"
        :table-class="''"
        selection="single"
        :selected-rows-label="getSelectedString"
        :columns="columns"
        row-key="email"
        flat
        :loading="loading"
        color="primary"
        no-data-label="No Records Found"
        no-results-label="No Records Found"
        :pagination="pagination"
        :rows-per-page-label="'Rows Per Page'"
        v-model:selected="selected"
      >
        <template v-slot:top>
          <div color="primary" label="Basic Menu">
            <button
              class="border p-2 px-3 border-gray-300 flex items-center text-lg rounded-md mr-4 capitalize"
              flat
            >
              <div class="pr-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z"
                    fill="#8B83BA"
                  />
                </svg>
              </div>
              <p>Filter</p>
            </button>
            <q-menu class="rounded transform shadow-lg translate-y-2 border">
              <p class="uppercase text-xs px-4 mt-4">Sort By:</p>

              <q-list
                style="min-width: 200px; font-size: 0.8em; padding: 1em 0.5em"
              >
                <div
                  v-for="(category, index) in categories"
                  :key="index"
                  @click="filterData('sortby' + category[1])"
                  class="flex justify-between hover:bg-gray-200 text-gray-900 rounded items-center"
                  clickable
                  v-close-popup
                  v-ripple
                >
                  <label
                    :for="'userState' + index"
                    class="flex-1 p-2 text-sm"
                    >{{ category[0] }}</label
                  >
                  <RadioButton
                    :id="'userState' + index"
                    name="userState"
                    :value="category[0]"
                    v-model="sortBy"
                    class="m-2"
                  />
                </div>

                <q-separator class="my-2" />

                <div
                  v-for="(category, index) in userByStatus"
                  :key="index"
                  @click="filterData('sortby' + category)"
                  class="flex justify-between hover:bg-gray-200 text-gray-900 rounded items-center"
                  clickable
                  v-close-popup
                  v-ripple
                >
                  <label
                    :for="'userStatus' + index"
                    class="flex-1 p-2 text-sm"
                    >{{ category }}</label
                  >
                  <RadioButton
                    :id="'userStatus' + index"
                    name="userStatus"
                    :value="category"
                    v-model="usersSort"
                    class="m-2"
                  />
                </div>
              </q-list>
            </q-menu>
          </div>
          <label class="relative block flex-1">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="h-5 w-5 fill-gray-300" viewBox="0 0 20 20">
                <path
                  d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.403 2.07881 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.302 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.659 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z"
                  fill="#8B83BA"
                />
              </svg>
            </span>
            <input
              class="placeholder:text-primary text-primary block w-full border border-white rounded-md py-3 pl-10 pr-3 focus:outline-none hover:border-primary focus:border-primary sm:text-sm"
              placeholder="Search Users by Name, Email or Date"
              type="text"
              @input="performSearch"
              name="search"
              v-model="search"
            />
          </label>

          <!-- <q-input outlined v-model="text" :dense="dense" /> -->
          <!-- <template v-slot:prepend>
              
            </template>
          </q-input> -->
          <q-space />
          <button
            @click="payDues"
            class="p-2 px-3 uppercase bg-secondary text-white font-medium text-lg rounded"
          >
            Pay Dues
          </button>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props" class="head">
            <q-th auto-width>
              <q-checkbox dense v-model="props.selected" />
            </q-th>
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="font-bold text-base uppercase text-primary"
            >
              {{ col.label }}
            </q-th>

            <q-th class="p-2">
              <svg
                class="mx-auto"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99283 7.80488C11.1833 7.80488 12.1357 8.78049 12.1357 10C12.1357 11.2195 11.1833 12.1951 9.99283 12.1951C8.80236 12.1951 7.84998 11.2195 7.84998 10C7.84998 8.78049 8.80236 7.80488 9.99283 7.80488ZM7.84998 2.19512C7.84998 3.41463 8.80236 4.39024 9.99283 4.39024C11.1833 4.39024 12.1357 3.41463 12.1357 2.19512C12.1357 0.97561 11.1833 0 9.99283 0C8.80236 0 7.84998 0.97561 7.84998 2.19512ZM7.84998 17.8049C7.84998 19.0244 8.80236 20 9.99283 20C11.1833 20 12.1357 19.0244 12.1357 17.8049C12.1357 16.5854 11.1833 15.6098 9.99283 15.6098C8.80236 15.6098 7.84998 16.5854 7.84998 17.8049Z"
                  fill="#8B83BA"
                />
              </svg>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" class="font-medium text-lg">
            <q-td auto-width>
              <q-checkbox dense v-model="props.selected" color="secondary" />
            </q-td>
            <q-td key="dropdown">
              <button
                @click="props.expand = !props.expand"
                class="transition fade-in-out delay-150"
                :class="props.expand ? 'active' : ''"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.97895 9.85263C7.24737 10.1211 7.73684 10.1211 8.00526 9.85263L10.8474 7.01053C11.1316 6.72632 11.1316 6.26842 10.8474 5.98421C10.5632 5.7 10.1053 5.7 9.82105 5.98421L7.5 8.30526L5.17895 5.98421C5.03684 5.84211 4.84737 5.76316 4.65789 5.76316C4.46842 5.76316 4.27895 5.84211 4.13684 5.98421C3.85263 6.26842 3.85263 6.72632 4.13684 7.01053L6.97895 9.85263Z"
                    fill="#8B83BA"
                  />
                  <path
                    d="M7.5 15C11.6368 15 15 11.6368 15 7.5C15 3.36316 11.6368 0 7.5 0C3.36316 0 0 3.36316 0 7.5C0 11.6368 3.36316 15 7.5 15ZM7.5 1.45263C10.8316 1.45263 13.5474 4.16842 13.5474 7.5C13.5474 10.8316 10.8316 13.5474 7.5 13.5474C4.16842 13.5474 1.45263 10.8316 1.45263 7.5C1.45263 4.16842 4.16842 1.45263 7.5 1.45263Z"
                    fill="#8B83BA"
                  />
                </svg>
              </button>
            </q-td>
            <q-td :key="'firstName'" @click="props.expand = !props.expand">
              <p class="text-base">
                {{ props.row.firstName }} {{ props.row.lastName }}
              </p>
              <p class="text-base text-shallow">{{ props.row.email }}</p>
            </q-td>
            <q-td
              :key="'userStatus'"
              class=""
              :props="props"
              @click="props.expand = !props.expand"
            >
              <Status :status="props.row.userStatus" :type="userStatus" />
              <p class="text-shallow">
                Last login: {{ props.row.lastLogin }} {{ props.row.id }}
              </p>
            </q-td>
            <q-td
              :key="'paymentStatus'"
              :props="props"
              @click="props.expand = !props.expand"
            >
              <div>
                <Status
                  :status="props.row.paymentStatus"
                  :type="paymentStatus"
                />
                <p class="text-gray-800">
                  {{ checkPaymentStatus(props.row.paymentStatus) }} on
                  {{ props.row.paidOn }}
                </p>
              </div>
            </q-td>
            <q-td
              :key="'amountInCents'"
              :props="props"
              @click="props.expand = !props.expand"
            >
              <div>
                <p class="font-medium text-base">
                  ${{ CENTSTODOLLARS(props.row.amountInCents) }}
                </p>
                <p class="text-gray-400">USD</p>
              </div>
            </q-td>
            <q-td key="more" :props="props">
              <p
                class="text-shallow inline p-2 rounded hover:bg-gray-200 cursor-default"
              >
                View more
              </p>
            </q-td>
            <q-td class="p-2">
              <svg
                class="mx-auto"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99283 7.80488C11.1833 7.80488 12.1357 8.78049 12.1357 10C12.1357 11.2195 11.1833 12.1951 9.99283 12.1951C8.80236 12.1951 7.84998 11.2195 7.84998 10C7.84998 8.78049 8.80236 7.80488 9.99283 7.80488ZM7.84998 2.19512C7.84998 3.41463 8.80236 4.39024 9.99283 4.39024C11.1833 4.39024 12.1357 3.41463 12.1357 2.19512C12.1357 0.97561 11.1833 0 9.99283 0C8.80236 0 7.84998 0.97561 7.84998 2.19512ZM7.84998 17.8049C7.84998 19.0244 8.80236 20 9.99283 20C11.1833 20 12.1357 19.0244 12.1357 17.8049C12.1357 16.5854 11.1833 15.6098 9.99283 15.6098C8.80236 15.6098 7.84998 16.5854 7.84998 17.8049Z"
                  fill="#8B83BA"
                />
              </svg>
            </q-td>
          </q-tr>
          <transition
            enter-active-class="duration-500 ease-out"
            enter-class="translate-x-full opacity-0"
            enter-to-class="translate-x-0 opacity-100"
            leave-active-class="duration-500 ease-in"
            leave-class="translate-x-0 opacity-100"
            leave-to-class="translate-x-full opacity-0"
          >
            <table-expand-row
              :props="props"
              v-show="props.expand"
              :subColumn="sub_column"
            ></table-expand-row>
          </transition>
        </template>
        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <p class="text-xl font-medium text-primary uppercase my-8">
              {{ message }}
            </p>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap");
* {
  font-family: "Inter", sans-serif;
  transition: 0.2s ease-in-out;
}
body {
  background: #e5e5e5;
  color: #6e6893;
}
input {
  background: #f4f2ff;
}
.tab_list.active {
  border-bottom: 2px solid #25213b;
  color: #25213b !important;
}
button.active {
  transform: rotate(180deg);
}
.sub_row {
  background: #f4f2ff;
  table-layout: fixed;
  .q-table tr {
    background: #f4f2ff;
  }
  .q-td {
    padding: 0;
  }
}
.q-table .head {
  background: #f4f2ff;
  th {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;

    line-height: 15px;
    /* identical to box height */

    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
}
tr.q-tr.selected {
  position: relative;
}
tr.q-tr.selected td:first-child::before {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  width: 5px;
  background: #6d5bd0;
}
.q-table__bottom {
  background: #f4f2ff;
  span.q-table__bottom-item {
    margin-left: 2em;
  }
  .q-table__bottom-item {
    font-weight: 600;
    color: #6d5bd0;
    font-size: 1.2em;
  }
  .q-table__control {
    .q-btn {
      margin-left: 3em;
    }
    .q-field__native span {
      font-weight: 600;
      color: #6d5bd0;
    }
    .q-btn .q-icon {
      font-size: 1.5em;
      color: #6d5bd0;
    }
  }
}
</style>

<script setup>
// import axios from 'axios'
import { ref, computed, onMounted } from "vue";
// import { useQuasar } from "quasar";
import Status from "./Status.vue";
import TableExpandRow from "./TableExpandRow.vue";
// import NoRecord from './NoRecord.vue'
import { columns } from "../utils/data.js";
import { CENTSTODOLLARS, checkPaymentStatus } from "../utils";
import { useStore } from "vuex";
const selected = ref([]);
const loading = ref(false);
// const $q = useQuasar();
const pagination = ref({
  rowsPerPage: 10,
  // rowsNumber: xx if getting data from a server
});
const store = useStore();
const users = computed(() => store.getters["allUsers"]);

// function to mark user as paid
const payDues = () => {
  loading.value = true;
  store
    .dispatch("MARKASPAID", selected.value[0].id)
    .then((data) => {
      loading.value = false;
      selected.value = [];
      filteredResults.value.splice(data[1], 1, data[0]);
    })
    .catch(() => (loading.value = false));
};

// function to get selected rows
function getSelectedString() {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${filteredResults.value.length}`;
}

const tab = ref("all");

// function to return total unpaid/overdue amount
const total = computed(() => {
  const newArr = users.value.filter(
    (obj) => obj.paymentStatus === ("unpaid" || "overdue")
  );
  return newArr.reduce(function (a, b) {
    return a + +b.amountInCents;
  }, 0);
});

//function to filter data
const filterData = (any) => {
  switch (any) {
    case "all":
      {
        filteredResults.value = users.value;
        tab.value = "all";
      }
      break;
    case "unpaid":
      {
        filteredResults.value = users.value.filter(
          (obj) => obj.paymentStatus === "unpaid"
        );
        tab.value = "unpaid";
      }
      break;
    case "paid":
      {
        filteredResults.value = users.value.filter(
          (obj) => obj.paymentStatus === "paid"
        );
        tab.value = "paid";
      }
      break;
    case "overdue":
      {
        filteredResults.value = users.value.filter(
          (obj) => obj.paymentStatus === "overdue"
        );
        tab.value = "overdue";
      }
      break;
    case "sortbyActive":
      {
        filteredResults.value = users.value.filter(
          (obj) => obj.userStatus === "active"
        );
        usersSort.value = "Active";
      }
      break;
    case "sortbyInactive":
      {
        filteredResults.value = users.value.filter(
          (obj) => obj.userStatus === "inactive"
        );
        usersSort.value = "Inactive";
      }
      break;
    case "sortbyAll":
      {
        filteredResults.value = users.value;
      }
      break;
    case "sortbyfirstname":
      {
        filteredResults.value = compare(filteredResults.value, "firstName");
      }
      break;
    case "sortbyemail":
      {
        filteredResults.value = compare(filteredResults.value, "email");
      }
      break;
    case "sortbylastname":
      {
        filteredResults.value = compare(filteredResults.value, "lastName");
      }
      break;
  }
};
const filteredResults = ref(users.value);

//function to sort datas
const compare = (arr, key) => {
  return arr.sort((a, b) => {
    if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
    if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
    return 0;
  });
};
// const search = ref('')
const fetchUsers = () => {
  loading.value = true;
  store
    .dispatch("GETALLUSERS")
    .then(() => {
      filterData("all");
      loading.value = false;
    })
    .catch(() => (loading.value = false));
};
const search = ref("");

//search function
const performSearch = () => {
  filteredResults.value = users.value.filter((obj) => {
    return JSON.stringify(obj).toString().toLowerCase().includes(search.value);
  });
};

const sub_column = [
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

const sortBy = ref("Default");
const usersSort = ref("All");

// watch(sortBy, (currentValue) => {

// })

onMounted(() => {
  fetchUsers();
});
const categories = [
  ["Default", "default"],
  ["First Name", "firstname"],
  ["Last Name", "lastname"],
  ["Email", "email"],
];
const userByStatus = ["All", "Active", "Inactive"];
</script>
