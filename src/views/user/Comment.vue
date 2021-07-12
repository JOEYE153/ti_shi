<script>
  // Extensions
  import View from '@/views/user/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Comment',

    metaInfo: { title: 'Comment' },

    extends: View,

    mixins: [
      LoadSections([
        'query-question-comment',
        'query-question-comment-reply',
        'query-post',
        'query-post-comment',
        'modify-comment',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'comment',
      },
    },
  }
</script>
