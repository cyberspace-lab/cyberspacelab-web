/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const MemberCard = ({ data }) => (
  <article
    className="member-card"
  >
    {data.frontmatter.featuredImage ? (
      <Link to={data.frontmatter.slug}>
        <GatsbyImage
          image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
          alt={data.frontmatter.title + " - Featured image"}
          className="featured-image"
        />
      </Link>
    ) : (
      ""
    )}
    <div className="member-card-content">
      <h2 className="title">
        <Link
          to={data.frontmatter.slug}
        >
          {data.frontmatter.title}
        </Link>
      </h2>
      <p
        className="meta"
      >
        {data.frontmatter.description}
      </p>
    </div>
  </article>
)

export default MemberCard
