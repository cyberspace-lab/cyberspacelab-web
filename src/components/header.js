/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const Header = ({ children }) => (
  <header class="main-header style-two style-four">
    <div class="header-top">
        <div class="auto-container">
            <div class="top-inner clearfix">
                <div class="top-left pull-left clearfix">
                   <div class="text" style={{ marginBottom: "5px" }}><a  href="mailto:support@cyberlabspace.com" style= {{fontSize: "12px", color: "#fff" }}>support@cyberlabspace.com</a></div>
                </div>
                <ul class="top-right pull-right">
                    <li><a href="">EN</a></li>
                    <li><a href="">CZ</a></li>                        
                </ul>
            </div>
        </div>
    </div>
    <div class="header-lower">
        <div class="auto-container">
            <div class="outer-box clearfix">
                <div class="logo-box pull-left">
                    <figure class="logo"><Link to="/"><img src="../assets/images/logo-white.png" width="250px" alt=""/></Link></figure>
                </div>
                <div class="menu-area pull-right">
                    <div class="mobile-nav-toggler">
                        <i class="icon-bar"></i>
                        <i class="icon-bar"></i>
                        <i class="icon-bar"></i>
                    </div>
                    <nav class="main-menu navbar-expand-md navbar-light">
                        <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                            <ul class="navigation clearfix">
                                <li><Link to="/">Home</Link></li> 
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/team">Team</Link></li>
								                <li><Link href="/blog">Project</Link></li>
                                <li><Link href="/publications">Publications</Link></li>                              
                                <li><Link href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <div class="menu-right-content">
                        <div class="search-box-outer">
                            <div class="search-btn">
                                <button type="button" class="search-toggler"><span class="fas fa-search"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sticky-header">
        <div class="auto-container">
            <div class="outer-box clearfix">
                <div class="logo-box pull-left">
                    <figure class="logo">
                        <a href="/"><img src="/assets/images/logo-white.png" width="250px" alt=""/></a>
                    </figure>
                </div>
                <div class="menu-area pull-right">
                    <nav class="main-menu clearfix">
                    </nav>
                    <div class="menu-right-content">
                        <div class="search-box-outer">
                            <div class="search-btn">
                                <button type="button" class="search-toggler"><span class="fas fa-search"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </header>
)

export default Header
