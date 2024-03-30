/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import TeamListHome from "../components/team-list-home"
import Seo from "../components/seo"
import FaqAccordeon from "../components/faq-accordeon"
//import ServicesList from "../components/services-list"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      frontmatter {
        title
        subtitle
        tagline
        description
        faq
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 264, height: 264)
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    members: allMarkdownRemark(
      sort: {frontmatter: {order: ASC}}
      filter: {frontmatter: {template: {eq: "team-member"}}}
      limit: 4
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            slug
            title
            social {
                twitter
                facebook
                instagram
                web
                linkedin
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

const HomePage = ({ data }) => {
  const { markdownRemark, members } = data // data.markdownRemark holds your post data
  const { frontmatter } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  return (
    <Layout>
      <Seo />
    <section class="banner-style-four" style={{ backgroundImage: `url("/assets/images/banner/banner.png")` }}>
        <div class="auto-container">
            <div class="row align-items-center clearfix">
                <div class="col-xl-6 col-lg-12 col-md-12 offset-xl-3 content-column">
                    <div class="content-box" style={{ textAlign: "center"}}>
                        <h2 style={{ textAlign: "center"}}>{frontmatter.subtitle}</h2>
                        <h1 style={{ textAlign: "center"}}>{frontmatter.title}</h1>
                        <p style={{ textAlign: "center"}}>{frontmatter.tagline}</p>
                        <Link to="/projects" style={{ textAlign: "center"}} class="main-button">Projects</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="about-style-two">
        <div class="pattern-layer" style={{ backgroundImage: `url("/assets/images/shape/shape-6.png")`}}></div>
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div id="content_block_05">
                        <div class="content-box">
                            <div class="sec-title left">
                                {/*<p>Our mission</p>*/}
                                <h2>About Us</h2>
                                <span class="separator"></span>
                            </div>
                            <div class="text">
                                {frontmatter.description}
                            </div>
                            <div class="inner-box clearfix">
                                <div class="single-item">
                                    <div class="box">
                                        <div class="icon-box"><i class="flaticon-play"></i></div>
                                        <h4>Virtual reality</h4>
                                    </div>
                                </div>
                                <div class="single-item">
                                    <div class="box">
                                        <div class="icon-box"><i class="flaticon-planet-earth"></i></div>
                                        <h4>Spatial navigation</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-box">
                                <Link to="/about" class="theme-btn style-one">More About Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 video-column">
                    <figure class="image-box">
                        <StaticImage src = "../assets/images/pages/index/team2.jpg" />
                    </figure>
                    {/*
                    <div class="icon-holder">
                        <div class="icon-box">
                            <a href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s" class="lightbox-image" data-caption=""><i class="fas fa-play"></i></a>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </div>
    </section>
    <TeamListHome data={members} />
    <section class="faq-section">
        <div class="pattern-layer" style={{backgroundImage: `url("/assets/images/shape/shape-8.png")`}}></div>
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-12 col-sm-12 image-column faq-image">
                    <StaticImage src="../assets/images/pages/index/isometric.png" alt=""/>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div id="content_block_06">
                        <div class="content-box">
                            <div class="sec-title left">
                                {/*<p>Most asked questions</p>*/}
                                <h2>FAQ</h2>
                                <span class="separator"></span>
                                <FaqAccordeon arr={frontmatter.faq}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*}
    <section class="clients-section" style={{display: "none"}}>
        <div class="auto-container">
            <div class="clients-carousel owl-carousel owl-theme owl-dots-none owl-nav-none">
                <figure class="client-logo">
                    <a href="#"><img src="assets/images/clients/brand-1.png" alt="Awesome Image"/></a>
                    <div class="overlay-box">
                        <a href="#"><img src="assets/images/clients/overlay-brand-1.png" alt="Awesome Image"/></a>    
                    </div>
                </figure>
                <figure class="client-logo">
                    <a href="#"><img src="assets/images/clients/brand-2.png" alt="Awesome Image"/></a>
                    <div class="overlay-box">
                        <a href="#"><img src="assets/images/clients/overlay-brand-2.png" alt="Awesome Image"/></a>    
                    </div>
                </figure>
                <figure class="client-logo">
                    <a href="#"><img src="assets/images/clients/brand-3.png" alt="Awesome Image"/></a>
                    <div class="overlay-box">
                        <a href="#"><img src="assets/images/clients/overlay-brand-3.png" alt="Awesome Image"/></a>    
                    </div>
                </figure>
                <figure class="client-logo">
                    <a href="#"><img src="assets/images/clients/brand-4.png" alt="Awesome Image"/></a>
                    <div class="overlay-box">
                        <a href="#"><img src="assets/images/clients/overlay-brand-4.png" alt="Awesome Image"/></a>    
                    </div>
                </figure>
                <figure class="client-logo">
                    <a href="#"><img src="assets/images/clients/brand-5.png" alt="Awesome Image"/></a>
                    <div class="overlay-box">
                        <a href="#"><img src="assets/images/clients/overlay-brand-5.png" alt="Awesome Image"/></a>    
                    </div>
                </figure>
            </div>
        </div>
    </section>
    */}

    </Layout>
  )
}

export default HomePage
