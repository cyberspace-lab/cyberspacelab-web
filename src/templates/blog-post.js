/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Post = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""

  return (
    <Layout className="page">
      <Seo
        title={frontmatter.title}
        description={
          frontmatter.description ? frontmatter.description : excerpt
        }
        image={Image}
        article={true}
      />
    <section class="page-title" >
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-8 col-md-12 col-sm-12 content-column" id="cstmmobiletitle">
                    <div class="content-box clearfix">
                        <div class="title pull-left">
                            <h1>{frontmatter.slug}</h1>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="blog-details sidebar-page-container">
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-8 col-md-12 col-sm-12 content-side">
                    <div class="blog-details-content">
                        <div class="news-block-three">
                            <div class="inner-box">
                                <figure class="image-box" id="cstm2">
                                  {Image != "" ? (
                                    <GatsbyImage image={Image} alt=    {frontmatter.title + " - Featured image"}       className="featured-image" />
                                  ) : (
                                    <img src="assets/images/news/news-7.jpg" alt=""/>
                                  )}
                                </figure>
                                <div class="lower-content">
                                    <ul class="post-info clearfix">
                                        </ul>
                                    <h3>{frontmatter.title}</h3>
                                    <div class="text" dangerouslySetInnerHTML={{ __html: html }}>
                                    </div>
									 <h3 >Team Members</h3>
									<div class="row clearfix">
                <div class="col-lg-8 col-md-8 col-sm-12 team-block" id="cstmmemberskew">
                    <div class="team-block-one wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="image-box">
                                <figure class="image"><img src="assets/images/team/team-1.jpg" alt=""/></figure>
                                <ul class="social-links clearfix">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                </ul>
                                <div class="link"><a href="team-details.html"><i class="fas fa-link"></i></a></div>
                            </div>
                            <div class="lower-content" id="memberscstmnoborder">
                                <h3><a href="team-details.html">Member Title Here</a></h3>
                                <span class="designation">Designation Here</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-12 team-block"id="cstmmemberskew">
                    <div class="team-block-one wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="image-box">
                                <figure class="image"><img src="assets/images/team/team-2.jpg" alt=""/></figure>
                                <ul class="social-links clearfix">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                </ul>
                                <div class="link"><a href="team-details.html"><i class="fas fa-link"></i></a></div>
                            </div>
                            <div class="lower-content" id="memberscstmnoborder">
                                <h3><a href="team-details.html">Member Title Here</a></h3>
                                <span class="designation">Designation Here</span>
                            </div>
                        </div>
                    </div>
                </div>
                
               
            </div>
                                </div>
                            </div>
                        </div>
                       
                        
                        
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                    <div class="sidebar blog-sidebar">
                        <div class="sidebar-widget sidebar-search">
                            <div class="search-form">
                                <form action="blog.html" method="post">
                                    <div class="form-group">
                                        <input type="search" name="search-field" placeholder="Search........" required=""/>
                                        <button type="submit"><i class="fas fa-search"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="sidebar-widget sidebar-categories">
                            <div class="widget-title">
                                <h3>Recent Projects</h3>
                            </div>
                            <div class="widget-content">
                                <ul class="categories-list clearfix">
                                    <li><a href="#">Project Title </a></li>
                                    <li><a href="#">Project Title </a></li>
                                    <li><a href="#">Project Title </a></li>
                                    <li><a href="#">Project Title </a></li>
                                    <li><a href="#">Project Title </a></li>
                                    <li><a href="#">Project Title </a></li>
                                    </ul>
                            </div>
                        </div>
                        
                      
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 770, height: 400)
          }
        }
      }
    }
  }
`
