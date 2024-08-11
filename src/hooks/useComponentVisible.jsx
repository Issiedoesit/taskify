import { useEffect } from 'react';

export default function useComponentVisible(dropBtn, dropContent, callback) {
    const handleClickOutside = (e) => {
        if (!(dropContent?.current?.contains(e.target) || dropBtn?.current?.contains(e.target))) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [dropBtn, dropContent, callback]);
}
