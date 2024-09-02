import MainPage from './(pages)/main/page'
import getCurrentUser from './actions/getCurrentUser'

export default async function Home() {
    const user = await getCurrentUser()
    return (
        <main>
            <MainPage user={user} />
        </main>
    )
}
