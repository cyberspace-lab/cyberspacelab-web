/** @jsx jsx */
import {jsx} from 'theme-ui'

const ServicesList = ( {arr} ) => {
    return(
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
                  <div class="service-block-two">
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
    )
}

export default ServicesList