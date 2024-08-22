import React from 'react'

const timeSinceAlt = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    let counter;

    if (seconds < 60) {
        return "just now";
    } else if (seconds < intervals.minute * 60) {
        counter = Math.floor(seconds / intervals.minute);
        return counter === 1 ? "a minute ago" : `${counter} minutes ago`;
    } else if (seconds < intervals.hour * 24) {
        counter = Math.floor(seconds / intervals.hour);
        return counter === 1 ? "an hour ago" : `${counter} hours ago`;
    } else if (seconds < intervals.day * 7) {
        counter = Math.floor(seconds / intervals.day);
        return counter === 1 ? "yesterday" : `${counter} days ago`;
    } else if (seconds < intervals.month * 12) {
        counter = Math.floor(seconds / intervals.week);
        return counter === 1 ? "last week" : `${counter} weeks ago`;
    } else if (seconds < intervals.year) {
        counter = Math.floor(seconds / intervals.month);
        return counter === 1 ? "last month" : `${counter} months ago`;
    } else {
        counter = Math.floor(seconds / intervals.year);
        return counter === 1 ? "last year" : `${counter} years ago`;
    }
}

// Example usage:

export default timeSinceAlt