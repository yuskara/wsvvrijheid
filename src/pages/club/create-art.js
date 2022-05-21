import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useQuery } from 'react-query'

import { useAuth } from '~hooks'
import { mutation, request } from '~lib'

const CreateArt = () => {
  const inputFile = useRef(null)
  const userInfo = useAuth()
  const { data, isLoading } = useQuery('categories', () => request({ url: 'api/categories', populate: '' }))
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const submitArt = () => {
    console.log(inputFile)
    const formData = new FormData()
    formData.append('data', { locale: 'en', title: title, description: description })
    formData.append(`files.images`, inputFile.current.files)

    mutation
      .post('api/arts', formData)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  return (
    <Flex bg={'white'} w={'60%'} p={4} m={'auto'} mt={10} h={'fit-content'}>
      <Box
        bg={'rgba(0, 0, 0, 0.10)'}
        w='30%'
        p={4}
        color='white'
        cursor={'pointer'}
        onClick={() => {
          inputFile.current.click()
        }}
      >
        <input type={'file'} style={{ display: 'none' }} ref={inputFile} multiple />

        <Box
          border={'1px dotted gray'}
          padding={'10px'}
          color={'black'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          p={9}
          h={'100%'}
        >
          <AiOutlineCloudUpload />
          Click to Upload
          <Box paddingTop={'80px'} fontSize={'small'} textAlign={'center'} mt={'50%'} color={'gray'}>
            Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
          </Box>
        </Box>
      </Box>
      <Box marginLeft={'auto'} marginRight={'auto'} w={'60%'}>
        <Input
          type={'text'}
          placeholder={'Add your title'}
          _placeholder={{ fontSize: '24px', fontWeight: '600' }}
          border={'none'}
          outline={'0'}
          borderBottom={'2px solid lightgray'}
          borderRadius={'0'}
          focusBorderColor={'white white black white'}
          mt={5}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Flex m={3} display={'flex'} alignItems={'center'} mt={5}>
          <Box
            bg={'var(--wsvv-colors-blue-500)'}
            color={'white'}
            p={2}
            borderRadius={'50%'}
            w={'40px'}
            h={'40px'}
            textAlign={'center'}
          >
            {userInfo.isLoggedIn &&
              !userInfo.isLoading &&
              userInfo.user.username.split('').slice(0, 1).join('').toUpperCase()}
          </Box>
          <Box ml={2}>{userInfo.isLoggedIn && !userInfo.isLoading && userInfo.user.username}</Box>
        </Flex>
        <Input
          type={'text'}
          placeholder={'Tell everyone what your Art is about'}
          _placeholder={{ fontSize: '24px', fontWeight: '300' }}
          border={'none'}
          outline={'0'}
          borderBottom={'2px solid lightgray'}
          borderRadius={'0'}
          focusBorderColor={'white white black white'}
          mt={5}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Text mt={5}>Choose Art Category</Text>
        <Select
          border={'none'}
          outline={'0'}
          borderBottom={'2px solid lightgray'}
          borderRadius={'0'}
          focusBorderColor={'white white black white'}
          mt={5}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          {!isLoading && data.result.map((item, index) => <option key={'categories' + index}>{item.name_en}</option>)}
        </Select>
        <Box display={'flex'} justifyContent={'end'}>
          <Button bg={'var(--wsvv-colors-blue-500)'} color={'white'} mt={5} onClick={submitArt}>
            Save
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}

export default CreateArt
