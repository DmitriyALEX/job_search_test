'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import SecondaryButton from '@/app/shared/buttons/SecondaryButton'
import { IJobData } from '../types/jobData.interface'

interface IJobCardDetails {
    data: IJobData[] | undefined
}

const JobCardDetails = (data: IJobCardDetails) => {
    const router = useRouter()
    const likeIcon = '/icons/likeIcon.svg'

    const handleReturnPrevPage = () => {
        router.back()
    }

    return (
        <section className="flex flex-col items-center justify-center ">
            <div className="flex  justify-end w-[1000px]">
                <SecondaryButton title="←" onClick={handleReturnPrevPage} />
            </div>
            {data &&
                data?.data?.map(job => (
                    <div
                        key={job.job_id}
                        className="flex flex-col items-center w-[1000px] bg-green-100 m-[10px] border-4 border-indigo-50 p-5"
                    >
                        {job.employer_logo ? (
                            <img src={job.employer_logo} alt="logo" className="w-[100px] h-[100px] m-5" />
                        ) : (
                            <img src={'/default_employer_logo.png'} className="w-[100px] h-[100px] m-5" />
                        )}
                        <p className=" text-4xl text-indigo-700">{job.job_job_title}</p>
                        <div>
                            {(job.employer_website || job.employer_linkedin) && (
                                <a
                                    href={job.employer_website ?? job.employer_linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="text-2xl my-[20px]">Visit offical page</span>
                                </a>
                            )}

                            <p className="w-150">{job.job_description}</p>
                            <p className="m-10px">{job.job_city}</p>
                        </div>
                    </div>
                ))}
        </section>
    )
}

export default JobCardDetails
