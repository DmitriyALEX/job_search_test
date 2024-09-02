import getCurrentProfile from '@/app/actions/getCurrentProfile'
import DesiredJobs from '@/app/components/DesiredJobs'

const JobsPage = async () => {
    const profile = await getCurrentProfile()

    return (
        <section className="">
            <DesiredJobs userProfile={profile} />
        </section>
    )
}

export default JobsPage
