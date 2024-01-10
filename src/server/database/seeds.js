import organizationModel from '@/server/models/organization.model'
import UserModel from '@/server/models/user.model'
import { faker } from '@faker-js/faker'

const seedOrganization = async (user) => {
    const totalOrganizations = await organizationModel.countDocuments({})

    if (!totalOrganizations) {
        const organization = await organizationModel.create({
            name: faker.company.name(),
            description: faker.company.catchPhrase(),
            email: faker.internet.email(),
            phones: [faker.phone.number(), faker.phone.number()],
            owner: user
        })

        user.organization = organization

        user.save()
    }
}

const seedAdminUser = async () => {
    const adminExists = await UserModel.findOne({ role: 'admin' })

    if (!adminExists) {
        const newAdmin = await UserModel.create({
            firstName: 'admin',
            lastName: 'admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin'
        })

        await seedOrganization(newAdmin)

        console.log('Admin user created')
    }
}

export default () => {
    seedAdminUser()
}
