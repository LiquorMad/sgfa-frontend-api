import Image from 'next/image'
import { SVGAttributes } from 'react'

const ApplicationLogo = (props: SVGAttributes<SVGElement>) => (

    <Image
        src="/images/logo.png" 
        width={100}
        height={100}
        alt="Picture of the author"
      />
    
)

export default ApplicationLogo
