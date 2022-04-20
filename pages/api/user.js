import { getSession } from "next-auth/react";
import { prisma } from "../../db";

export default async function handler(req, resp) {
	console.log("user received request!");
	if (req.method !== "POST") {
		resp.status(400).json({ message: "Request not valid!" });
		return;
	}

	const session = await getSession({ req });
	if (session.user) {
		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
		});
		resp.status(200).json({ user: user });
		return;
	}
	resp.status(401).json({ message: "User has no session" });
	return;
}
