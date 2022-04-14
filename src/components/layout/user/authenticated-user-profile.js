import { Avatar, Button, ButtonGroup, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { useAuth } from '~hooks'
import { request } from '~lib'

export const AuthenticatedUserProfile = () => {
  const user = useAuth()
  const [arts, setArts] = useState(null)
  const [showArt, setShowArt] = useState(true)
  const [tools, setTools] = useState(false)
  const { locale } = useRouter()
  useEffect(() => {
    const getData = async () => {
      await request({
        url: 'api/arts',
        locale: locale,
        filters: {
          artist: {
            user: {
              id: {
                $eq: user.id,
              },
            },
          },
        },
        populate: ['artist.user', 'images'],
      })
        .then(res => setArts(res.result))
        .catch(er => console.log('Error ', er))
    }
    getData()
  }, [user.id])

  const rejected = arts?.filter(art => art.status === 'rejected')
  const approved = arts?.filter(art => art.status === 'approved')

  console.log('Arts> ', arts, '\n', 'rejected> ', rejected, 'approved; ', approved, 'user: ', user)

  const showApproved = e => {
    e.preventDefault()
    setShowArt(true)
    setTools(false)
  }
  const showRejected = e => {
    e.preventDefault()
    setShowArt(false)
    setTools(false)
  }
  const showTools = e => {
    e.preventDefault()
    setTools(true)
  }
  return (
    <Stack spacing={4} align='stretch'>
      <VStack
        direction='center'
        align='center'
        height={'300px'}
        backgroundImage='https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
        justifyContent='flex-end'
        alignItems={'center'}
        alignContent={'flex-end'}
      >
        <Avatar
          boxSize={{ base: 10, lg: 12 }}
          src={`${process.env.NEXT_PUBLIC_API_URL}${user?.user?.avatar?.formats.thumbnail.url || user.avatar?.url}`}
          name={user?.user?.username}
        />
        <HStack justifyContent='center' alignItems={'center'} alignContent={'flex-end'} bg='transparent'>
          <Text color={'white'}>{user?.user?.username}</Text>
        </HStack>
      </VStack>

      <vStack direction='flex' justify='space-between'>
        <ButtonGroup colorScheme='blue.400' variant='ghost'>
          <Button onClick={showApproved}>My arts</Button>
          <Button onClick={showRejected}>My Returned Arts</Button>
          <Button onClick={showTools}>General Tools</Button>
        </ButtonGroup>
        <Stack>
          {tools ? (
            <>
              {
                //gereral tools here
              }
              <Stack>
                <Text>Username: {user?.user?.username}</Text>
                <Text>Email: {user?.user?.email}</Text>
              </Stack>
            </>
          ) : showArt ? (
            <HStack direction={'flex'}>
              {
                //Appraved Arts  here
              }
              {approved?.map(art => {
                return art?.images?.map((el, index) => {
                  return (
                    <VStack key={index} alt='no image'>
                      <Image src={process.env.NEXT_PUBLIC_API_URL + el.formats?.thumbnail?.url} alt='no image' />
                      <HStack>
                        <Text>{art.title}</Text>
                        <Text>Likes: {art.likes}</Text>
                      </HStack>
                    </VStack>
                  )
                })
              })}
            </HStack>
          ) : (
            <HStack direction={'flex'}>
              {
                //Rejected Arts  here
              }
              {rejected?.map(art => {
                return art?.images?.map((el, index) => {
                  return (
                    <VStack key={index} alt='no image'>
                      <Image src={process.env.NEXT_PUBLIC_API_URL + el.formats?.thumbnail?.url} alt='no image' />
                      <HStack>
                        <Text>{art.title}</Text>
                        <Text>Likes: {art.likes}</Text>
                      </HStack>
                    </VStack>
                  )
                })
              })}
            </HStack>
          )}
        </Stack>
      </vStack>
    </Stack>
  )
}
