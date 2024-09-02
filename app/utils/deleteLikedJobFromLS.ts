import { IJobData } from '../types/jobData.interface'

export const deleteLikedJobFromLS = (id: string) => {
    const dataFromLS = localStorage.getItem('liked Job')

    const desiredJobArray: IJobData[] = dataFromLS ? JSON.parse(dataFromLS) : []
    const filteredData = desiredJobArray.filter(x => x.job_id !== id)

    localStorage.setItem('liked Job', JSON.stringify(filteredData))

    return filteredData
}
