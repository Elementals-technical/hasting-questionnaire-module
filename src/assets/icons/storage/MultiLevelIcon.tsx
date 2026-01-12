import React from 'react';

const MultiLevelStorageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
            <path
                d="M50.6861 60.0996L50.6569 71.6032L0 71.6617V60.0996H21.3431V44.0996L72 44.1288V60.0412L50.6861 60.0996Z"
                fill="#282828"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2483 45.1221H71.1535V45.8811H22.2483V45.1221ZM0.905273 60.9761H49.8104V70.7571H0.905273V60.9761Z"
                fill="#F1EBE6"
            />
            <path d="M71.1532 46.7568H22.248V59.1947H71.1532V46.7568Z" fill="white" />
        </svg>
    );
};

export default MultiLevelStorageIcon;
