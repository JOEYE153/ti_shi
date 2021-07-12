<template>
  <base-section>
    <base-section-heading title="产品简介">
      一款集刷题、题目讨论、错题整理、社区资料分享等功能为一体的优质软件
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          cols="12"
          md="6"
        >
          <base-avatar-card
            v-bind="feature"
            align="left"
            horizontal
          >
          </base-avatar-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'Introduction',
    data: () => ({
      features: [
        {
          color: 'primary',
          dark: true,
          title: '支持多种模式下的题目练习',
          text: '直接浏览题目答案、题目解析，快速过题的快速做题模式；顺序，乱序，分章节，智能推荐，模拟考试等多种方式的刷题模式。以更为便捷的方式给予用户丰富且有效的刷题复习体验。',
          icon: 'mdi-emoticon-cool',
        },
        {
          color: 'primary',
          dark: true,
          title: '支持丰富的题目管理功能',
          text: '题目收藏功能，错题整理功能，关键字搜索功能，题目笔记功能。用户通过该软件，对题目进行更个性化的管理。',
          icon: 'mdi-emoticon-excited',
        },
        {
          color: 'primary',
          dark: true,
          title: '拥有活跃的用户社区',
          text: '资源共享社区、问答社区，并支持题目评论功能、笔记分享功能。用户可以在社区中探索或分享学习资源。',
          icon: 'mdi-emoticon',
        },
        {
          color: 'primary',
          dark: true,
          title: '具有贴心小功能',
          text: '设置相关科目的考试信息，如考试时间和注意事项等。避免用户遗漏关键信息。',
          icon: 'mdi-emoticon-kiss',
        },
      ],
    }),
  }
</script>

<style scoped>

</style>
