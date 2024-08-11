import React, {useState, useEffect} from 'react'
// import _ from 'https://underscorejs.org/underscore-esm-min.js';
import { debounce } from "lodash"

// const useScrollDirection = ({
//     ref,
//     threshold,
//     debounce,
//     scrollHeightThreshold,
// }) => {
//     threshold = threshold || 10;
//     debounce = debounce || 10;
//     scrollHeightThreshold = scrollHeightThreshold || 0;
//     const [scrollDir, setScrollDir] = useState(null);
//     const debouncedSetScrollDir = _.debounce(setScrollDir, debounce);

//     useEffect(() => {
//         let lastScrollY = ref?.current?.scrollTop;
//         let lastScrollDir;
//         let ticking = false;
//         const hasScrollHeightThreshold =
//             ref?.current?.scrollHeight - ref?.current?.clientHeight >
//             scrollHeightThreshold;

//         const updateScrollDir = () => {
//             const scrollY = ref?.current?.scrollTop;
//             if (
//                 Math.abs(scrollY - lastScrollY) < threshold ||
//                 !hasScrollHeightThreshold
//             ) {
//                 ticking = false;
//                 return;
//             }
//             const newScroll = scrollY > lastScrollY ? 'down' : 'up';
//             if (newScroll !== lastScrollDir) {
//                 debouncedSetScrollDir(newScroll);
//             }
//             lastScrollY = scrollY > 0 ? scrollY : 0;
//             lastScrollDir = newScroll;
//             ticking = false;
//         };

//         const onScroll = () => {
//             if (!ticking) {
//                 window.requestAnimationFrame(updateScrollDir);
//                 ticking = true;
//             }
//         };
//         console.log(ref)

//         ref?.current?.addEventListener('scroll', onScroll);

//         return () => window.removeEventListener('scroll', onScroll);
//     }, []);

//     return {scrollDir};
// };


const useScrollDirection = () => {
    const [currentScroll, setCurrentScroll] = useState(0)
    const [lastScroll, setLastScroll] = useState(0)
    const [scrollUp, setScrollUp] = useState(false)
    
    const handleScroll = debounce(() => {
        setCurrentScroll(window.scrollY);

        // console.log(currentScroll)
    
        // check if current scroll 
        // more than last scroll
        if (currentScroll > lastScroll) {
          setScrollUp(false);
        } else {
          setScrollUp(true);
        }
        setLastScroll(currentScroll); // change the last scroll
      }, 10); // Debounce time in milliseconds
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        }
      }, [currentScroll]);
    
    return {scrollUp}
}


export default useScrollDirection