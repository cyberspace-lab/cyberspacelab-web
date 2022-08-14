/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"

import PublicationCard from "./publication-card"

export default function PublicationsListHome(props) {
  const data = props.data
  const posts = data.edges
    .map(edge => <PublicationCard key={edge.node.id} data={edge.node} />)
  return <PublicationsMaker data={posts} />
}

const PublicationsMaker = ({ data }) => (
  <section className="home-posts publications-home-posts">
    <h2>
      Vybrané <strong>Publikace</strong>{" "}
      <span className="icon -right">
        <RiArrowDownLine />
      </span>
    </h2>
    <div className="grids col-1 sm-1 lg-1 publication-grid">{data}</div>
    <Link
      className="button"
      to="/publications"
      sx={{
        variant: "variants.button",
      }}
    >
      Všechny publikace
      <span className="icon -right">
        <RiArrowRightSLine />
      </span>
    </Link>
  </section>
)
