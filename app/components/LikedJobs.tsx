'use client'
import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'

import { IJobData } from '../types/jobData.interface'

const LikedJobs = () => {
    const [jobs, setJobs] = useState<IJobData[]>([])

    useEffect(() => {
        const dataFromLS = localStorage.getItem('liked Job')
        if (dataFromLS) {
            const parsedData = JSON.parse(dataFromLS)
            setJobs(parsedData)
        } else {
            setJobs([])
        }
    }, [])

    const handleSetItems = (items: IJobData[] | undefined) => {
        if (items) {
            setJobs(items)
        }
    }

    return (
        <section className="flex justify-center items-center">
            {jobs.length > 0 ? (
                <JobCard data={jobs} isFavorite={true} handleSetItems={handleSetItems} />
            ) : (
                <div className="text-4xl">No items</div>
            )}
        </section>
    )
}

export default LikedJobs
