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
      <section class="page-title" style={{ backgroundImage: `url("assets/images/background/page-title-2.jpg")` }}>
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
    <section class="contact-section">
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-8 col-md-12 col-sm-12 form-column">
                    <div class="form-inner">
                        <div class="sec-title left">
                            <p>Drop Us Line</p>
                            <h2>We’d Love To Hear From You.</h2>
                            <span class="separator"></span>
                        </div>
                        <form method="post" action="sendemail.php" id="contact-form" class="contact-form"> 
                            <div class="row clearfix">
                                <div class="col-lg-6 col-md-12 col-sm-12 form-group">
                                    <input type="text" name="username" placeholder="Your Name" required=""/>
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12 form-group">
                                    <input type="email" name="email" placeholder="Email" required=""/>
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12 form-group">
                                    <input type="text" name="subject" placeholder="Subject" required=""/>
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12 form-group">
                                    <input type="text" name="phone" placeholder="Phone" required/>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group">
                                    <textarea name="message" placeholder="Message"></textarea>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                    <button type="submit" class="theme-btn style-one" name="submit-form">Submit Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 info-column">
                    <div class="info-inner">
                        <div class="sec-title left">
                            <p>Contact Info</p>
                            <h2>Contact With Us </h2>
                            <span class="separator"></span>
                        </div>
                        <ul class="info-box clearfix"> 
                            <li>
                                <div class="icon-box"><i class="flaticon-call"></i></div>
                                <h5>Phone No.</h5>
                                <p><a href="tel:1800123456">(+1) 123 456 7890</a></p>
                            </li>
                            <li>
                                <div class="icon-box"><i class="flaticon-circular-clock"></i></div>
                                <h5>Opening Hours</h5>
                                <p>8:00 am - 6:00 pm</p>
                            </li>
                            <li>
                                <div class="icon-box"><i class="flaticon-worldwide"></i></div>
                                <h5>Address</h5>
                                <p>Location Goes Here.</p>
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
    <section class="google-map-section">
        <div class="auto-container">
            <div class="map-column">
                <div class="google-map-area">
                    <div 
                        class="google-map" 
                        id="contact-google-map" 
                        data-map-lat="50.116157520062195" 
                        data-map-lng="14.443742606370192"
                        data-icon-path="assets/images/icons/map-marker.png"  
                        data-map-title="Prague, Czech Republic" 
                        data-map-zoom="12" 
                        data-markers='{
                            "marker-1": [50.116157520062195, -14.443742606370192, "<h4>Branch Office</h4><p>77/99 New York</p>","assets/images/shape/map-marker.png"]
                        }'>

                    </div>
                </div>
            </div>
        </div>
    </section>
      <div className="wrapper" style={{ display:"none"}}>
        <h1>{frontmatter.title}</h1>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <form
          className="contact-form"
          action="/thanks"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <p className="formDescription">Nebo nám zanechte zprávu:</p>
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>
              Jméno
              <input type="text" name="name" required />
            </label>
          </p>
          <p>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
          </p>
          <p>
            <label>
              Předmět
              <input type="text" name="subject" required />
            </label>
          </p>
          <p>
            <label>
              Zpráva<textarea name="message" required></textarea>
            </label>
          </p>
          <p className="text-align-right">
            <button
              className="button"
              sx={{
                variant: "variants.button",
              }}
              type="submit"
            >
              Poslat{" "}
              <span className="icon -right">
                <RiSendPlane2Line />
              </span>
            </button>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Contact

