import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const CreateUserFormSchema = z
  .object({
    name: z.string().min(2, { message: 'Nome obrigatório' }),
    email: z.string().email({ message: 'Endereço de email invalido!' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres! ' }),
    passwordConfirmation: z
      .string()
      .min(6, { message: 'As senhas devem ser iguais ' }),
  })
  .required()
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas precisam ser iguais',
      })
    }
  })

type createUserFormData = z.infer<typeof CreateUserFormSchema>

export default function CreateUser() {
  const { register, handleSubmit, formState, reset } =
    useForm<createUserFormData>({
      resolver: zodResolver(CreateUserFormSchema),
      defaultValues: {
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
      },
    })
  const { errors, isSubmitting } = formState

  const handleCreateUser = async (data: createUserFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('NEW USER', data)
    reset()
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
        <Sidebar />

        <Box
          as="form"
          flex={1}
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my={6} borderColor="gray.700" />

          <VStack spacing={8}>
            <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
              <Input
                error={errors.name}
                label="Nome Completo"
                {...register('name')}
              />
              <Input
                error={errors.email}
                type="email"
                label="E-mail"
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={240} spacing={['6', '8']} w="100%">
              <Input
                error={errors.password}
                type="password"
                label="Senha"
                {...register('password')}
              />
              <Input
                error={errors.passwordConfirmation}
                type="password"
                label="Confirmação da senha"
                {...register('passwordConfirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={8} justify="flex-end">
            <HStack spacing={4}>
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button isLoading={isSubmitting} type="submit" colorScheme="pink">
                Salve
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
