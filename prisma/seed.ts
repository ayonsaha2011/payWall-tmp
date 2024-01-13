import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
    const password = await bcrypt.hash('paywall@4321', parseInt(process.env.SALT_ROUNDS || "12"));
    const admin = await prisma.user.upsert({
        where: { email: 'admin@paywall.com' },
        update: { password: password, isActive: true },
        create: {
            userSessionId: 'AdminSession',
            email: 'admin@paywall.com',
            name: 'Admin',
            password: password,
            role: 54,
            isActive: true,
        },
    })
    console.log({ admin })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })