import React from 'react'
import { RichText } from 'prismic-reactjs'

const Info = ({ slice }) => (
  <section>
    {slice.items.map((item, i) => {
      return(
        <RichText render={item}/>
      )
    })}
    
  </section>
)

export default Info