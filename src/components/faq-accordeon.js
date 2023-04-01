
import { jsx } from "theme-ui"
import React from "react"

const Questions = ( {arr} ) => {
  return(
    arr.map(field => (
      <li class="accordion block">
          <div class="acc-btn">
              <div class="icon-outer"><i class="fas fa-plus"></i></div>
              <h6>{field[0]}</h6>
          </div>
          <div class="acc-content">
              <div class="content">
                  <p>{field[1]}</p>
              </div>
          </div>
      </li>
    ))
  )
}

const FaqAccordeon = ( {arr} ) => {
  return (
    <ul class="accordion-box">
      <Questions arr={arr} />
    </ul>
  )
}

export default FaqAccordeon
