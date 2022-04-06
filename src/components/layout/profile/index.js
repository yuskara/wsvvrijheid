import { Button, Menu, MenuButton, MenuGroup, MenuDivider, MenuItem, MenuList, Box, Link, Stack, Text, VStack, HStack, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { setToken, getToken, getUserFromStorage, removeDataFromLocalStorage } from 'utils/services'

import axios from 'axios'

export const Profile = () => {
    const { locale } = useRouter()
    const [user, setUser] = useState(null)
    const router = useRouter();

    useEffect(() => {
        // getToken from localstorage
        const user = getUserFromStorage()
        if (user) {
            console.log("user: ", user.username)
            setUser(user)
        }
        // Request API.
        const tokenLocal = getToken()
        console.log("Token", tokenLocal)
        /*
        axios
            .post('https://api.samenvvv.nl/api/me', {
                headers: {
                    Authorization: `<Bearer ${tokenLocal}`
                }
            })
            .then((response) => {
                // Handle success.
                console.log("response", response)

            })
            .catch((error) => {
                // Handle error.
                console.log('An error occurred:', error);

            });
            */
    }, []);

    const logOut = (e) => {
        e.preventDefault()
        removeDataFromLocalStorage()
        setToken(null)
        setUser(null)
        router.push("/");
    }
    return (
        <Flex py={1} justify='flex-end' margin='10px'>
            {
                user ?
                    <Menu>
                        <MenuButton bg='blue.500' borderRadius='full' as={Button} colorScheme='blue' >{user ? user.username : ""}</MenuButton>
                        <MenuList>
                            <MenuGroup title='Profile'>
                                <MenuItem> <Button onClick={logOut}>Log Out</Button></MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Help'>
                                <MenuItem>Docs</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                    :
                    <HStack>
                        <Link href={'/login'}> <Text>Sign in</Text></Link>
                        <Link href={'/sign-up'}> <Text>SignUp</Text></Link>
                    </HStack>
            }
        </Flex>
    )
}