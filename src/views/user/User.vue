<script>
  // Extensions
  import View from '@/views/user/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'User',

    metaInfo: { title: 'User' },

    extends: View,

    mixins: [
      LoadSections([
        'user',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'user',
      },
    },
  }
</script>
