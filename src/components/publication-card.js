/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const PublicationCard = ({ data }) => (
  <div class="upper-box">  
    <h4>{data.frontmatter.category}</h4>
    <h3>{data.frontmatter.title}</h3>
    <p>{data.frontmatter.authors}, <i>{data.frontmatter.journal}</i> ({data.frontmatter.date}), <Link to={data.frontmatter.url}>Link</Link></p>
	</div>
)

export default PublicationCard
