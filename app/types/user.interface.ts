export interface IUser {
    id: string
    email: string | null
    emailVerified: Date | null
    hashedPassword: string | null
    createdAt: Date
    updatedAt: Date
}
