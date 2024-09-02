'use client'
import React, { useEffect } from 'react'
import { IUserProfile } from '../types/profile.interface'

import { useDesiredJobs } from '@/app/hooks/useDesiredJobs'
import JobCard from './JobCard'

interface IDesiredJobs {
    userProfile: IUserProfile | undefined | null
}

const DesiredJobs: React.FC<IDesiredJobs> = ({ userProfile }) => {
    const { jobsData, handleSearch } = useDesiredJobs()

    useEffect(() => {
        if (userProfile) {
            handleSearch(userProfile?.desiredJob)
        }
    }, [userProfile])

    return (
        <section className="flex flex-col items-center justify-center">
            <h1 className="text-4xl text-indigo-700">Desired jobs</h1>
            <JobCard data={jobsData} />
        </section>
    )
}

export default DesiredJobs
