/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PublicationCard from "../components/publication-card"
import Seo from "../components/seo"

export const publicationsListQuery = graphql`
  query publicationsListQuery {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "publication" } } }
      sort: { frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "YYYY, MM")
            category
            journal
            slug
            title
            authors
            url
          }
        }
      }
    }
  }
`

class PublicationsIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numPages } = this.props.pageContext

    const posts = data.allMarkdownRemark.edges
      .map(edge => <PublicationCard key={edge.node.id} data={edge.node} />)

    return (
      <Layout className="blog-page">
        <Seo
          title={"Blog — Page " + currentPage + " of " + numPages}
          description={
            "Stackrole base blog page " + currentPage + " of " + numPages
          }
        />
      <section class="page-title" style={{ backgroundImage: `url("/assets/images/background/prague_pink_wide.png")` }}>
      <div class="auto-container">
        <div class="row clearfix">
          <div class="col-lg-8 col-md-12 col-sm-12 content-column" id="cstmmobiletitle">
            <div class="content-box clearfix">
              <div class="title pull-left">
                <h1>Our Publications</h1>
              </div>
                        
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="research-details"> 
      <div class="auto-container">
        <div class="research-details-content">
          { posts }
				</div>
      </div>
    </section>
      </Layout>
    )
  }
}

export default PublicationsIndex
