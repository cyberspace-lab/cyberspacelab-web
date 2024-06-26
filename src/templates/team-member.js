/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogListMember from "../components/blog-list-member"
import MemberSocialList from "../components/member-social-list"

const SimpleList = ({ fields }) => {
return (
  fields.map(field => (
    <div>
      {field} <br />
    </div>
    )
  )
)
}

const Member = ({ data, pageContext }) => {
  const { markdownRemark, posts } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""

  const filtredPost = posts.edges.length == 0 ? [] : 
    posts.edges.filter(edge => frontmatter.projectSlugs.includes(edge.node.frontmatter.slug))

  return (
    <Layout className="page member-page">
      <Seo
        title={frontmatter.title}
        description={
          frontmatter.description ? frontmatter.description : excerpt
        }
        image={Image}
        article={true}
      />

    <section class="page-title" style={{ backgroundImage: `url("/assets/images/background/prague_ominous.png")` }}>
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-8 col-md-12 col-sm-12 content-column" id="cstmmobiletitle">
                    <div class="content-box clearfix">
                        <div class="title pull-left">
                          <h1>{frontmatter.title}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="team-details">
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6 col-sm-12 left-column">
                    <div class="left-content">
                        <div class="upper-box">
                            <div class="title">
                              <h2>{frontmatter.description}</h2>
                            </div>
                            <ul class="list-item clearfix">
                              {frontmatter.edcuation && 
                                <li><span>Education</span><SimpleList fields={frontmatter.education} /></li>
                              }
                              {frontmatter.expertise &&
                                <li><span>Expertise</span><SimpleList fields={frontmatter.expertise} /></li>
                              }
                              {frontmatter.favoriteGames &&
                              <li><span>Favorite Games</span><SimpleList fields={frontmatter.favoriteGames}/></li>
                              }
                              {frontmatter.hobbies &&
                              <li><span>Hobbies</span><SimpleList fields={frontmatter.hobbies}/></li>
                              }
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 team-block right-column team-member-photo">
                    <div class="right-content">
                        <div class="team-block-one">
                            <div class="inner-box">
                                <div class="image-box">
                                    <figure class="image">
                                        {Image !== "" ? (
                                          <GatsbyImage image={Image} alt={frontmatter.title + " - Featured image"} className="featured-image" />
                                        ) : (
                                          <StaticImage src="../assets/images/incognito-thumbnail.png" alt=""/>
                                        )}
                                    </figure>
                                    {frontmatter.social &&
                                      <MemberSocialList social={frontmatter.social} />
                                    }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="team-details" id="Personal-Experience">
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 left-column">
                    <div class="left-content">
                        <div class="lower-box">
                          <div class="text" dangerouslySetInnerHTML={{ __html: html }}/>
                        </div>
                        {filtredPost.length > 0 &&
						              <BlogListMember data={filtredPost} />
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default Member

export const pageQuery = graphql`
  query TeamMemberQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        slug
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 370, height: 470)
          }
        }
        education
        expertise
        hobbies
        favoriteGames
        social {
          twitter
          facebook
          instagram
          web
          linkedin
          researchgate
        }
        latestPapers
        description
        projectSlugs
      }
    }
    posts: allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 4
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            shortname
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
  }
`