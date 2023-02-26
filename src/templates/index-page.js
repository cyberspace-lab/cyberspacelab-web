/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import {StaticImage} from "gatsby-plugin-image"
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
  RiGithubFill,
  RiTelegramFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiSkypeFill,
  RiDribbbleFill,
  RiMediumFill,
  RiBehanceFill,
} from "react-icons/ri"
import { FaWordpress, FaVk } from "react-icons/fa"

import Layout from "../components/layout"
import TeamListHome from "../components/team-list-home"
import Seo from "../components/seo"
import Icons from "../util/socialmedia.json"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      frontmatter {
        title
        tagline
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
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const sIcons = Icons.socialIcons.map((icons, index) => {
    return (
      <div key={"social icons" + index}>
        {icons.icon === "facebook" ? (
          <a href={icons.url} target="_blank" aria-label="link to Facebook" rel="noopener noreferrer">
            <RiFacebookBoxFill alt="Facebook icon"/>
          </a>
        ) : (
          ""
        )}
        {icons.icon === "twitter" ? (
          <a href={icons.url} target="_blank" aria-label="link to Twitter" rel="noopener noreferrer">
            <RiTwitterFill alt="Twitter icon"/>
          </a>
        ) : (
          ""
        )}
        {icons.icon === "linkedin" ? (
          <a href={icons.url} target="_blank" aria-label="link to Linkedin" rel="noopener noreferrer">
            <RiLinkedinBoxFill alt="Linkedin icon"/>
          </a>
        ) : (
          ""
        )}
        {icons.icon === "youtube" ? (
          <a href={icons.url} target="_blank" aria-label="link to Youtube" rel="noopener noreferrer">
            <RiYoutubeFill alt="Youtube icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "instagram" ? (
          <a href={icons.url} target="_blank" aria-label="link to Instagram" rel="noopener noreferrer">
            <RiInstagramFill alt="Instagram icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "rss" ? (
          <a href={icons.url} target="_blank" aria-label="link to RSS" rel="noopener noreferrer">
            <RiRssFill alt="RSS icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "github" ? (
          <a href={icons.url} target="_blank" aria-label="link to Github" rel="noopener noreferrer">
            <RiGithubFill alt="Github icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "telegram" ? (
          <a href={icons.url} target="_blank" aria-label="link to Telegram" rel="noopener noreferrer">
            <RiTelegramFill alt="Telegram icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "pinterest" ? (
          <a href={icons.url} target="_blank" aria-label="link to Pinterest" rel="noopener noreferrer">
            <RiPinterestFill alt="Pinterest icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "snapchat" ? (
          <a href={icons.url} target="_blank" aria-label="link to Snapchat" rel="noopener noreferrer">
            <RiSnapchatFill alt="Snapchat icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "skype" ? (
          <a href={icons.url} target="_blank" aria-label="link to Skype" rel="noopener noreferrer">
            <RiSkypeFill alt="Skype icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "wordpress" ? (
          <a href={icons.url} target="_blank" aria-label="link to Wordpress" rel="noopener noreferrer">
            <FaWordpress alt="Wordpress icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "dribbble" ? (
          <a href={icons.url} target="_blank" aria-label="link to Dribbble" rel="noopener noreferrer">
            <RiDribbbleFill alt="Dribbble icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "medium" ? (
          <a href={icons.url} target="_blank" aria-label="link to Medium" rel="noopener noreferrer">
            <RiMediumFill alt="Medium icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "behance" ? (
          <a href={icons.url} target="_blank" aria-label="link to Behance" rel="noopener noreferrer">
            <RiBehanceFill alt="Behance icon" />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "vk" ? (
          <a href={icons.url} target="_blank" aria-label="link to vk" rel="noopener noreferrer">
            <FaVk alt="vk icon" />
          </a>
        ) : (
          ""
        )}
      </div>
    )
  })
  return (
    <Layout>
      <Seo />
    <section class="banner-style-four" style={{ backgroundImage: `url("/assets/images/banner/banner.png")` }}>
        <div class="auto-container">
            <div class="row align-items-center clearfix">
                <div class="col-xl-6 col-lg-12 col-md-12 offset-xl-3 content-column">
                    <div class="content-box" style={{ textAlign: "center"}}>
                        <h2 style={{ textAlign: "center"}}>Sub Title</h2>
                        <h1 style={{ textAlign: "center"}}>Main Title</h1>
                        <p style={{ textAlign: "center"}}>Some dummy text comes here some dummy text comes here some dummy text comes here!</p>
                        <a style={{ textAlign: "center"}} class="main-button" href="#">Read More</a>
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
                                <p>Sub Heading</p>
                                <h2>Some About Heading.</h2>
                                <span class="separator"></span>
                            </div>
                            <div class="text">
                                <p>Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim est Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim est..</p>
                                <p>Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim estExcepteur sint ocecat cupidatatnon.</p>
                            </div>
                            <div class="inner-box clearfix">
                                <div class="single-item">
                                    <div class="box">
                                        <div class="icon-box"><i class="flaticon-molecular"></i></div>
                                        <h4>Some Title</h4>
                                    </div>
                                </div>
                                <div class="single-item">
                                    <div class="box">
                                        <div class="icon-box"><i class="flaticon-molecular"></i></div>
                                        <h4>Some Title</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-box"><a href="index.html" class="theme-btn style-one">More About Us</a></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 video-column">
                    <div id="video_block_02">
                        <div class="video-inner">
                            <figure class="image-box"><img src="/assets/images/resource/about-2.jpg" alt=""/></figure>
                            <div class="icon-holder">
                                <div class="icon-box">
                                    <a href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s" class="lightbox-image" data-caption=""><i class="fas fa-play"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="service-style-two bg-color-1 centred">
        <div class="pattern-layer" style={{ backgroundImage: `url("/assets/images/shape/shape-2.png")` }}></div>
        <div class="auto-container">
            <div class="sec-title">
                <p>Sub Heading</p>
                <h2>Heading About Services</h2>
                <span class="separator"></span>
            </div>
            <div class="row clearfix">
                <div class="col-lg-4 col-md-6 col-sm-12 service-block">
                    <div class="service-block-two wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="icon-box"><i class="flaticon-microscope"></i></div>
                            <h4><a href="#">Some Title</a></h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 service-block">
                    <div class="service-block-two wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="icon-box"><i class="flaticon-microscope"></i></div>
                            <h4><a href="#">Some Title</a></h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 service-block">
                    <div class="service-block-two wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="icon-box"><i class="flaticon-microscope"></i></div>
                            <h4><a href="#">Some Title</a></h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 service-block">
                    <div class="service-block-two wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="icon-box"><i class="flaticon-microscope"></i></div>
                            <h4><a href="#">Some Title</a></h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 service-block">
                    <div class="service-block-two wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="icon-box"><i class="flaticon-microscope"></i></div>
                            <h4><a href="#">Some Title</a></h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 service-block">
                    <div class="service-block-two wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
                        <div class="inner-box">
                            <div class="icon-box"><i class="flaticon-microscope"></i></div>
                            <h4><a href="#">Some Title</a></h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </section>
    
    <TeamListHome data={members} />

    <section class="faq-section">
        <div class="pattern-layer" style={{backgroundImage: `url("/assets/images/shape/shape-8.png")`}}></div>
        <div class="auto-container">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-12 col-sm-12 image-column">
                    <figure class="image-box wow slideInLeft" data-wow-delay="00ms" data-wow-duration="1500ms"><a href="/assets/images/resource/faq-1.jpg" class="lightbox-image" data-fancybox="gallery"><StaticImage src="../assets/images/resource/faq-1.jpg" alt=""/></a></figure>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div id="content_block_06">
                        <div class="content-box">
                            <div class="sec-title left">
                                <p>Sub Heading</p>
                                <h2>Heading About FAQ</h2>
                                <span class="separator"></span>
                            </div>
                            <ul class="accordion-box">
                                <li class="accordion block">
                                    <div class="acc-btn">
                                        <div class="icon-outer"><i class="fas fa-plus"></i></div>
                                        <h6>Some question goes here?</h6>
                                    </div>
                                    <div class="acc-content">
                                        <div class="content">
                                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="accordion block active-block">
                                    <div class="acc-btn active">
                                        <div class="icon-outer"><i class="fas fa-plus"></i></div>
                                        <h6>Some question goes here?</h6>
                                    </div>
                                    <div class="acc-content current">
                                        <div class="content">
                                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="accordion block">
                                     <div class="acc-btn">
                                        <div class="icon-outer"><i class="fas fa-plus"></i></div>
                                        <h6>Some question goes here?</h6>
                                    </div>
                                    <div class="acc-content">
                                        <div class="content">
                                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="accordion block">
                                     <div class="acc-btn">
                                        <div class="icon-outer"><i class="fas fa-plus"></i></div>
                                        <h6>Some question goes here?</h6>
                                    </div>
                                    <div class="acc-content">
                                        <div class="content">
                                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
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

    </Layout>
  )
}

export default HomePage
