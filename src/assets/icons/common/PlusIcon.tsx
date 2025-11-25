import React from 'react';

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
            <path
                d="M3.33337 7.99992H12.6667M8.00004 3.33325V12.6666"
                stroke="#282828"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default PlusIcon;
