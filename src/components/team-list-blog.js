/** @jsx jsx */
import { jsx } from "theme-ui"

import MemberCard from "./member-card"

export default function TeamListBlog(props) {
  const data = props.data
  const members = data.edges
    .map(edge => <MemberCard key={edge.node.id} data={edge.node} />)
  return <MemberMaker data={members} />
}

const MemberMaker = ({ data }) => (
  <div class="row clearfix team-list-blog">
    {data}
  </div>
)
