//TODO:
//if you want use SWR in this app you must change useSearchJobs HOOK
//(which imported from '@/app/hooks/useSearchJobs') to this hook in MainPage

'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = async (url: string, inputValue: string) => {
    const options = {
        method: 'GET',
        url,
        params: {
            query: inputValue,
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
    const inputValueFromLs = typeof window !== 'undefined' ? localStorage.getItem('inputValue') : null
    const initQuery = inputValueFromLs ? JSON.parse(inputValueFromLs) : ''
    const [inputValue, setInputValue] = useState<string>(initQuery)
    const { data: jobsData, mutate } = useSWR(['https://jsearch.p.rapidapi.com/search', inputValue], ([url, query]) =>
        fetcher(url, query),
    )

    useEffect(() => {
        if (inputValue) {
            localStorage.setItem('inputValue', JSON.stringify(inputValue))
        }
    }, [inputValue])

    const handleSearch = async (newInputValue: string) => {
        setInputValue(newInputValue)
        await mutate()
    }

    return {
        jobsData,
        handleSearch,
    }
}
