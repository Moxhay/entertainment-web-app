import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export function TransitionEnterExitWithAnimationState({ children, setAnimationState, animationState }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{
                opacity: 1,
                x: 0
            }}
            exit={{ opacity: 0, x: '200%' }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            onAnimationComplete={() => setAnimationState(!animationState)}
        >
            {children}
        </motion.div>
    );
}

TransitionEnterExitWithAnimationState.propTypes = {
    children: PropTypes.node,
    setAnimationState: PropTypes.func,
    animationState: PropTypes.bool
};
