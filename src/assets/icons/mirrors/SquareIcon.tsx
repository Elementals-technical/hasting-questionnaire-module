import React from 'react';

const SquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path d="M54.5798 17.585H18.4844V53.6803H54.5798V17.585Z" fill="#F1EBE6" />
            <path
                d="M18.4845 17.0996H54.8222V54.164H18V17.0996H18.4845ZM53.8532 18.0686H18.969V53.1952H53.8532V18.0686Z"
                fill="#282828"
            />
        </svg>
    );
};

export default SquareIcon;
