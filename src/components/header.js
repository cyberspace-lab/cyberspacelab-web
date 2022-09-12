/** @jsx jsx */
import { jsx } from "theme-ui"

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
                    <figure class="logo"><a href="/"><img src="assets/images/logo-white.png" width="250px" alt=""></img></a></figure>
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
                                <li><a href="/">Home</a>
                                </li> 
                                <li><a href="about">About</a>
                                    
                                </li>
                                <li><a href="team">Team</a>
                                    
                                </li>
                                <li><a href="blog">Project</a>
                                    
                                </li>
                                <li><a href="publications">Publications</a>
                                    
                                </li>                              
                                <li><a href="contact.html">Contact Us</a></li>
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
                    <figure class="logo"><a href="/"><img src="assets/images/logo-white.png" width="250px" alt=""></img></a></figure>
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
