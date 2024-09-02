'use client'
import ModalWindow from '@/app/shared/ModalWindow'
import { signIn } from 'next-auth/react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import PrimaryButton from '@/app/shared/buttons/PrimaryButton'

interface IAuthForm {
    openModalWindow: boolean
    setOpenModalWindow: (value: boolean) => void
}

type AuthType = 'login' | 'register'

const AuthForm: React.FC<IAuthForm> = ({ openModalWindow, setOpenModalWindow }) => {
    const [authVariant, setAuthVariant] = useState<AuthType>('register')

    const handleChangeAuthVariant = (variant: AuthType) => {
        setAuthVariant(variant)
    }

    const login = async (email: string, password: string) => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/jobs',
            })
        } catch (e) {
            console.log(e)
        }
    }

    const register = async (email: string, password: string) => {
        try {
            await axios.post('/api/register', {
                email,
                password,
            })

            login(email, password)
        } catch (e) {
            console.log(e)
        }
    }

    const authValidationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Enter your email')
            .email('check your email'),
        password: Yup.string()
            .required('Enter your password')
            .min(8),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'check your password'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: authValidationSchema,
        onSubmit: async values => {
            const { email, password } = values

            if (authVariant === 'register') {
                await register(email, password)
            } else {
                await login(email, password)
            }
        },
    })

    return (
        <>
            <ModalWindow openModalWindow={openModalWindow} setOpenModalWindow={setOpenModalWindow}>
                <div className="flex justify-center text-xl text-indigo-500">
                    {authVariant === 'login' ? 'Log in' : 'Register'}
                </div>
                <div className="flex justify-center text-2xl">
                    <button
                        className={`border-b  mx-4 my-4 ${authVariant === 'login' ? 'border-green-800' : ''}`}
                        onClick={() => handleChangeAuthVariant('login')}
                    >
                        Log in
                    </button>
                    <button
                        className={`border-b mx-4 my-4 ${authVariant === 'register' ? 'border-green-800' : ''}`}
                        onClick={() => handleChangeAuthVariant('register')}
                    >
                        Register
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center items-center">
                    <label className="mt-4 text-xl text-green-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="space-y 2 w-[300px] h-[50px] text-xl outline-none"
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="input-feedback">{formik.errors.email}</div>
                    )}

                    <label className="mt-4 text-xl text-green-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="space-y 2 w-[300px] h-[50px] text-xl outline-none"
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="input-feedback">{formik.errors.password}</div>
                    )}

                    {authVariant === 'register' && (
                        <>
                            <label className="mt-4 text-xl text-green-700" htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="space-y 2 w-[300px] h-[50px] text-xl outline-none"
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <div className="input-feedback">{formik.errors.confirmPassword}</div>
                            )}
                        </>
                    )}
                    <PrimaryButton title="Submit" />
                </form>
            </ModalWindow>
        </>
    )
}

export default AuthForm
