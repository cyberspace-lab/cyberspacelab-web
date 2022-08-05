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
  <section className="home-posts">
    <h2>
      Latest in <strong>Blog</strong>{" "}
      <span className="icon -right">
        <RiArrowDownLine />
      </span>
    </h2>
    <div className="grids col-1 sm-2 lg-3">{data}</div>
    <Link
      className="button"
      to="/team"
      sx={{
        variant: "variants.button",
      }}
    >
      See more
      <span className="icon -right">
        <RiArrowRightSLine />
      </span>
    </Link>
  </section>
)
