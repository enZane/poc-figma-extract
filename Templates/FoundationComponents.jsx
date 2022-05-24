import React from "react"
import tailwindConfig from "../../../tailwind.config"
import PropTypes from 'prop-types';

export const ColorBox = ({ color }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center mr-12 space-y-2 border-2 rounded-md">
            <div className="h-24 w-full rounded-md" style={{ backgroundColor: tailwindConfig.theme.colors[color] }}>
            </div>
            <span>Color: {color}</span>
            <span>Hex Code: {tailwindConfig.theme.colors[color]}</span>
        </div>
    )
}

ColorBox.propTypes = {
    color: PropTypes.oneOf({ COLORS }).isRequired,
}