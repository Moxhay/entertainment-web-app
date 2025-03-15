import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export function TransitionEnterExit({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.7, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
}

TransitionEnterExit.propTypes = {
    children: PropTypes.node
};
