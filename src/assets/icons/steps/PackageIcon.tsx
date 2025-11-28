import React from 'react';

const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
            <path
                d="M53.3333 53.3333L60 60L73.3333 46.6667"
                stroke="#AC5331"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M70 33.3333V26.6667C69.9988 25.4976 69.6902 24.3494 69.1051 23.3372C68.5201 22.325 67.6791 21.4845 66.6667 20.9L43.3333 7.56666C42.3199 6.98153 41.1702 6.67349 40 6.67349C38.8298 6.67349 37.6801 6.98153 36.6667 7.56666L13.3333 20.9C12.3209 21.4845 11.4799 22.325 10.8949 23.3372C10.3098 24.3494 10.0012 25.4976 10 26.6667V53.3333C10.0012 54.5024 10.3098 55.6506 10.8949 56.6628C11.4799 57.6749 12.3209 58.5154 13.3333 59.1L36.6667 72.4333C37.6801 73.0184 38.8298 73.3265 40 73.3265C41.1702 73.3265 42.3199 73.0184 43.3333 72.4333L50 68.6333M25 14.2333L55 31.4"
                stroke="#AC5331"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10.9667 23.3333L40 40M40 40L69.0333 23.3333M40 40V73.3333"
                stroke="#AC5331"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default PackageIcon;
