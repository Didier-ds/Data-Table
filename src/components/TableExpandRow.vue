<template>
  <q-tr class="sub_row">
    <q-td colspan="100%">
      <div class="text-left">
        <q-table
          :rows="props.row.activities"
          :table-class="''"
          :columns="subColumn"
          row-key="date"
          flat
          no-data-label="No Records Found"
          no-results-label="No Records Found"
          :loading="loading"
        >
          <template v-slot:header="props">
            <q-tr :props="props" class="head">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="font-bold text-base uppercase text-primary"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <tr>
              <q-td key="date" :props="props">
                <p class="font- py-2 text-base">
                  {{ props.row.date }}
                </p>
              </q-td>
              <q-td key="userActivity" :props="props">
                <p class="font- py-2 text-base">
                  {{ props.row.userActivity }}
                </p>
              </q-td>
              <q-td key="detail" :props="props">
                <p class="font- py-2 text-base">
                  {{ props.row.details }}
                </p>
              </q-td>
            </tr>
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
    </q-td>
  </q-tr>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const prop = defineProps(["props", "subColumn"]);
</script>

<style lang="scss" scoped></style>
