import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { ItemListContainer } from '@components/itemList/ItemListContainer.jsx'
import ItemCard from '@components/itemList/itemCard.jsx'

const ItemList = ({ data, title, loadingBookmarked, handleBookmarked }) => {
    const location = useLocation()
    const { pathname } = location
    const [border, setBorder] = useState({})
    const [zIndex, setZIndex] = useState(10)

    return (
        <AnimatePresence mode={'wait'}>
            <motion.div
                className="flex flex-col gap-5 overflow-hidden text-primaryWhite"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                style={{ zIndex: zIndex }}
                onAnimationComplete={() => setZIndex(50)}
                key={location.key}
            >
                <h1 className="self-start font-Inter text-2xl font-extralight text-primaryWhite">
                    {title}
                </h1>

                <ItemListContainer>
                    {data.map((item) => {
                        return (
                            <ItemCard
                                key={item.id + item.documentId}
                                {...item}
                                loadingBookmarked={loadingBookmarked}
                                handleBookmarked={handleBookmarked}
                                border={border}
                                setBorder={setBorder}
                                pathname={pathname}
                            />
                        )
                    })}
                </ItemListContainer>
            </motion.div>
        </AnimatePresence>
    )
}

ItemList.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
    loadingBookmarked: PropTypes.object.isRequired,
    handleBookmarked: PropTypes.func.isRequired,
}

export default ItemList
