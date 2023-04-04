/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => (
    <footer>
        <section class="main-footer">
            <div class="footer-top">
                <div class="pattern-layer" style={{ backgroundImage: `url("/assets/images/shape/footer-bg.png")` }}></div>
                <div class="auto-container">
                    <div class="widget-section">
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 footer-column">
                                <div class="footer-widget logo-widget">
                                    <figure class="footer-logo"><Link to="/"><StaticImage src="../assets/images/logo-white.png" alt="" /></Link></figure>
                                    <div class="text">
                                        <p>Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim est Excepteur sint ocecat cupidatatnon proi dent sunt in culpa quiofficia deserunt mollit anim est.</p>
                                    </div>
                                    <div class="social-inner">
                                        <h3>Follow Us:</h3>
                                        <ul class="social-links clearfix">
                                            <li><a href="index.html"><i class="fab fa-facebook-f"></i></a></li>
                                            <li><a href="index.html"><i class="fab fa-google-plus-g"></i></a></li>
                                            <li><a href="index.html"><i class="fab fa-twitter"></i></a></li>
                                            {/*<li><a href="index.html"><i class="fab fa-linkedin-in"></i></a></li>*/}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*
                      <div class="col-lg-2 col-md-6 col-sm-12 footer-column">
                          <div class="footer-widget links-widget" style={{marginLeft: "80px" }}>
                              <div class="widget-title">
                                  <h3>Usefull Links</h3>
                              </div>
                              <div class="widget-content">
                                  <ul class="clearfix">
                                      <li><a href="#">About</a></li>
                                      <li><a href="#">Our Team</a></li>
                                      <li><a href="#">Project</a></li>
                                      <li><a href="#">Contact</a></li>
                                      <li><a href="#">Publication</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-2 col-md-6 col-sm-12 footer-column">
                          <div class="footer-widget links-widget">
                              <div class="widget-title">
                                  <h3>Latest Projects</h3>
                              </div>
                              <div class="widget-content">
                                  <ul class="clearfix">
                                      <li><a href="index.html">Project Title</a></li>
                                      <li><a href="index.html">Project Title</a></li>
                                      <li><a href="index.html">Project Title</a></li>
                                      <li><a href="index.html">Project Title</a></li>
                                      </ul>
                              </div>
                          </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12 footer-column">
                    <div class="footer-widget links-widget">
                        <div class="footer-widget post-widget">
                            <div class="widget-title">
                                <h3>Recent Publications</h3>
                            </div>
                            <div class="widget-content">
                                <ul class="clearfix">
                                    <li><Link href="">Year Heading 2000</Link></li>
                                    <li><Link href="#">Year Heading 2000</Link></li>
                                    <li><Link href="#">Year Heading 2000</Link></li>
                                    <li><Link href="#">Year Heading 2000</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
*/}
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom centred">
                <div class="auto-container">
                    <div class="copyright">
                        <p>Copyright &copy; 2022 Cyber Space Lab. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </section>
    </footer>
)

export default Footer
