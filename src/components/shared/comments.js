import { Avatar, FormControl, HStack, Select, Stack, Text } from '@chakra-ui/react'

export const Comments = ({ comments, artQuery }) => {
  // TODO List comments including threads of each comment

  console.log('comments', comments)
  return (
    <Stack spacing={-4}>
      <HStack justifyContent={'space-between'} alignItems='baseline'>
        <Stack>
          <Text ml='6' mt='4' textAlign='left' fontSize={'20px'} color={'#2D3748'} fontWeight='semibold'>
            Comments
          </Text>
        </Stack>
        <Stack p={6}>
          <FormControl>
            {/* <FormLabel htmlFor='country'>Country</FormLabel> */}
            <Select id='country' placeholder='Popular'>
              <option>Genel</option>
              <option>Ozel</option>
            </Select>
          </FormControl>
        </Stack>
      </HStack>
      <HStack p={6} rounded='lg'>
        <Avatar size='sm' src={`${artQuery.data?.artist?.user?.data?.attributes.avatar?.data?.attributes.url}`} />
        <Stack fontSize={'14px'}>
          <Text textAlign='left' color={'#2D3748'} fontWeight='semibold'>
            Username
          </Text>
          <Text ml='6' mt='4' textAlign='left' color={'#2D3748'}>
            Comments should be seen on that side
          </Text>
        </Stack>
      </HStack>
      <Stack fontSize={'14px'}>
        <HStack p={6} rounded='lg'>
          <Avatar size='sm' src={`${artQuery.data?.artist?.user?.data?.attributes.avatar?.data?.attributes.url}`} />
          <Stack>
            <Text textAlign='left' color={'#2D3748'} fontWeight='semibold'>
              Username
            </Text>
            <Text ml='6' mt='4' textAlign='left' color={'#2D3748'} maxW={350}>
              Bu projeyle evrensel insan haklarının medya ve iletişim yoluyla anlatılabilmesi için; oyunculuk,
              yönetmenlik, senaristlik gibi alanlarda tecrübe kazanma, tecrübeleri geliştirme ve sayılan alanlarda
              stajla birlikte referans sağlama amaçlanmaktadır. Kısa film, tiyatro gibi projelerin geliştirilmesi
              düşünülmektedir.
            </Text>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  )
}
