import { useRouter } from "next/router";
import Link from 'next/link'
import Head from 'next/head'
import GuestLayout from '@/components/Layouts/GuestLayout'
import AuthCard from "@/components/AuthCard";
import AuthSessionStatus from "@/components/AuthSessionStatus";
import Checkbox from "@/components/Checkbox";
import PrimaryButton from "@/components/PrimaryButton";
import { useForm, FormProvider } from 'react-hook-form'
import Label from "@/components/Label";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react";
import { Form } from "@/components/Form";
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"


const createLoginSchema = z.object({
    email: z.string({
        required_error: "Email é obrigatório",
        invalid_type_error: "Email tem de ser um string",
      })
        .min(2,'O email tem de ser no minimo 2 caracteres')
        .email('Formato de e-mail invalido'),
    password: z.string({
        required_error: "Password é obrigatório",
    })
        .min(8, 'A senha precisa de minino 8 caracteres')
})


type createLoginData = z.infer<typeof createLoginSchema>


const Login = () => {

    const createLoginForm = useForm<createLoginData>({
        resolver: zodResolver(createLoginSchema),
  })

  const { 
    handleSubmit, 
  } = createLoginForm;

    const { query } = useRouter()
    const [errors, setErrors] = useState([])

    const [shouldRemember, setShouldRemember] = useState(false)
    const [status, setStatus] = useState<string | null>(null)

    useEffect(() => {
        const reset = query && query.reset ? query.reset as string : ''
        if (reset.length > 0 && errors.length === 0) {
            setStatus(atob(reset))
        } else {
            setStatus(null)
        }
    })
    const { signIn } = useContext(AuthContext)

    async function handleSignIn(data:any){
            await signIn(data)
    }
    return (
        <GuestLayout>
            <Head>
                <title>Laravel - Login</title>
            </Head>
            <AuthCard>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />
                <FormProvider {...createLoginForm}>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    {/* Email Address */}
                    <div>
                        <Form.Field>
                            <Form.Label htmlFor="email">E-mail</Form.Label>
                            <Form.Input type="email" name="email" />
                            <Form.ErrorMessage field="email" />
                        </Form.Field>
                    </div>
                    {/* Password */}
                    <div>
                        <Form.Field>
                            <Label htmlFor="password">Password</Label>
                            <Form.Input type="password" name="password" />
                            <Form.ErrorMessage field="password" />
                        </Form.Field>
                    </div>
                    {/* Remember Me */}
                    <div className="block mt-4">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <Checkbox
                                id="remember_me"
                                name="remember"
                                checked={shouldRemember}
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href="/forgot-password"
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                            Forgot your password?
                        </Link>
                        <PrimaryButton className="ml-4">Login</PrimaryButton>
                    </div>
                </form>
                </FormProvider>  
            </AuthCard>
        </GuestLayout>
    )
}
export default Login
