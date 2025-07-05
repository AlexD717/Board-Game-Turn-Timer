import React from "react"

export interface ButtonProps {
  value: React.ReactNode
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ onClick, value: children }) => {
  return <button onClick={onClick}>{children}</button>
}

export default Button
