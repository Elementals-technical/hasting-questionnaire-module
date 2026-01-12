import React from 'react';

const IntegratedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <g clipPath="url(#clip0_1342_699)">
                <path d="M0 71.9196V71.0732H72.0484V71.9196H0Z" fill="#F1EBE6" />
                <path
                    d="M57.5542 37.7468H44.0121C43.2715 39.1221 42.1077 40.1801 40.7323 41.0265C39.357 41.7671 37.6642 42.2961 35.9714 42.2961C34.2787 42.2961 32.6917 41.7671 31.3163 41.0265C29.941 40.1801 28.7772 39.1221 27.9308 37.7468H14.3887V36.9004H28.4598L28.5656 37.112C29.3062 38.3816 30.4699 39.4395 31.7395 40.1801C33.0091 40.9207 34.4903 41.3439 35.9714 41.3439C37.5584 41.3439 39.0396 40.9207 40.3092 40.1801C41.5787 39.4395 42.6367 38.3816 43.3773 37.112L43.5889 36.9004H57.5542V37.7468Z"
                    fill="#282828"
                />
            </g>
            <defs>
                <clipPath id="clip0_1342_699">
                    <rect width="72" height="72" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default IntegratedIcon;
