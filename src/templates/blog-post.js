/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TeamListBlog from "../components/team-list-blog"

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
  markdownRemark(id: {eq: $id}) {
    id
    html
    excerpt(pruneLength: 148)
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      slug
      title
      shortname
      memberSlugs
      description
      featuredImage {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 400, height: 400)
        }
      }
      featuredWideImage {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 1200, height: 400)
        }
      }
    }
  }
  members: allMarkdownRemark(
    sort: {frontmatter: {order: ASC}}
    filter: {frontmatter: {template: {eq: "team-member"}}}
  ) {
    edges {
      node {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          slug
          title
          social{
            facebook
            twitter
            linkedin
            instagram
            web
            researchgate
          }
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

const Post = ({ data, pageContext }) => {
  const { markdownRemark, members } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const filtredMembers = members.edges
    .filter(edge => frontmatter.memberSlugs.includes(edge.node.frontmatter.slug))

  const Image = frontmatter.featuredWideImage
    ? frontmatter.featuredWideImage.childImageSharp.gatsbyImageData
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
                  <h1>{frontmatter.shortname}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="blog-details sidebar-page-container">
        <div class="auto-container">
          <div class="row clearfix">
            <div class="content-side">
              <div class="blog-details-content">
                <div class="news-block-three">
                  <div class="inner-box">
                    <figure class="image-box" id="cstm2">
                      {Image != "" ? (
                        <GatsbyImage image={Image} alt={frontmatter.title + " - Featured image"} className="featured-image" />
                      ) : (
                        <img src="/assets/images/news/news-7.jpg" alt="" />
                      )}
                    </figure>
                    <div class="lower-content">
                      <ul class="post-info clearfix">
                      </ul>
                      <h3>{frontmatter.title}</h3>
                      <div class="text" dangerouslySetInnerHTML={{ __html: html }}>
                      </div>
                      <h3 className="project-member-list-heading">Team Members</h3>
                      <TeamListBlog data={filtredMembers} />
                    </div>
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

