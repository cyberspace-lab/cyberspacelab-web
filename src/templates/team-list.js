/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MemberCard from "../components/member-card"
import Seo from "../components/seo"

export const teamListQuery = graphql`
query teamListQuery {
  allMarkdownRemark(
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

class TeamIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numPages } = this.props.pageContext

    const posts = data.allMarkdownRemark.edges
      .map(edge => <MemberCard key={edge.node.id} data={edge.node} />)


    return (
      <Layout className="blog-page">
        <Seo
          title={"Blog — Page " + currentPage + " of " + numPages}
          description={
            "Stackrole base blog page " + currentPage + " of " + numPages
          }
        />
    <section class="page-title" style={{ backgroundImage: `url("assets/images/background/page-title-2.jpg")` }}>
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-8 col-md-12 col-sm-12 content-column" id="cstmmobiletitle">
                    <div class="content-box clearfix">
                        <div class="title pull-left">
                            <h1>Our Team</h1>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="team-section team-page-section">
        <div class="auto-container">
          <div class="row clearfix">
            {posts}
          </div>
        </div>
    </section>
      </Layout>
    )
  }
}

export default TeamIndex
