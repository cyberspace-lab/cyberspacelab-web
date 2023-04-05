/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const pageQuery = graphql`
  query ContactQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 140)
      frontmatter {
        title
        address
        email
        social{
          facebook
          twitter
          linkedin
          instagram
        }
      }
    }
    site {
      siteMetadata {
        title
        social {
          facebook
          twitter
          linkedin
          instagram
        }
      }
    }
  }
`

const Social = ({ social }) => {
  return(
    <ul class="social-links clearfix">
      <li><a href={social.facebook}><i class="fab fa-facebook-f"></i></a></li>
      <li><a href={social.twitter}><i class="fab fa-twitter"></i></a></li>
      <li><a href={social.instagram}><i class="fab fa-instagram"></i></a></li>
      <li><a href={social.linkedin}><i class="fab fa-linkedin"></i></a></li>
    </ul>
  )
}

const Contact = ({ data }) => {
  const { markdownRemark, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout className="contact-page">
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <section class="page-title" style={{ backgroundImage: `url("/assets/images/banner/banner.png")` }}>
        <div class="auto-container">
          <div class="row clearfix">
            <div class="col-lg-8 col-md-12 col-sm-12 content-column" id="cstmmobiletitle">
              <div class="content-box clearfix">
                <div class="title pull-left">
                  <h1>Contact Us</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="details">

      </section>
      <section class="contact-section">
        <section class="details">
          <div class="auto-container">
            <div class="research-details-content">
              <div class="upper-box">
                <div class="text" dangerouslySetInnerHTML={{ __html: html }}></div>
              </div>
            </div>
          </div>
        </section>
        <div class="auto-container">
          <div class="row clearfix">
            <div class="info-column">
              <div class="info-inner">
                <div class="sec-title left">
                  <h3>Contact information </h3>
                </div>
                <ul class="info-box clearfix">
                    {/*
                  <li>
                    <div class="icon-box"><i class="flaticon-call"></i></div>
                    <div className="info-box-text">
                      <h5>Phone No.</h5>
                      <p><a href="tel:1800123456">(+1) 123 456 7890</a></p>
                    </div>
                  </li>
                    */}
                  <li>
                    <div class="icon-box"><i class="flaticon-lab"></i></div>
                    <div className="info-box-text">
                      <h5>Email</h5>
                      <p>{frontmatter.email}</p>
                    </div>
                  </li>
                  <li className="dress-info-box">
                    <div class="icon-box"><i class="flaticon-marker"></i></div>
                    <div className="info-box-text">
                      <h5>Address</h5>
                      <p>{frontmatter.address}</p>
                    </div>
                  </li>
                </ul>
                <div class="follow-box">
                  <h5>Follow Us:</h5>
                  <Social social={site.siteMetadata.social} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Contact

