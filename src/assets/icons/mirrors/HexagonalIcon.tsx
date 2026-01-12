import React from 'react';

const HexagonalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.1279 16.6846L14.2266 35.5803L25.1279 54.4759H46.9305L57.8318 35.5803L46.9305 16.6846H25.1279Z"
                fill="#F1EBE6"
            />
            <path
                d="M25.3703 17.1692L14.7113 35.5804L25.3703 54.2336H46.6884L57.3475 35.5804L46.6884 17.1692H25.3703ZM13.7423 35.3381L24.8858 16.2002H47.1729C50.8067 22.741 54.6827 29.2818 58.3165 35.5804C54.6827 42.1212 50.8067 48.6618 47.1729 54.9604H24.8858C21.0098 48.6618 17.376 42.1212 13.5 35.5804L13.7423 35.3381Z"
                fill="#282828"
            />
        </svg>
    );
};

export default HexagonalIcon;
