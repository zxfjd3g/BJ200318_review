<script>
export default {
  name: 'FC',
  functional: true,

  props: ['title', 'imgUrl'],

  render: (h, context) => {
    const {title, imgUrl} = context.props
    const vNodes = []
    if (title) {
      vNodes.push(<h2>{title}</h2>)
    }
    if (imgUrl) {
      vNodes.push(<img src={imgUrl} />)
    }

    return vNodes
  }
}
</script>

