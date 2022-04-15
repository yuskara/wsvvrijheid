import {
  Avatar,
  Box,
  HStack,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

import { useAuth } from '~hooks'
import { request } from '~lib'

export const AuthenticatedUserProfile = () => {
  const user = useAuth()
  const [arts, setArts] = useState(null)
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
      <Tabs isLazy>
        <TabList>
          <Tab>My Arts</Tab>
          <Tab>My Rejected Arts</Tab>
          <Tab>General Tools</Tab>
        </TabList>
        <TabPanels>
          {/* Approved arts */}
          <TabPanel>
            <HStack>
              {approved?.map(art => {
                return art?.images?.map((images, index) => {
                  return <Arts art={art} images={images} key={index} />
                })
              })}
            </HStack>
          </TabPanel>
          {/* rejected arts */}
          <TabPanel>
            <HStack>
              {rejected?.map(art => {
                return art?.images?.map((images, index) => {
                  return <Arts art={art} images={images} key={index} />
                })
              })}
            </HStack>
          </TabPanel>
          {/* general tools*/}
          <TabPanel>
            <Tools user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}

export const Tools = props => {
  const { user } = props
  return (
    <Stack>
      <Text>Username: {user?.user?.username}</Text>
      <Text>Email: {user?.user?.email}</Text>
    </Stack>
  )
}
export const Arts = props => {
  const { art, images, index } = props
  return (
    <VStack key={index} alt='no image'>
      <Image src={process.env.NEXT_PUBLIC_API_URL + images.formats?.thumbnail?.url} alt='no image' />
      <HStack>
        <Text>{art.title}</Text>
        <Box as={FaHeart} color='red'></Box>
        <Text> {art.likes}</Text>
      </HStack>
    </VStack>
  )
}
