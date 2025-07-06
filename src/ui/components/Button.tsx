import React from "react"

export interface ButtonProps {
    value: React.ReactNode
    onClick: () => void
    style: React.CSSProperties
}

const Button: React.FC<ButtonProps> = ({ onClick, value: children, style }) => {
    return (
        <button onClick={onClick} style={style}>
            {children}
        </button>
    )
}

export default Button
