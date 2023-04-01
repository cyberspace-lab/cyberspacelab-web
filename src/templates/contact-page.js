/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri"

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
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Contact = ({ data }) => {
  const { markdownRemark, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout className="contact-page">
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <section class="page-title" style={{ backgroundImage: `url("/assets/images/background/page-title-2.jpg")` }}>
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
                <h3>Some Heading Here</h3>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, aliquam quaerat voluptatem.</p>
              </div>
              <div class="upper-box">
                <h3>Some Heading Here</h3>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, aliquam quaerat voluptatem.</p>
              </div>
              <div class="upper-box">
              </div>
            </div>
          </div>
        </section>
        <div class="auto-container">
          <div class="row clearfix">
            <div class="info-column">
              <div class="info-inner">
                <div class="sec-title left">
                  <h2>Contact With Us </h2>
                </div>
                <ul class="info-box clearfix">
                  <li>
                    <div class="icon-box"><i class="flaticon-call"></i></div>
                    <div className="info-box-text">
                      <h5>Phone No.</h5>
                      <p><a href="tel:1800123456">(+1) 123 456 7890</a></p>
                    </div>
                  </li>
                  <li>
                    <div class="icon-box"><i class="flaticon-circular-clock"></i></div>
                    <div className="info-box-text">
                      <h5>Opening Hours</h5>
                      <p>8:00 am - 6:00 pm</p>
                    </div>
                  </li>
                  <li>
                    <div class="icon-box"><i class="flaticon-worldwide"></i></div>
                    <div className="info-box-text">
                      <h5>Address</h5>
                      <p>Location Goes Here.</p>
                    </div>
                  </li>
                </ul>
                <div class="follow-box">
                  <h5>Follow Us:</h5>
                  <ul class="social-links clearfix">
                    <li><a href="contact.html"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a href="contact.html"><i class="fab fa-twitter"></i></a></li>
                    <li><a href="contact.html"><i class="fab fa-google-plus-g"></i></a></li>
                    <li><a href="contact.html"><i class="fab fa-pinterest-p"></i></a></li>
                  </ul>
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

