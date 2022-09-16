/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TeamListBlog from "../components/team-list-blog"

const Post = ({ data, pageContext }) => {
  const { markdownRemark, members } = data // data.markdownRemark holds your post data
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
                                     <TeamListBlog data={members} />
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
    members: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        filter: { frontmatter: { template: { eq: "team-member" } } }
        limit: 2
    ) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              slug
              title
              description
              featuredImage {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, width: 270, height: 400)
                }
              }
            }
          }
        }
      }
  }
`
