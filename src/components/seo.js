import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql, withPrefix, Script } from "gatsby"

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <html lang="en-US" />
      <link rel="alternate" href={seo.url} hreflang="en-us" />
      <link rel="alternate" href={seo.url} hreflang="en" />
      <link rel="alternate" href={seo.url} hreflang="x-default" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      <script id="jquery" type="text/javascript" src="/assets/js/jquery.js"/>
      <script id="popper" type="text/javascript" src="/assets/js/popper.min.js"/>
      <script id="bootstrap" type="text/javascript" src="/assets/js/bootstrap.min.js"/>
      <script id="owl" type="text/javascript" src="/assets/js/owl.js"/>
      <script id="wow" type="text/javascript" src="/assets/js/wow.js"/>
      <script id="validation" type="text/javascript" src="/assets/js/validation.js"/>
      <script id="fancybox" type="text/javascript" src="/assets/js/jquery.fancybox.js"/>
      <script id="appear" type="text/javascript" src="/assets/js/appear.js"/>
      <script id="jquerycount" type="text/javascript" src="/assets/js/jquery.countTo.js"/>
      <script id="scrollbar" type="text/javascript" src="/assets/js/scrollbar.js"/>
      <script id="tilt" type="text/javascript" src="/assets/js/tilt.jquery.js"/>
      <script id="styleswithc" type="text/javascript" src="/assets/js/jQuery.style.switcher.min.js"/>
      <script id="myscript" type="text/javascript" src="/assets/js/script.js"/>
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: siteUrl
        defaultImage: image
        twitterUsername
      }
    }
  }
`
