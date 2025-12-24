import React from 'react';

const ConsoleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path d="M0 71.4961H71.991" stroke="#F1EBE6" stroke-miterlimit="22.9256" />
            <path
                d="M36.9 39.5462V42.2462H37.8V47.6462H34.2V42.2462H35.1V39.5462H23.4V63.8462H48.591V39.5462H36.9ZM35.1 26.9912H36.9V26.1002H35.1V26.9912ZM36.9 27.9002H35.1V31.5002H36.9V27.9002ZM37.8 25.2002V31.5002H49.5C49.5 42.2822 49.5 60.2642 49.5 71.0462H48.591V64.7462H23.4V71.0462H22.5C22.5 60.2642 22.5 42.2822 22.5 31.5002H34.2V25.2002H37.8Z"
                fill="#282828"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.5914 32.4004H23.4004V38.6464H48.5914V32.4004ZM36.9004 43.1464H35.1004V46.7464H36.9004V43.1464Z"
                fill="#F1EBE6"
            />
        </svg>
    );
};

export default ConsoleIcon;
