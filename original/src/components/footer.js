/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Footer = ({data}) => (
    <footer>
        <section class="main-footer">
            <div class="footer-top">
                <div class="pattern-layer" style={{ backgroundImage: `url("/assets/images/shape/footer-bg.png")` }}></div>
                <div class="auto-container">
                    <div class="widget-section">
                        <div class="row clearfix">
                            <div class="col-lg-12 col-md-12 col-sm-12 footer-column">
                                <div class="footer-widget logo-widget">
                                    <figure class="footer-logo">
                                        <Link to="/"><StaticImage src="../assets/images/logo-white.png" alt="" /></Link>
                                    </figure>
                                    <div class="text">
                                        <p>{data.footerText}</p>
                                    </div>
                                    <div class="social-inner">
                                        <h3>Follow Us:</h3>
                                        <ul class="social-links clearfix">
                                            <li><a href={data.social.facebook}><i class="fab fa-facebook-f"></i></a></li>
                                            <li><a href={data.social.twitter}><i class="fab fa-twitter"></i></a></li>
                                            <li><a href={data.social.instagram}><i class="fab fa-instagram"></i></a></li>
                                            {/*<li><a href="index.html"><i class="fab fa-linkedin-in"></i></a></li>*/}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom centred">
                <div class="auto-container">
                    <div class="copyright">
                        <p>Copyright &copy; 2024 CyberspaceLab. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </section>
    </footer>
)

export default Footer
