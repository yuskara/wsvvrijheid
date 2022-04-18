import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { MdDeleteOutline, MdOutlinePublishedWithChanges, MdOutlineUnpublished } from 'react-icons/md'

import { ChakraCarousel } from './carousel'

export const ArtCard = ({ art, user }) => {
  const [actionType, setActionType] = useState()

  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // FIXME
  // `transformStrapiData` should be refactored
  // We didn't expect to have `user.data.attributes` in the response
  const isOwner = user.id === art.artist.user.data.id

  // TODO Add publish action if `publicationState` of the art is `draft`
  const actions = {
    delete: {
      title: t`profile.art.delete.title`,
      text: t`profile.art.delete.text`,
      button: t`profile.art.delete.button`,
      colorScheme: 'red',
      // TODO Create useDeleteArt hook and invalidate cache
      action: function onDeleteArt() {},
    },
    unpublish: {
      title: t`profile.art.unpublish.title`,
      text: t`profile.art.unpublish.text`,
      button: t`profile.art.unpublish.button`,
      colorScheme: 'orange',
      // TODO Create usePublishArt({ publish: false }) hook and invalidate cache
      action: function onUnpublishArt() {},
    },
    publish: {
      title: t`profile.art.publish.title`,
      text: t`profile.art.publish.text`,
      button: t`profile.art.publish.button`,
      colorScheme: 'orange',
      // TODO Create usePublishArt({ publish: true }) hook and invalidate cache
      action: function onPublishArt() {},
    },
  }

  const onHandleAction = type => {
    onOpen()
    setActionType(type)
  }

  return (
    <>
      {/* Card Action Alert Dialog */}
      {actionType && (
        <AlertDialog isCentered isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {actions[actionType].title}
              </AlertDialogHeader>

              <AlertDialogBody>{actions[actionType].text}</AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme={actions[actionType].colorScheme} onClick={actions[actionType].action} ml={3}>
                  {actions[actionType].button}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}

      <Stack pos='relative' role='group'>
        {/* Card Image */}
        <ChakraCarousel gap={4} slidePerView={{ md: 1, xl: 1 }}>
          {art?.images?.map((image, index) => (
            <Image
              key={index}
              pos='relative'
              zIndex={-1}
              h={300}
              w='full'
              objectFit='cover'
              src={process.env.NEXT_PUBLIC_API_URL + image.url}
              alt={art.title}
              rounded='md'
              userSelect='none'
            />
          ))}
        </ChakraCarousel>

        {/* Card Actions */}
        {isOwner && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Art actions'
              pos='absolute'
              zIndex={1}
              top={0}
              right={2}
              colorScheme='blackAlpha'
              color='white'
              icon={<BsThreeDotsVertical />}
              opacity={0}
              _groupHover={{ opacity: 1 }}
              transition='opacity 0.2s'
            />
            <MenuList fontSize='md'>
              {art.publishedAt && (
                <MenuItem onClick={() => onHandleAction('unpublish')}>
                  <Box as={MdOutlineUnpublished} mr={2} />
                  {t`profile.art.unpublish.button`}
                </MenuItem>
              )}
              {!art.publishedAt && (
                <MenuItem onClick={() => onHandleAction('publish')}>
                  <Box as={MdOutlinePublishedWithChanges} mr={2} />
                  {t`profile.art.publish.button`}
                </MenuItem>
              )}
              <MenuItem color='red.500' onClick={() => onHandleAction('delete')}>
                <Box as={MdDeleteOutline} mr={2} />
                {t`profile.art.delete.button`}
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        {!art.publishedAt && (
          <Badge variant='outline' userSelect='none' pos='absolute' top={0} left={2}>
            Draft
          </Badge>
        )}

        {/* Card Footer */}
        <HStack justify='space-between'>
          <Text isTruncated>{art.title}</Text>
          <HStack>
            <Box as={FaRegHeart} color='red'></Box>
            <Text>{art.likes}</Text>
          </HStack>
        </HStack>
      </Stack>
    </>
  )
}
