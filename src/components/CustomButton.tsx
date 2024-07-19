import { memo } from 'react'
import Link from 'next/link'

interface CustomButtonProps {
  linkButton: string
  link: string
  buttonTitle: string
}

const CustomButton = memo(({ linkButton, link, buttonTitle }: CustomButtonProps) => {
  return (
    <>
      {linkButton === 'true' && (
        <div className="iq-button link-button">
          <Link href={link} className="btn text-capitalize position-relative">
            <span className="button-text">{buttonTitle}</span>
          </Link>
        </div>
      )}
      {linkButton === 'false' && (
        <div className="iq-button">
          <Link href={link} className="btn text-uppercase position-relative">
            <span className="button-text">{buttonTitle}</span>
            <i className="fa-solid fa-play"></i>
          </Link>
        </div>
      )}
    </>
  )
})

CustomButton.displayName = 'CustomButton'

export default CustomButton
