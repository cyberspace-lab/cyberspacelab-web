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
  <section class="team-home-section">
    <div class="auto-container">
      <div class="sec-title">
        <p>Who are we?</p>
        <h2>Lab members</h2>
        <span class="separator"></span>
      </div>
      <div class="row clearfix team-home-members-container">
        {data}
      </div>
    </div>
  </section>
)
