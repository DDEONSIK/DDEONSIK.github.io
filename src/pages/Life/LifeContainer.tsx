import React from 'react';
import LifeView from './LifeView';
import { motion } from 'framer-motion';

const LifeContainer = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <LifeView />
        </motion.div>
    );
};

export default LifeContainer;
