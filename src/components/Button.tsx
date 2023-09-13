import React from "react"

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void
}

export const Button = (props: ButtonProps) => {
    console.log(props)
    return <button className="bg-purple-700 p-2 text-purple-100 rounded-md hover:bg-purple-600" onClick={props.onClick}>{props.children}</button>
}