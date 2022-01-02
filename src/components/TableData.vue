<template>
  <q-tr :props="props" class="font-medium text-lg">
    <q-td auto-width>
      <q-checkbox dense v-model="selected" />
    </q-td>
    <q-td key="dropdown">
      <button
        @click="toggleRow"
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
    <q-td :key="'firstName'">
      <p class="text-base">
        {{ props.row.firstName }} {{ props.row.lastName }}
      </p>
      <p class="text-base text-shallow">{{ props.row.email }}</p>
    </q-td>
    <q-td :key="'userStatus'" class="" :props="props">
      <Status :status="props.row.userStatus" :type="userStatus" />
      <p class="text-shallow">Last login: {{ props.row.lastLogin }}</p>
    </q-td>
    <q-td :key="'paymentStatus'" :props="props">
      <div>
        <Status :status="props.row.paymentStatus" :type="paymentStatus" />
        <p class="text-gray-800">
          {{ checkPaymentStatus(props.row.paymentStatus) }} on
          {{ props.row.paidOn }}
        </p>
      </div>
    </q-td>
    <q-td :key="'amountInCents'" :props="props">
      <div>
        <p class="font-medium text-base">
          ${{ CENTSTODOLLARS(props.row.amountInCents) }}
        </p>
        <p class="text-gray-400">USD</p>
      </div>
    </q-td>
    <q-td key="more" :props="props">
      <p class="text-shallow">View more</p>
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

      <q-menu
        class="rounded transform relative -translate-y-10 -translate-x-36 shadow-lg border"
        style="overflow: inherit"
      >
        <div class="absolute -right-4 -top-4 transform">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_248_0)">
              <circle cx="12" cy="12" r="10" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.2102 8.7736C14.9148 8.47749 14.4715 8.47749 14.1761 8.7736L12.0093 10.9451L9.84244 8.7736C9.54696 8.47749 9.10375 8.47749 8.80828 8.7736C8.5128 9.06971 8.5128 9.51388 8.80828 9.81L10.9751 11.9815L8.80828 14.153C8.5128 14.4491 8.5128 14.8933 8.80828 15.1894C8.95601 15.3374 9.153 15.3868 9.34998 15.3868C9.54696 15.3868 9.74395 15.3374 9.89168 15.1894L12.0585 13.0179L14.2253 15.1894C14.3731 15.3374 14.57 15.3868 14.767 15.3868C14.964 15.3868 15.161 15.3374 15.3087 15.1894C15.6042 14.8933 15.6042 14.4491 15.3087 14.153L13.1419 11.9815L15.3087 9.81C15.5057 9.51388 15.5057 9.06971 15.2102 8.7736Z"
                fill="#8B83BA"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_248_0"
                x="0"
                y="0"
                width="24"
                height="24"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_248_0"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_248_0"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <q-list style="min-width: 180px; padding: 0.5em">
          <div
            class="p-1 cursor-default rounded text-base hover:bg-gray-200 text-gray-900"
          >
            Edit
          </div>
          <div
            class="p-1 cursor-default rounded text-base hover:bg-gray-200 text-gray-900"
          >
            View Profile
          </div>
          <div
            class="p-1 cursor-default rounded text-base hover:bg-gray-200 text-green-900"
          >
            Activate User
          </div>
          <hr class="my-2 mx-auto" />
          <div
            class="p-1 cursor-default rounded text-base hover:bg-gray-200 text-red-500"
          >
            Delete
          </div>
        </q-list>
      </q-menu>
    </q-td>
  </q-tr>
</template>

<script setup></script>

<style lang="scss" scoped></style>
