/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"

import MemberCard from "./member-card"

export default function TeamListHome(props) {
  const data = props.data
  const members = data.edges
    .map(edge => <MemberCard key={edge.node.id} data={edge.node} />)
  return <MemberMaker data={members} />
}

const MemberMaker = ({ data }) => (
  <section className="home-posts team-home-posts">
    <h2>
      <strong>Náš tým</strong>{" "}
    </h2>
    <div className="grids col-1 sm-2 lg-3">{data}</div>
    <Link
      className="button"
      to="/team"
      sx={{
        variant: "variants.button",
      }}
    >
      Všichni členové týmu
      <span className="icon -right">
        <RiArrowRightSLine />
      </span>
    </Link>
  </section>
)
