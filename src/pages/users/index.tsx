import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import { RiAddLine } from 'react-icons/ri'
import { Pagination } from '../../components/Pagination'
import { Header } from '../../components/Header'
import NextLink from 'next/link'
import { useUsers } from '../../services/hooks/useUsers'
import { useState } from 'react'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(page)

  console.log('DATAAA', data)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    // 1 - pass the same data of useQuery,
    // 2 - function for fatch the data,
    // 3 - staleTime (time to refresh automatically)
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`/users/${userId}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    )
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex={1} borderRadius={8} bg="gray.800" p="8">
          <Flex mb={8} justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml={4} />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Text>Ocorreu um erro ao carregar os usuários</Text>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" w={8}>
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w={4}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data!.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data!.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
