/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const PostCard = ({ data }) => (
  <Link to={data.frontmatter.slug}>
    <div class="project-block">
      <div class="project-block-one wow fadeInUp" data-wow-delay="300ms"data-wow-duration="1500ms">
        <div class="inner-box">
          <div class="line-one"></div>
          <div class="line-two"></div>
          <figure class="image-box">
            {data.frontmatter.featuredImage ? (
                <GatsbyImage image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData} alt= {data.frontmatter.title + " - Featured image"} className="featured-image" />
              ) : (
                <img src="assets/images/news/news-7.jpg" alt=""/>
              )}
          </figure>
          <div class="content-box" id="cstm">
            <h3>{data.frontmatter.shortname}</h3>
          </div>
					<div class="lower-content" id="cstm1">
            <span class="project-details">{data.frontmatter.description}</span>
          </div>
        </div>
      </div>
    </div>
  
  </Link>
)

export default PostCard
