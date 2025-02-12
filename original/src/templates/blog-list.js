/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostCard from "../components/post-card"
import Seo from "../components/seo"

export const blogListQuery = graphql`
 query blogListQuery($id: String!) {
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {template: {eq: "blog-post"}, draft: {ne: true}}}
  ) {
    edges {
      node {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          shortname
          slug
          title
          description
          isActive
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 370, height: 370)
            }
          }
        }
      }
    }
  }
  headPage: markdownRemark(id: {eq: $id}) {
    id
    frontmatter {
      title
    }
  }
}
`
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props

    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge => <PostCard key={edge.node.id} data={edge.node} />)
    
    return (
      <Layout className="blog-page">
        <Seo
          title={data.headPage.title}
          description={data.headPage.description}
        />
        <section class="page-title" style={{ backgroundImage: `url("/assets/images/background/prague_eerie.png")` }}>
          <div class="auto-container">
              <div class="row clearfix">
                  <div class="col-lg-8 col-md-12 col-sm-12 content-column" id="cstmmobiletitle">
                      <div class="content-box clearfix">
                          <div class="title pull-left">
                              <h1>Our Projects</h1>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
        <section class="project-section">
            <div class="auto-container">
              <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12 content-column">
                        <div id="content_block_01">
                            <div class="content-box">
                                <div class="sec-title left">
                                    <h2>Ongoing Projects</h2>
                                    <span class="separator"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="projects-container">
                  {posts}
                </div>
            </div>
        </section>
      </Layout>
    )
  }
}

export default BlogIndex
