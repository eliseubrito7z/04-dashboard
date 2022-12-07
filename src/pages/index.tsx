import {
  Button,
  Flex,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { Input } from '../components/Form/Input'

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <VStack
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8" // 2rem
        borderRadius={8}
      >
        <Stack spacing={4} w="100%" mb="6">
          <Input name='email' type="email" label='E-mail'/>
          <Input name='password' type="password" label='Senha'/>
        </Stack>

        <Button w="100%" type="submit" colorScheme={'pink'} size="lg">
          Entrar
        </Button>
      </VStack>
    </Flex>
  )
}
