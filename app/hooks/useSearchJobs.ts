'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IJobData } from '../types/jobData.interface'

const fetchJobs = async (inputValue?: string, valueFromLS?: string) => {
    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query: inputValue || valueFromLS,
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

export const useSearchJobs = () => {
    const [inputValue, setInputValue] = useState<string | undefined>('')
    const [valueFromLS, setValueFromLS] = useState<string>('')
    const [jobsData, setJobsData] = useState<IJobData[]>([])

    useEffect(() => {
        const savedValueFromLS = localStorage.getItem('inputValue')

        if (savedValueFromLS) {
            const parsedValueFromLS = JSON.parse(savedValueFromLS)
            setValueFromLS(parsedValueFromLS)

            const getData = async (parsedValueFromLS: string) => {
                const newData = await fetchJobs(parsedValueFromLS)
                setJobsData(newData)
            }
            getData(parsedValueFromLS)
        }
    }, [])

    const handleSearch = async (newInputValue: string | undefined) => {
        try {
            const newData = await fetchJobs(newInputValue, valueFromLS)
            setJobsData(newData)
            setInputValue(newInputValue)
            localStorage.setItem('inputValue', JSON.stringify(newInputValue))
        } catch (e) {
            console.error(e)
        }
    }

    return {
        jobsData,
        inputValue,
        handleSearch,
    }
}
