import React from 'react'

interface CardProps {
  className?: string
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardProps>
  Body: React.FC<CardProps>
  Footer: React.FC<CardProps>
} = (props) => (
  <div className={`card ${props.className ? props.className : ''}`}>{props.children}</div>
)

Card.displayName = 'Card'

Card.Header = (props) => (
  <div className={`card-header d-flex justify-content-between ${props.className ? props.className : ''}`}>
    {props.children}
  </div>
)

Card.Header.displayName = 'Card.Header'

Card.Body = (props) => (
  <div className={`card-body ${props.className ? props.className : ''}`}>{props.children}</div>
)

Card.Body.displayName = 'Card.Body'

Card.Footer = (props) => <div className="card-footer">{props.children}</div>

Card.Footer.displayName = 'Card.Footer'

// Card.Header.Title = (props: { className: any; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => <div className={`header-title ${props.className ? props.className : ''}`}> {props.children} </div>
// Card.Header.Action = (props: { className: any; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => <div className={`header-action ${props.className ? props.className : ''}`}> {props.children} </div>

export default Card
