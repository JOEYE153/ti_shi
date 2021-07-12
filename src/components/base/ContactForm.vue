<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />
    <base-text-field label="您的邮箱" />

    <base-textarea
      label="您的反馈"
    />

    <base-btn
      :color="!theme.isDark ? 'accent' : 'white'"
      href="mailto:504664879@qq.com"
      outlined
      target="_blank"
    >
      反馈
    </base-btn>
  </div>
</template>

<script>
  export default {
    name: 'BaseContactForm',

    // Injected from the Vuetify Themeable mixin
    inject: ['theme'],

    props: {
      subtitle: String,
      title: {
        type: String,
        default: 'MAIL US YOUR MESSAGE',
      },
    },
  }
</script>
