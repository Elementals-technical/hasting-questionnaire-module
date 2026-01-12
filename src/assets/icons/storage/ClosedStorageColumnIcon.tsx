import React from 'react';

const ClosedStorageColumnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.1139 9.48242H24.8857V63.3616H47.1139V9.48242Z"
                fill="#F1EBE6"
            />
            <path
                d="M46.8726 9.96644H25.1277V62.8792H46.8726V9.96644ZM24.8861 9H47.5975V63.8456H24.4028V9H24.8861Z"
                fill="#282828"
            />
            <path d="M44.4565 42.0999V29.5361" stroke="#282828" strokeWidth="1.07667" strokeMiterlimit="22.9256" />
            <path d="M0 70.8525H72V71.819H0V70.8525Z" fill="#F1EBE6" />
        </svg>
    );
};

export default ClosedStorageColumnIcon;
