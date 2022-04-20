import { getSession } from "next-auth/react";
import { prisma } from "../../db";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(400).json({ message: "Request not valid" });
		return;
	}
	const session = await getSession({ req });
	if (!session.user) {
		res
			.status(401)
			.json({ error: "No active session", message: "User has no session" });
		return;
	}
	const data = req.body;
	try {
		const updateResult = await prisma.user.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
				image: data.image,
				bio: data.bio,
				phone: data.phone,
			},
		});
		console.log("received in server: ", data);
		res
			.status(200)
			.json({ message: "successfully update", data: updateResult });
		return;
	} catch (er) {
		res.status(500).json({ error: er, message: er });
	}
}
