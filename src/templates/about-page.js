import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query AboutQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
        description
        aims
      }
    }
  }
`

const AimsBox = ({ aims }) => {
    const interestsDiv = aims.map((aim, i) => 
        <div class="single-item">
            <div class="count-box">
                <span>0{i+1}</span>
            </div>
            <div class="inner">
                <h3>{aim[0]}</h3>
                <p>{aim[1]}</p>
            </div>
        </div>
    )
    return(
        <div class="inner-box">
            {interestsDiv}
        </div>
    )
}

const AboutPage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <Layout className="page">
      <Seo title={frontmatter.title} description={excerpt} />
      <section class="page-title" style={{ backgroundImage: `url("/assets/images/background/page-title-2.jpg")` }}>
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-8 col-md-12 col-sm-12 content-column" id="cstmmobiletitle">
                    <div class="content-box clearfix">
                        <div class="title pull-left">
                            <h1>About Us</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="about-section">
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-12 col-sm-12 image-column">
                    <div id="image_block_01">
                        <div class="image-box">
                            <div class="pattern-layer" style={{ backgroundImage: `url("/assets/images/shape/shape-1.png")` }}></div>
                            <figure class="image"><img src="/assets/images/resource/about-1.jpg" alt=""/></figure>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div id="content_block_01">
                        <div class="content-box">
                            <div class="text">
                                <p>{frontmatter.description}</p>
                              </div>
                        <AimsBox aims={frontmatter.aims} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default AboutPage
