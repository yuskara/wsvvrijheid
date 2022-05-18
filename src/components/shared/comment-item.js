import { Avatar, HStack, Stack, Text } from '@chakra-ui/react'
import { formatDistanceStrict } from 'date-fns'
import React from 'react'

export const CommentItem = ({ comment }) => {
  return (
    <HStack p={6} rounded='lg' alignItems='flex-start' maxW={600}>
      <Avatar size='sm' src={`${comment.user.avatar.url}`} name={`${comment.user.username}`} />
      <Stack fontSize={'14px'}>
        <HStack>
          <Text textAlign='left' textColor='gray.700' fontWeight='semibold' fontSize='sm' lineHeight={5}>
            {comment.user.username}
          </Text>
          <Text textColor='gray.500' fontSize='xs' lineHeight={4}>
            {' '}
            {formatDistanceStrict(new Date(comment.createdAt), new Date())}{' '}
          </Text>
        </HStack>

        <Text ml='6' mt='4' textAlign='left' textColor='gray.700' fontSize='sm' noOfLines={3}>
          {comment.content}
        </Text>
      </Stack>
    </HStack>
  )
}
