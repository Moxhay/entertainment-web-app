import { useEffect, useRef, useState } from 'react';

export function useGallery(data) {
    const sliderRef = useRef(null);
    const slidesRef = useRef(null);

    const [sliderWidth, setSliderWidths] = useState(0);
    const [slidesWidth, setSlidesWidths] = useState(0);
    const [totalSlidesMarginRight, setTotalSlidesMarginRight] = useState(0);

    useEffect(() => {
        const measureSliderWidth = () => {
            setSliderWidths(sliderRef.current.clientWidth);
        };

        const measureSlidesWidth = () => {
            const slidesNode = slidesRef.current.childNodes;
            const slidesArr = Array.from(slidesNode);
            const slidesSumWidth = slidesArr.reduce((acc, node) => acc + node.clientWidth, 0);
            setSlidesWidths(slidesSumWidth);

            const slideMarginRight = slidesArr.length > 1 ? 8 : 0;
            setTotalSlidesMarginRight(slideMarginRight * slidesArr.length);
        };

        measureSliderWidth();
        measureSlidesWidth();

        window.addEventListener('resize', measureSliderWidth);
        window.addEventListener('resize', measureSlidesWidth);

        return () => {
            window.removeEventListener('resize', measureSliderWidth);
            window.removeEventListener('resize', measureSlidesWidth);
        };
    }, [data.length, sliderWidth, slidesWidth]);

    return {
        sliderRef,
        slidesRef,
        sliderWidth,
        slidesWidth,
        totalSlidesMarginRight
    };
}
