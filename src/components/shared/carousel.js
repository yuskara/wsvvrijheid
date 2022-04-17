import { Box, Button, Flex, HStack, Stack, useMediaQuery, useTheme, VStack } from '@chakra-ui/react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

import { useBoundingRect } from '~hooks'

const MotionFlex = motion(Flex)

const transitionProps = {
  stiffness: 400,
  type: 'spring',
  damping: 60,
  mass: 3,
}

export const ChakraCarousel = ({ children, gap, slidePerView = { base: 1, md: 1, xl: 1 } }) => {
  const [trackIsActive, setTrackIsActive] = useState(false)
  const [multiplier, setMultiplier] = useState(0.35)
  const [sliderWidth, setSliderWidth] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const [constraint, setConstraint] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)

  const initSliderWidth = useCallback(width => setSliderWidth(width), [])

  const positions = useMemo(
    () => children.map((_, index) => -Math.abs((itemWidth + gap) * index)),
    [children, itemWidth, gap],
  )

  const { breakpoints } = useTheme()

  const [isBetweenBaseAndMd] = useMediaQuery(`(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.md})`)

  const [isBetweenMdAndXl] = useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.xl})`)

  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`)

  useEffect(() => {
    const multipliers = {
      1: 0.65,
      2: 0.5,
      3: 0.35,
    }

    if (isBetweenBaseAndMd) {
      setItemWidth(sliderWidth / (slidePerView.base || 1) - gap)
      setMultiplier(multipliers[slidePerView.base] || 0.65)
      setConstraint(slidePerView.base || 1)
    }
    if (isBetweenMdAndXl) {
      setItemWidth(sliderWidth / (slidePerView.md || 2) - gap)
      setMultiplier(multipliers[slidePerView.md] || 0.5)
      setConstraint(slidePerView.md || 2)
    }
    if (isGreaterThanXL) {
      setItemWidth(sliderWidth / (slidePerView.xl || 3) - gap)
      setMultiplier(multipliers[slidePerView.xl] || 0.35)
      setConstraint(slidePerView.xl || 3)
    }
  }, [isBetweenBaseAndMd, isBetweenMdAndXl, isGreaterThanXL, sliderWidth, gap, slidePerView])

  const sliderProps = {
    setTrackIsActive,
    initSliderWidth,
    setActiveItem,
    activeItem,
    constraint,
    positions,
    gap,
  }

  const trackProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    sliderWidth,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
    gap,
  }

  const itemProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
  }

  return (
    <Slider {...sliderProps}>
      <Track {...trackProps}>
        {children.map((child, index) => (
          <Item {...itemProps} index={index} key={index}>
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  )
}

const Slider = ({
  setTrackIsActive,
  initSliderWidth,
  setActiveItem,
  activeItem,
  constraint,
  positions,
  children,
  gap,
}) => {
  const [ref, { width }] = useBoundingRect()

  useLayoutEffect(() => initSliderWidth(Math.round(width)), [width, initSliderWidth])

  const handleFocus = () => setTrackIsActive(true)

  const handleDecrementClick = () => {
    setTrackIsActive(true)
    !(activeItem === positions.length - positions.length) && setActiveItem(prev => prev - 1)
  }

  const handleIncrementClick = () => {
    setTrackIsActive(true)
    !(activeItem === positions.length - constraint) && setActiveItem(prev => prev + 1)
  }

  return (
    <>
      <Stack
        role='group'
        ref={ref}
        w={{ base: '100%', md: `calc(100% + ${gap}px)` }}
        ml={{ base: 0, md: `-${gap / 2}px` }}
        px={`${gap / 2}px`}
        position='relative'
        overflow='hidden'
        _before={{
          bgGradient: 'linear(to-r, gray.100, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          left: 0,
          top: 0,
        }}
        _after={{
          bgGradient: 'linear(to-l, gray.100, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          right: 0,
          top: 0,
        }}
      >
        {children}
        {positions.length > 1 && (
          <>
            <HStack pos='absolute' bottom={2} w='full' spacing={0.5} justify='center'>
              {Array.from({ length: positions.length }).map((_, index) => (
                <Box
                  rounded='full'
                  boxSize={index === activeItem ? 2.5 : 2}
                  bg={index === activeItem ? 'whiteAlpha.700' : 'whiteAlpha.500'}
                  key={index}
                />
              ))}
            </HStack>
            <Flex
              opacity={0.5}
              _groupHover={{ opacity: 0.7, left: 1, right: 1 }}
              pos='absolute'
              top='50%'
              transition='all 0.2s'
              transform='translateY(-50%)'
              left={0}
              right={0}
              justify='space-between'
            >
              <Button
                onClick={handleDecrementClick}
                onFocus={handleFocus}
                ml={`${gap / 3}px`}
                color='gray.200'
                variant='link'
                zIndex={2}
                minW={0}
              >
                <Box as={FaChevronCircleLeft} boxSize={6} />
              </Button>

              <Button
                onClick={handleIncrementClick}
                onFocus={handleFocus}
                ml={`${gap / 3}px`}
                color='gray.200'
                variant='link'
                zIndex={2}
                minW={0}
              >
                <Box as={FaChevronCircleRight} boxSize={6} />
              </Button>
            </Flex>
          </>
        )}
      </Stack>
    </>
  )
}

const Track = ({
  setTrackIsActive,
  trackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  multiplier,
  itemWidth,
  positions,
  children,
}) => {
  const [dragStartPosition, setDragStartPosition] = useState(0)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const node = useRef(null)

  const handleDragStart = () => setDragStartPosition(positions[activeItem])

  const handleDragEnd = (_, info) => {
    const distance = info.offset.x
    const velocity = info.velocity.x * multiplier
    const direction = velocity < 0 || distance < 0 ? 1 : -1

    const extrapolatedPosition =
      dragStartPosition + (direction === 1 ? Math.min(velocity, distance) : Math.max(velocity, distance))

    const closestPosition = positions.reduce((prev, curr) => {
      return Math.abs(curr - extrapolatedPosition) < Math.abs(prev - extrapolatedPosition) ? curr : prev
    }, 0)

    if (!(closestPosition < positions[positions.length - constraint])) {
      setActiveItem(positions.indexOf(closestPosition))
      controls.start({
        x: closestPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      })
    } else {
      setActiveItem(positions.length - constraint)
      controls.start({
        x: positions[positions.length - constraint],
        transition: {
          velocity: info.velocity.x,
          ...transitionProps,
        },
      })
    }
  }

  const handleResize = useCallback(
    () =>
      controls.start({
        x: positions[activeItem],
        transition: {
          ...transitionProps,
        },
      }),
    [activeItem, controls, positions],
  )

  const handleClick = useCallback(
    event => (node?.current?.contains(event.target) ? setTrackIsActive(true) : setTrackIsActive(false)),
    [setTrackIsActive],
  )

  const handleKeyDown = useCallback(
    event => {
      if (trackIsActive) {
        if (activeItem < positions.length - constraint) {
          if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveItem(prev => prev + 1)
          }
        }
        if (activeItem > positions.length - positions.length) {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault()
            setActiveItem(prev => prev - 1)
          }
        }
      }
    },
    [trackIsActive, setActiveItem, activeItem, constraint, positions.length],
  )

  useEffect(() => {
    handleResize(positions)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick, handleResize, handleKeyDown, positions])

  return (
    <>
      {itemWidth && (
        <VStack ref={node} spacing={5} alignItems='stretch'>
          <MotionFlex
            dragConstraints={node}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x }}
            drag='x'
            _active={{ cursor: 'grabbing' }}
            minWidth='min-content'
            flexWrap='nowrap'
            cursor='grab'
          >
            {children}
          </MotionFlex>
        </VStack>
      )}
    </>
  )
}

const Item = ({
  setTrackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  index,
  gap,
}) => {
  const [userDidTab, setUserDidTab] = useState(false)

  const handleFocus = () => setTrackIsActive(true)

  const handleBlur = () => {
    userDidTab && index + 1 === positions.length && setTrackIsActive(false)
    setUserDidTab(false)
  }

  const handleKeyUp = event =>
    event.key === 'Tab' && !(activeItem === positions.length - constraint) && setActiveItem(index)

  const handleKeyDown = event => event.key === 'Tab' && setUserDidTab(true)

  return (
    <Flex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      w={`${itemWidth}px`}
      _notLast={{
        mr: `${gap}px`,
      }}
    >
      {children}
    </Flex>
  )
}
