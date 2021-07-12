<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card
        title="关于我们"
        pace="6"
      >
        身手不凡的六位共同赋予软件的价值和意义
      </base-info-card>

      <base-business-contact dense />
    </div>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseBusinessInfo',

    props: { dark: Boolean },
  }
</script>
