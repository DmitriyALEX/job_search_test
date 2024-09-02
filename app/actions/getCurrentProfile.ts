import getCurrentUser from '@/app/actions/getCurrentUser'

import prisma from '@/app/helpers/prismadb'

export default async function getCurrentProfile() {
    const user = await getCurrentUser()

    if (!user?.id) {
        return null
    }

    try {
        const currentProfile = await prisma.profile.findUnique({
            where: { userId: user?.id },
        })

        if (currentProfile) {
            return currentProfile
        } else {
            return null
        }
    } catch (e) {
        console.error(e)
    }
}
