'use client'
import JobCardDetails from '@/app/components/JobCardDetails'
import { useSearchJobById } from '@/app/hooks/useSearchJobById'

const JobDetailsPage = ({ params }: { params: { id: string } }) => {
    const { data } = useSearchJobById(params.id)

    return (
        <section>
            <JobCardDetails data={data} />
        </section>
    )
}

export default JobDetailsPage
