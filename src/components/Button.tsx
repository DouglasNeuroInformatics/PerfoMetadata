import React from "react"

type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void
}

export const Button = (props: ButtonProps) => {
    return <button className="bg-purple-700 p-2 text-purple-100 rounded-md hover:bg-purple-600" onClick={props.onClick}>{props.children}</button>
}