'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useSearchJobById = (id: string) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchJobDetails = async () => {
            const decodedId = id.replace('%3D%3D', '==')
            try {
                const options = {
                    method: 'GET',
                    url: 'https://jsearch.p.rapidapi.com/job-details',
                    params: { job_id: decodedId },
                    headers: {
                        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
                        'X_RapidAPI-Host': process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
                    },
                }

                const response = await axios.request(options)
                const fetchedData = response.data.data
                setData(fetchedData)
            } catch (e) {
                console.error(e)
            }
        }

        if (id) {
            fetchJobDetails()
        }
    }, [id])

    return {
        data,
    }
}
