import type { Watch } from "@/api/user/userModel";

export const users: Watch[] = [
	{
		id: 1,
		name: "Alice",
		email: "alice@example.com",
		age: 42,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
	{
		id: 2,
		name: "Robert",
		email: "Robert@example.com",
		age: 21,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
];

export class UserRepository {
	async findAllAsync(): Promise<Watch[]> {
		return users;
	}

	async findByIdAsync(id: number): Promise<Watch | null> {
		return users.find((user) => user.id === id) || null;
	}
}
