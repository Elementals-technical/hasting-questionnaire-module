import React from 'react';

const IntegratedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <g clip-path="url(#clip0_1316_4011)">
                <path d="M0 71.9196V71.0732H72.0484V71.9196H0Z" fill="#F1EBE6" />
                <path
                    d="M57.554 37.7468H44.0119C43.2713 39.1221 42.1075 40.1801 40.7322 41.0265C39.3568 41.7671 37.664 42.2961 35.9713 42.2961C34.2785 42.2961 32.6915 41.7671 31.3162 41.0265C29.9408 40.1801 28.777 39.1221 27.9306 37.7468H14.3885V36.9004H28.4596L28.5654 37.112C29.306 38.3816 30.4698 39.4395 31.7393 40.1801C33.0089 40.9207 34.4901 41.3439 35.9713 41.3439C37.5582 41.3439 39.0394 40.9207 40.309 40.1801C41.5785 39.4395 42.6365 38.3816 43.3771 37.112L43.5887 36.9004H57.554V37.7468Z"
                    fill="#282828"
                />
            </g>
            <defs>
                <clipPath id="clip0_1316_4011">
                    <rect width="72" height="72" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default IntegratedIcon;
