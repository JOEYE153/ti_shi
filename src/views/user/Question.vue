<script>
  // Extensions
  import View from '@/views/user/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Question',

    metaInfo: { title: 'Question' },

    extends: View,

    mixins: [
      LoadSections([
        'query-question',
        'modify-question',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'question',
      },
    },
  }
</script>
