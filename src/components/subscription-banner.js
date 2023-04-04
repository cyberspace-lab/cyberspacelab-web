/** @jsx jsx */
import { jsx } from "theme-ui"

const SubscriptionBanner = () => (
  <section class="newsletter-section bg-color-3">
      <div class="pattern-layer" style={{ backgroundImage: `url("/assets/images/shape/shape-7.png")` }}></div>
      <div class="auto-container">
          <div class="row clearfix">
              <div class="col-lg-5 col-md-12 col-sm-12 inner-column">
                  <div class="inner-box">
                      <h2>Subscribe Newsletter</h2>
                      <p>Stay in touch with us to get latest news and discount coupons</p>
                  </div>
              </div>
              <div class="col-lg-7 col-md-12 col-sm-12 form-column">
                  <form action="index.html" method="post" class="newsletter-form">
                      <div class="form-group">
                          <input type="email" name="email" placeholder="Enter Your Email" required=""></input>
                          <button class="theme-btn style-one" type="submit">Subscribe!</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </section>
)

export SubscriptionBanner;