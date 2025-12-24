import React from 'react';

const VesselIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <g clip-path="url(#clip0_1342_706)">
                <path d="M0 71.9685V71.1221H72.0484V71.9685H0Z" fill="#F1EBE6" />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M57.66 37.7959V44.1438H14.3887V37.7959C30.6815 37.7959 41.3671 37.7959 57.66 37.7959Z"
                    fill="#F1EBE6"
                />
                <path
                    d="M44.5408 32.4004C44.1176 33.3526 43.4828 34.3048 42.7422 35.0453C40.9437 36.7381 38.6161 37.7961 35.9711 37.7961C33.432 37.7961 30.9987 36.7381 29.3059 35.0453C28.5653 34.3048 27.9305 33.3526 27.5073 32.4004H28.4595C28.8827 33.141 29.4117 33.7758 29.9407 34.4106C31.5276 35.8917 33.6436 36.9497 35.9711 36.9497C38.4045 36.9497 40.5205 35.8917 42.1074 34.4106C42.6364 33.7758 43.1654 33.141 43.5886 32.4004H44.5408Z"
                    fill="#282828"
                />
            </g>
            <defs>
                <clipPath id="clip0_1342_706">
                    <rect width="72" height="72" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default VesselIcon;
