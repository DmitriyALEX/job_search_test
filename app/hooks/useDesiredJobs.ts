'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IJobData } from '../types/jobData.interface'

const fetchJobs = async (desiredValue: string) => {
    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query: desiredValue,
            num_pages: '1',
        },

        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
            'X_RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
        },
    }
    const response = await axios.request(options)
    return response.data.data
}

export const useDesiredJobs = () => {
    const [desiredValue, setDesiredValue] = useState<string | undefined>('')
    const [jobsData, setJobsData] = useState<IJobData[]>([])

    useEffect(() => {
        if (desiredValue) {
            const getData = async (desiredValue: string) => {
                const newData = await fetchJobs(desiredValue)
                setJobsData(newData)
            }
            getData(desiredValue)
        }
    }, [])

    const handleSearch = async (userDesiredValue: string | undefined) => {
        try {
            if (userDesiredValue) {
                const newData = await fetchJobs(userDesiredValue)
                setJobsData(newData)
                setDesiredValue(userDesiredValue)
            }
        } catch (e) {
            console.error(e)
        }
    }

    return {
        jobsData,
        handleSearch,
    }
}
