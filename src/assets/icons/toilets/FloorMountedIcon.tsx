import React from 'react';

const FloorMountedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.9736 42.7266V70.4731H37.0458C37.0458 62.4232 49.7201 57.97 49.7201 42.7266H21.9736Z"
                fill="white"
            />
            <path
                d="M8.09961 70.9871H63.0788V71.8435H8.09961V70.9871ZM49.3768 40.8428H21.459V42.7268H49.3768V40.8428Z"
                fill="#F1EBE6"
            />
            <path
                d="M19.7463 64.6497H18.7187V67.7327L14.0943 62.937L13.4092 63.6221L18.2049 68.2465H15.1219V69.2741H19.7463V64.6497ZM49.3769 40.5H21.4591V41.3564H49.3769V40.5ZM22.3155 43.0691V70.1305H36.7025C36.8738 66.705 39.1004 63.9646 41.6695 60.8817C45.095 56.5998 49.2056 51.4616 49.3769 43.0691H22.3155ZM21.4591 42.2127H50.2332C50.2332 50.6052 47.3216 55.2296 42.3546 61.3955C39.9568 64.4785 37.7302 67.0476 37.7302 70.9869H21.4591V42.2127Z"
                fill="#282828"
            />
        </svg>
    );
};

export default FloorMountedIcon;
