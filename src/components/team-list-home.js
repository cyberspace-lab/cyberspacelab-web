/** @jsx jsx */
import { jsx } from "theme-ui"

import MemberCard from "./member-card"

export default function TeamListHome(props) {
  const data = props.data
  const members = data.edges
    .map(edge => <MemberCard key={edge.node.id} data={edge.node} />)
  return <MemberMaker data={members} />
}

const MemberMaker = ({ data }) => (
  <section class="team-section">
    <div class="auto-container">
      <div class="sec-title">
        <p>Sub Heading</p>
        <h2>Heading About Team</h2>
        <span class="separator"></span>
      </div>
      <div class="row clearfix">
        {data}
      </div>
    </div>
  </section>
)
