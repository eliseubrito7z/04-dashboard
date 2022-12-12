import { Button, Flex, Stack, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const SignInFormDataSchema = z
  .object({
    email: z.string().email({ message: 'Endereço de email invalido' }),
    password: z.string().min(6, { message: 'Senha incorreta ' }),
  })
  .required()

type SignInFormData = z.infer<typeof SignInFormDataSchema>

export default function Home() {
  const { register, handleSubmit, formState, reset } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormDataSchema),
  })

  const { errors, isSubmitting } = formState

  console.log(formState.errors)

  const handleSubmitSignIn = async (data: SignInFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    reset()
    console.log('DATA', data)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <VStack
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8" // 2rem
        borderRadius={8}
        onSubmit={handleSubmit(handleSubmitSignIn)}
      >
        <Stack spacing={4} w="100%" mb="6">
          <Input
            error={errors.email}
            type="email"
            label="E-mail"
            {...register('email')}
          />
          <Input
            error={errors.password}
            type="password"
            label="Senha"
            min={6}
            {...register('password')}
          />
        </Stack>

        <Button
          isLoading={isSubmitting}
          w="100%"
          type="submit"
          colorScheme={'pink'}
          size="lg"
        >
          Entrar
        </Button>
      </VStack>
    </Flex>
  )
}
