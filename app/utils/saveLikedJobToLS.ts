import { IJobData } from '../types/jobData.interface'

export const saveLikedJobToLS = (job: IJobData) => {
    const dataFromLS = localStorage.getItem('liked Job')
    const desiredJobArray: IJobData[] = dataFromLS ? JSON.parse(dataFromLS) : []

    desiredJobArray.push(job)
    localStorage.setItem('liked Job', JSON.stringify(desiredJobArray))
}
