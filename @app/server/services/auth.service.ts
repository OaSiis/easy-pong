const prisma = new PrismaClient();

export const AuthService = {
    async signup(userData: UserRequest) {
        try {
            const user = await prisma.user.create({ data: userData });
            return { message: 'User signed up successfully', user };
        } catch (error) {
            throw new Error(`User creation failed: ${error}`);
        }
    },

    async login(email: string, password: string) {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }
            return { message: 'User logged in successfully', user };
        } catch (error) {
            throw new Error(`Login failed: ${error}`);
        }
    },

    async getUserById(id: number) {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Error fetching user: ${error}`);
        }
    },

    async updateUser(id: number, userData: UserRequest) {
        try {
            const user = await prisma.user.update({
                where: { id },
                data: userData,
            });
            return { message: 'User updated successfully', user };
        } catch (error) {
            throw new Error(`User update failed: ${error}`);
        }
    },

    async deleteUser(id: number) {
        try {
            await prisma.user.delete({ where: { id } });
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error(`User deletion failed: ${error}`);
        }
    },
};