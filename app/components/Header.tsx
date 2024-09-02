'use client'
import React, { useState } from 'react'
import PrimaryButton from '@/app/shared/buttons/PrimaryButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AuthForm from './forms/AuthForm'
import { signOut } from 'next-auth/react'

import { IUser } from '@/app/types/user.interface'

interface HeaderProps {
    user: IUser | undefined | null
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const [openAuthModalWindow, setOpenAuthModalWindow] = useState(false)
    const router = useRouter()

    const handleOpenModalWindow = () => {
        setOpenAuthModalWindow(!openAuthModalWindow)
    }

    const handleProfilePage = () => {
        router.push('/create-profile')
    }

    const handleJobsPage = () => {
        router.push('/jobs')
    }

    const handleLikePage = () => {
        router.push('/liked')
    }

    const likeIcon = '/icons/likeIcon.svg'
    const logoIcon = '/icons/logoIcon.svg'

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' })
        localStorage.removeItem('inputValue')
    }
    return (
        <header className="flex justify-between">
            <Link href={'/'}>
                <Image className="m-2" src={'/logo.png'} alt={'logo'} width={300} height={150} />
            </Link>
            <div>
                {user?.email ? (
                    // IF USER IS AUTHORIZED
                    <div className="flex justify-center">
                        <PrimaryButton title="Profile" onClick={handleProfilePage} />
                        <PrimaryButton title="Jobs" onClick={handleJobsPage} />
                        <PrimaryButton title={<img src={likeIcon} alt="likeIcon" />} onClick={handleLikePage} />
                        {/* sign out */}
                        <PrimaryButton title="Sign out" onClick={handleSignOut} />
                    </div>
                ) : (
                    //AUTHORIZED USER
                    <>
                        {/* sign in */}
                        <PrimaryButton title="Sign in" onClick={handleOpenModalWindow} isAuth={true} />
                    </>
                )}
            </div>
            {openAuthModalWindow && (
                <AuthForm openModalWindow={openAuthModalWindow} setOpenModalWindow={setOpenAuthModalWindow} />
            )}
        </header>
    )
}

export default Header
