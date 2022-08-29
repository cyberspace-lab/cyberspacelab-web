/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { RiHeart2Line } from "react-icons/ri"

const Footer = () => (
  <footer
    className="site-footer"
  >
    <div className="container">
      <p>
        © 2022 NUDZ
        </p>
        <p> Made by Pavel Srp using <Link to="/https://foundation.stackrole.com/">Stackrole.com</Link>
      </p>
    </div>
  </footer>
)

export default Footer
