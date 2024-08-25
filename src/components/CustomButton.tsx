import { memo } from 'react'
import Link from 'next/link'

interface CustomButtonProps {
  link: string
  linkButton: string
  buttonTitle: string
}

const CustomButton = memo(({ link, linkButton, buttonTitle }: CustomButtonProps) => {
  return (
    <>
      {linkButton === 'true' && (
        <div className="iq-button">
          <Link href={link} className="btn text-uppercase position-relative">
            <span className="button-text">{buttonTitle}</span>
            <i className="fa-solid fa-search"></i>
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
