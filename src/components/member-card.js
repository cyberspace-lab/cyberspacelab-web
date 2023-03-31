/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const MemberCard = ({ data }) => (
    <div class="col-lg-3 col-md-6 col-sm-12 team-block">
        <a href={data.frontmatter.slug}>
        <div class="team-block-one wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div class="inner-box">
                <div class="image-box">
                    <figure class="image">
                        {data.frontmatter.featuredImage ? (
                            <GatsbyImage image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData} alt={data.frontmatter.title + " - Featured image"} className="featured-image" />
                        ) : (
                            <img src="assets/images/team/team-6.jpg" alt="" />
                        )}
                    </figure>
                    <ul class="social-links clearfix">
                        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                    </ul>
                    <div class="link"><a href={data.frontmatter.slug}><i class="fas fa-link"></i></a></div>
                </div>
                <div class="lower-content">
                    <h3>{data.frontmatter.title}</h3>
                    <span class="designation">{data.frontmatter.description}</span>
                </div>
            </div>
        </div>
        </a>
    </div>

)

export default MemberCard
