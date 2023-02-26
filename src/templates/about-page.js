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
      }
    }
  }
`
const AboutPage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  return (
    <Layout className="page">
      <Seo title={frontmatter.title} description={excerpt} />
      <section class="page-title" style={{ backgroundImage: `url("assets/images/background/page-title-2.jpg")` }}>
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
                            <div class="pattern-layer" style={{ backgroundImage: `url("assets/images/shape/shape-1.png")` }}></div>
                            <figure class="image"><img src="assets/images/resource/about-1.jpg" alt=""/></figure>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div id="content_block_01">
                        <div class="content-box">
                            <div class="sec-title left">
                                <p>Sub Title</p>
                                <h2>Some About Heading.</h2>
                                <span class="separator"></span>
                            </div>
                            <div class="text">
                                <p>Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim est Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim est.</p>
                              </div>
                            <div class="inner-box">
                                <div class="single-item">
                                    <div class="count-box"><span>01</span></div>
                                    <div class="inner">
                                        <h3><a href="#">Some Title Here</a></h3>
                                        <p>Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim.</p>
                              </div>
                                </div>
                                <div class="single-item">
                                    <div class="count-box"><span>02</span></div>
                                    <div class="inner">
                                        <h3><a href="#">Some Title Here</a></h3>
                                        <p>Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim.</p>
                              </div>
                                </div>
                                <div class="single-item">
                                    <div class="count-box"><span>03</span></div>
                                    <div class="inner">
                                        <h3><a href="#">Some Title Here</a></h3>
                                        <p>Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim.</p>
                              </div>
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

export default AboutPage
