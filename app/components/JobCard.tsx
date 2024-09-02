'use client'
import React, { useEffect, useState } from 'react'
import { IJobData } from '../types/jobData.interface'
import SecondaryButton from '@/app/shared/buttons/SecondaryButton'
import { useRouter } from 'next/navigation'
import { saveLikedJobToLS } from '../utils/saveLikedJobToLS'
import { deleteLikedJobFromLS } from '../utils/deleteLikedJobFromLS'

interface IJobCard {
    data: IJobData[] | undefined
    isFavorite?: boolean
    handleSetItems?: (value: IJobData[] | undefined) => void
}

const JobCard: React.FC<IJobCard> = ({ data, isFavorite, handleSetItems }) => {
    const router = useRouter()

    const [jobs, setJobs] = useState<IJobData[] | undefined>(data)

    useEffect(() => {
        if (isFavorite) {
            const dataFromLS = localStorage.getItem('liked Job')
            if (dataFromLS) {
                setJobs(JSON.parse(dataFromLS))
            }
        } else {
            setJobs(data)
        }
    }, [isFavorite])

    const handleDetailsPage = (jobId: string) => {
        router.push(`/job-details/${jobId}`)
    }

    const handleSaveToLS = (job: IJobData) => {
        saveLikedJobToLS(job)
    }

    const handleDeleteFromLS = (id: string) => {
        const newData = deleteLikedJobFromLS(id)
        setJobs(newData)

        if (handleSetItems) {
            handleSetItems(newData)
        }
    }

    const likeIcon = '/icons/likeIcon.svg'

    //data for render
    const renderedData = isFavorite ? jobs : data

    return (
        <section>
            {renderedData &&
                renderedData.map((job: IJobData) => (
                    <div
                        key={job.job_id}
                        className="flex items-center w-[700px] bg-green-100 m-[10px] border-4 border-indigo-50 p-5"
                    >
                        {job.employer_logo ? (
                            <img src={job.employer_logo} alt="logo" className="w-[55px] h-[55px] m-5" />
                        ) : (
                            <img src={'/default_employer_logo.png'} className="w-[55px] h-[55px] m-5" />
                        )}

                        <div>
                            <p className="text-xl text-indigo-800">{job.job_job_title}</p>
                            <p
                                className="w-150 "
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    WebkitLineClamp: '3',
                                }}
                            >
                                {job.job_description}
                            </p>
                            <p className="m-10px">{job.job_city}</p>
                            <div className="flex justify-between">
                                <SecondaryButton title="details" onClick={() => handleDetailsPage(job.job_id)} />
                                {isFavorite ? (
                                    <SecondaryButton title={'delete'} onClick={() => handleDeleteFromLS(job.job_id)} />
                                ) : (
                                    <SecondaryButton
                                        title={<img src={likeIcon} alt="likeIcon" />}
                                        onClick={() => handleSaveToLS(job)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </section>
    )
}

export default JobCard
