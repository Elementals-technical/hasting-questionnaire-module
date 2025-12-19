import React from 'react';

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default XIcon;
