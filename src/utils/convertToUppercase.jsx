import React from 'react'

const convertToUppercase = (string) => {
    if (!string) return ''; // Handle null, undefined, or empty string
    const temp = string.charAt(0).toUpperCase() + string.slice(1);
    return temp;
}

export default convertToUppercase