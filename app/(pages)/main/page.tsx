'use client'
import JobCard from '@/app/components/JobCard'
import SearchByTitle from '@/app/components/SearchByTitle'
import { useSearchJobs } from '@/app/hooks/useSearchJobs'
import { IUser } from '@/app/types/user.interface'

interface IMainPage {
    user: IUser | undefined | null
}

const MainPage: React.FC<IMainPage> = ({ user }) => {
    const { jobsData, handleSearch } = useSearchJobs()

    const handleSearchOnclick = async (newInputValue: string) => {
        await handleSearch(newInputValue)
    }

    return (
        <section className="flex flex-col items-center  overflow-hidden">
            {!user?.email && (
                <h1 className="mb-[32px]">
                    <span className="text-4xl text-indigo-700">Sign in and explore all features like:</span>
                    <br />
                    <span className="text-2xl text-indigo-500">- create own profile,</span>

                    <br />
                    <span className="text-2xl text-indigo-500">- save like jobs,</span>

                    <br />
                    <span className="text-2xl text-indigo-500">- explore jobs recommendations </span>
                </h1>
            )}

            <SearchByTitle onSearch={handleSearchOnclick} />
            <JobCard data={jobsData} />
        </section>
    )
}

export default MainPage
