<script>
  // Extensions
  import View from '@/views/user/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Report',

    metaInfo: { title: 'Report' },

    extends: View,

    mixins: [
      LoadSections([
        'broadcast',
        'query-report',
        'modify-report',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'report',
      },
    },
  }
</script>
