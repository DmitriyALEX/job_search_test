'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { IUser } from '@/app/types/user.interface'
import SecondaryButton from '@/app/shared/buttons/SecondaryButton'
import { IUserProfile } from '@/app/types/profile.interface'
import { useRouter } from 'next/navigation'

interface IProfileFormProps {
    currentUser: IUser | undefined | null
    currentProfile: IUserProfile | undefined | null
}

const ProfileForm: React.FC<IProfileFormProps> = ({ currentUser, currentProfile }) => {
    const [profile, setProfile] = useState(currentProfile)

    const router = useRouter()
    const submitUserProfile = async (name: string, desiredJob: string, aboutUser: string) => {
        try {
            if (currentUser) {
                const response = await axios.post('api/profile/submit', {
                    userId: currentUser.id,
                    name: name,
                    desiredJob: desiredJob,
                    aboutUser: aboutUser,
                })

                if (response.data.success) {
                    setProfile(response.data.profile)
                    router.push('/jobs')
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    const profileValidationSchema = Yup.object().shape({
        name: Yup.string().required(),
        desiredJob: Yup.string().required(),
        aboutUser: Yup.string().required(),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            desiredJob: '',
            aboutUser: '',
        },
        validationSchema: profileValidationSchema,
        onSubmit: async values => {
            const { name, desiredJob, aboutUser } = values

            submitUserProfile(name, desiredJob, aboutUser)
        },
    })

    useEffect(() => {
        if (profile) {
            formik.setValues({
                name: profile.name || '',
                desiredJob: profile.desiredJob || '',
                aboutUser: profile.aboutUser || '',
            })
        }
    }, [profile])

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-[500px]">
            <label htmlFor="name" className="text-indigo-700 text-4xl m-1">
                Your name
            </label>
            {formik.errors.name && formik.touched.name && (
                <div className="text-red-600 opacity-100 transition-opacity duration-300">{formik.errors.name}</div>
            )}
            <input
                id="name"
                name="name"
                placeholder="Enter your name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // space-y 2
                className="text-indigo-900 text-2xl m-1 outline-none"
            />
            <label htmlFor="desiredJob" className="text-indigo-700 text-4xl m-1">
                Desired job
            </label>
            {formik.errors.desiredJob && formik.touched.desiredJob && (
                <div className="text-red-600 opacity-100 transition-opacity duration-300">
                    {formik.errors.desiredJob}
                </div>
            )}
            <input
                id="desiredJob"
                name="desiredJob"
                placeholder="Enter your desired job"
                type="text"
                value={formik.values.desiredJob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-indigo-900 text-2xl m-1 outline-none"
            />

            <label htmlFor="aboutUser" className="text-indigo-700 text-4xl m-1">
                About you
            </label>
            {formik.errors.aboutUser && formik.touched.aboutUser && (
                <div className="text-red-600 opacity-100 transition-opacity duration-300">
                    {formik.errors.aboutUser}
                </div>
            )}
            <textarea
                id="aboutUser"
                name="aboutUser"
                placeholder="Enter some information about you"
                value={formik.values.aboutUser}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="text-indigo-900 text-2xl m-1 outline-none h-[300px]"
            />
            <div className="flex justify-center m-4">
                <SecondaryButton title="Submit" type="submit" />
            </div>
        </form>
    )
}

export default ProfileForm
