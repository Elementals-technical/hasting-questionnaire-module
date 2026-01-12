import React from 'react';

const SlimProfileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <g clipPath="url(#clip0_1316_3988)">
                <path d="M0 71.1777H72.0115V72.0816H0V71.1777Z" fill="#F1EBE6" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.0882 39.6702V33.2998H21.6077V39.6702H71.1076V49.5702H36.8882H36.0273H1.80774V39.6702H17.0882ZM51.3076 42.382H55.8273V43.2859H51.3076V42.382ZM70.2037 41.478H36.8882V48.6663H70.2037V41.478ZM17.0882 42.382H21.6077V43.2859H17.0882V42.382ZM17.9921 35.1076H20.7038V34.2037H17.9921V35.1076ZM20.7038 36.0115H17.9921V39.6702H20.7038V36.0115ZM36.0273 41.478H2.71174V48.6663H36.0273V41.478Z"
                    fill="#282828"
                />
            </g>
            <defs>
                <clipPath id="clip0_1316_3988">
                    <rect width="72" height="72" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default SlimProfileIcon;
