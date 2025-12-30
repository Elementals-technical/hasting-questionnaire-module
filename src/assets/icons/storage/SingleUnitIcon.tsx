import React from 'react';

const SingleUnitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path d="M0 71.0488H71.9398V71.8694H0V71.0488Z" fill="#F1EBE6" />
            <path
                d="M47.5952 5.40039V60.381H24.3447V5.40039H47.5952ZM46.7746 27.8303H25.1653V37.6776H46.7746V27.8303ZM25.1653 59.2869H46.7746V49.4396H25.1653V59.2869ZM46.7746 6.221H25.1653V16.0683H46.7746V6.221ZM46.7746 38.7717H25.1653V48.619H46.7746V38.7717ZM46.7746 17.1624H25.1653V27.0097H46.7746V17.1624Z"
                fill="#282828"
            />
        </svg>
    );
};

export default SingleUnitIcon;
