import React from "react"

const MemberSocialList = ({social}) => (
  <ul class="social-links clearfix">
    {social.twitter && <li><a href={social.twitter}><i class="fab fa-twitter"></i></a></li>}
    {social.facebook && <li><a href={social.facebook}><i class="fab fa-facebook-f"></i></a></li>}
    {social.linkedin && <li><a href={social.linkedin}><i class="fab fa-linkedin-in"></i></a></li>}
    {social.researchgate && <li><a href={social.researchgate}><i class="fab fa-researchgate"></i></a></li>}
  </ul>
)

export default MemberSocialList
//{social.some(e => e.key1 == "twitter") && <li><a href="{social.twitter}"><i class="fab fa-twitter"></i></a></li>}
