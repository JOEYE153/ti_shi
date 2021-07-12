<template>
  <v-theme-provider dark>
    <base-section
      id="social"
      class="accent text-center"
      space="56"
    >
      <base-icon class="mb-8">
        mdi-atom
      </base-icon>

      <base-section-heading
        color="transparent"
        title="功能总览"
      >
      </base-section-heading>

      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            md="12"
          >
            <v-simple-table class="accent text-center">
              <thead>
                <tr>
                  <th />
                  <th class="body-1 font-weight-bold text-center">
                    What's in Alpha?
                  </th>
                  <th class="body-1 font-weight-bold text-center">
                    What's in Beta?
                  </th>
                </tr>
              </thead>
              <tbody class="body-1">
                <tr
                  v-for="([name, one, two], i) in features"
                  :key="i"
                >
                  <td v-text="name" />
                  <td class="text-center font-weight-bold">
                    <template v-if="typeof one === 'boolean'">
                      <v-icon :color="one ? 'success' : 'error'">
                        mdi-{{ one ? 'check' : '' }}
                      </v-icon>
                    </template>
                    <template v-else>
                      {{ one }}
                    </template>
                  </td>
                  <td class="text-center font-weight-bold">
                    <template v-if="typeof two === 'boolean'">
                      <v-icon :color="two ? 'success' : 'error'">
                        mdi-{{ two ? 'check' : '' }}
                      </v-icon>
                    </template>
                    <template v-else>
                      {{ two }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'Features',
    provide: {
      heading: { align: 'center' },
    },
    data: () => ({
      features: [
        ['顺序刷题', true, true],
        ['随机刷题', true, true],
        ['易错推荐', true, true],
        ['模拟考试', true, true],
        ['背题模式', true, true],
        ['题目收藏', true, true],
        ['错题收集', true, true],
        ['题目评论', true, true],
        ['题目关键词搜索', true, true],
        ['知识卡片', false, true],
        ['问答社区', false, true],
        ['资源社区', false, true],
        ['考期日历', false, true],
      ],
    }),
  }
</script>

<style scoped>

</style>
