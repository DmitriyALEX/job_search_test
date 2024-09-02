import ProfileForm from '@/app/components/forms/ProfileForm'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getCurrentProfile from '@/app/actions/getCurrentProfile'

const CreateProfilePage = async () => {
    const user = await getCurrentUser()

    const profile = await getCurrentProfile()

    return (
        <section className="flex justify-center items-center">
            <ProfileForm currentUser={user} currentProfile={profile} />
        </section>
    )
}

export default CreateProfilePage
