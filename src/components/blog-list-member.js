/** @jsx jsx */
import { jsx } from "theme-ui"

import PostCard from "./post-card"

export default function BlogListMember(props) {
  const data = props.data
  const posts = data.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
  return <PostMaker data={posts} />
}

const PostMaker = ({ data }) => (
  <div class="lower-box">
    <h3>Projects</h3>
    <div class="row clearfix blog-list-member">
      {data}
    </div>
  </div>
)
