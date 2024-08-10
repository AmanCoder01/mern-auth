import React from 'react'

export const Loader = ({ text, style }) => {
    return (
        <div className={`${style} `}>
            <div className="w-6 h-6 border-4 border-t-4 border-green-600 border-solid rounded-full animate-spin"></div>
            <div>{text}</div>
        </div>
    )
}
