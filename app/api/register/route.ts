import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/app/helpers/prismadb'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.error()
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                hashedPassword,
                emailVerified: new Date(),
            },
        })

        return NextResponse.json(user)
    } catch (e) {
        NextResponse.error()
    }
}
