<script>
  // Extensions
  import View from '@/views/user/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Resource',

    metaInfo: { title: 'Resource' },

    extends: View,

    mixins: [
      LoadSections([
        'query-resource',
        'modify-resource',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'resource',
      },
    },
  }
</script>
