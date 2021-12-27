<template>
  <q-badge
    class="flex items-center gap-1 px-2 py-1 justify-center text-tiny capitalize font-semibold"
    rounded
    :class="status"
  >
    <div>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="3" fill="#4A4AFF" />
      </svg>
    </div>
    <p>{{ status }}</p>
  </q-badge>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  status: {
    type: String,
    default: "status",
  },
  type: {
    type: String,
    default: "none",
  },
});
</script>

<style lang="scss" scoped>
.paid {
  background: #cdffcd;
  color: #007f00;
  svg circle {
    fill: #007f00;
  }
}
.unpaid {
  background: #ffeccc;
  color: #965e00;
  svg circle {
    fill: #965e00;
  }
}
.overdue {
  background: #ffe0e0;
  color: #d30000;
  svg circle {
    fill: #d30000;
  }
}
.inactive {
  background: #f2f0f9;
  color: #6e6893;
  svg circle {
    fill: #6e6893;
  }
}
.active {
  background: #e6e6f2;
  color: #4a4aff;
  svg circle {
    fill: #4a4aff;
  }
}
</style>
