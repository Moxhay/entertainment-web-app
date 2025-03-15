import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export function TrendingListGallery({ children, slidesRef, slidesWidth, sliderWidth, totalSlidesMarginRight }) {
    return (
        <motion.div
            className="flex h-full w-max cursor-grabbing gap-2 overflow-hidden"
            ref={slidesRef}
            drag="x"
            dragConstraints={{
                left: -(slidesWidth - sliderWidth + totalSlidesMarginRight),
                right: 0
            }}
            dragElastic={0.2}
            dragTransition={{ bounceDamping: 18 }}
        >
            {children}
        </motion.div>
    );
}

TrendingListGallery.propTypes = {
    children: PropTypes.node,
    slidesRef: PropTypes.object.isRequired,
    slidesWidth: PropTypes.number.isRequired,
    sliderWidth: PropTypes.number.isRequired,
    totalSlidesMarginRight: PropTypes.number.isRequired
};
