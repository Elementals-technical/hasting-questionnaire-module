const attributesLabelMap = {
    font_size: 'Size',
    'text-rotation': 'Rotation',
    'Text X_position': 'Horizontal',
    'Text Y_position': 'Vertical',
    'Scale Image': 'Size',
    'Rotate Image': 'Rotation',
    'Image X_position': 'Horizontal',
    'Image Y_position': 'Vertical',
};

export const getAttributeLabel = (attributeName: keyof typeof attributesLabelMap) => {
    return attributesLabelMap[attributeName];
};
