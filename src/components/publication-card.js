/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const PublicationCard = ({ data }) => (
  <div class="upper-box">  
    <h3>{data.frontmatter.title}</h3>
    <p>{data.frontmatter.authors}</p>
	</div>
)

export default PublicationCard
