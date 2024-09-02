import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/helpers/prismadb'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const { userId, name, desiredJob, aboutUser } = body

        const checkUserProfile = await prisma.profile.findUnique({
            where: {
                userId: userId,
            },
        })

        let profile

        if (!checkUserProfile) {
            profile = await prisma.profile.create({
                data: {
                    userId: userId,
                    name: name,
                    desiredJob: desiredJob,
                    aboutUser: aboutUser,
                },
            })
        }

        if (checkUserProfile) {
            profile = await prisma.profile.update({
                where: {
                    userId: userId,
                },

                data: {
                    name: name,
                    desiredJob: desiredJob,
                    aboutUser: aboutUser,
                },
            })
        }

        return NextResponse.json({ success: true, profile })
    } catch (e) {
        NextResponse.error()
    }
}
