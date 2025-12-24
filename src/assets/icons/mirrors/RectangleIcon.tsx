import React from 'react';

const RectangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path
                d="M48.1152 62.2266L48.1152 10.1426L22.9211 10.1426L22.9211 62.2266L48.1152 62.2266Z"
                fill="#F1EBE6"
            />
            <path
                d="M48.5996 10.1426L48.5996 62.9534L22.4364 62.9534L22.4364 9.90039L48.5996 9.90039L48.5996 10.1426ZM47.6306 61.9844L47.6306 10.6271L23.4055 10.6271L23.4055 61.9844L47.6306 61.9844Z"
                fill="#282828"
            />
        </svg>
    );
};

export default RectangleIcon;
