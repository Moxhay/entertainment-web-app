import PropTypes from 'prop-types'
import ItemDetails from '@components/itemList/itemDetails.jsx'
import PlayOverlay from '@components/itemList/PlayOverlay.jsx'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import ButtonBookmarked from '@components/itemList/ButtonBookmarked.jsx'

// eslint-disable-next-line react/prop-types
export const TrendingList = ({ data, handleBookmarked, loadingBookmarked }) => {
    const [border, setBorder] = useState({})
    const { pathname } = useLocation()
    const sliderRef = useRef(null)
    const slidesRef = useRef(null)

    const [sliderWidth, setSliderWidths] = useState(0)
    const [slidesWidth, setSlidesWidths] = useState(0)

    const slideMarginRight = 15
    // eslint-disable-next-line react/prop-types
    const totalSlidesMarginRight = slideMarginRight * data.length

    useEffect(() => {
        const measureSliderWidth = () => {
            setSliderWidths(sliderRef.current.clientWidth)
        }

        const measureSlidesWidth = () => {
            const slidesNode = slidesRef.current.childNodes
            const slidesArr = Array.from(slidesNode)
            const slidesSumWidth = slidesArr.reduce(
                (acc, node) => acc + node.clientWidth,
                0
            )
            setSlidesWidths(slidesSumWidth)
        }

        measureSliderWidth()
        measureSlidesWidth()

        window.addEventListener('resize', measureSliderWidth)
        window.addEventListener('resize', measureSlidesWidth)

        return () => {
            window.removeEventListener('resize', measureSliderWidth)
            window.removeEventListener('resize', measureSlidesWidth)
        }
    }, [sliderWidth, slidesWidth])
    return (
        <motion.div
            className="flex w-full flex-col gap-3"
            ref={sliderRef}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <h1 className="text-xl font-light md:text-3xl">Trending</h1>
            <motion.div
                className="flex h-full w-max cursor-grabbing gap-2 overflow-x-auto"
                ref={slidesRef}
                drag="x"
                dragConstraints={{
                    left: -(slidesWidth - sliderWidth + totalSlidesMarginRight),
                    right: 0,
                }}
                dragElastic={0.2}
                dragTransition={{ bounceDamping: 18 }}
            >
                {
                    // eslint-disable-next-line react/prop-types
                    data.map(
                        ({
                            id,
                            documentId,
                            title,
                            poster,
                            release_date,
                            rated,
                            type,
                            bookmarked,
                        }) => {
                            return (
                                <div
                                    className="relative z-50 flex h-[140px] w-[240px] md:h-[230px] md:w-[470px]"
                                    key={id + documentId}
                                >
                                    <img
                                        className="aspect-square h-full w-full rounded-xl object-fill"
                                        src={poster}
                                        alt={title}
                                    />
                                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                                        <ItemDetails
                                            release_date={release_date}
                                            type={type}
                                            rated={rated}
                                            title={title}
                                            titleFontSize={
                                                'text-sm md:text-2xl font-medium'
                                            }
                                            contentFontSize={
                                                'text-xs md:text-sm'
                                            }
                                        />
                                    </div>
                                    <ButtonBookmarked
                                        type={type}
                                        bookmarked={bookmarked}
                                        setBorder={setBorder}
                                        border={border}
                                        handleBookmarked={handleBookmarked}
                                        loadingBookmarked={loadingBookmarked}
                                        id={id}
                                    />
                                    <PlayOverlay
                                        title={title}
                                        type={type}
                                        pathname={pathname}
                                    />
                                </div>
                            )
                        }
                    )
                }
            </motion.div>
        </motion.div>
    )
}

TrendingList.propType = {
    data: PropTypes.object.isRequired,
}
