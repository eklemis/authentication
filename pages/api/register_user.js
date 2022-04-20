import { prisma } from "../../db";
import { emailValid, passwordValid } from "../../lib/validators";

export default async function handler(req, res) {
	console.log("Register user called...");
	if (req.method !== "POST") {
		res.status(400).json({ message: "Request not valid" });
		return;
	}
	const data = req.body;
	try {
		if (!emailValid(credentials.email)) {
			res.status(401).json({ error: "Email format incorrect!" });
			return;
		}
		if (!passwordValid(credentials.password)) {
			res.status(401).json({ error: "Password format incorrect!" });
			return;
		}
		const checkedUser = await prisma.user.findUnique({
			where: {
				email: data.email,
			},
		});
		console.log("checked user: ", checkedUser);
		if (checkedUser !== null) {
			res
				.status(401)
				.json({ error: "User already registered. Sign in instead!" });
			return;
		}
		const formatedName = data.email.includes(".")
			? data.email.split(".")[0]
			: data.email.split("@")[0];
		const updateResult = await prisma.user.create({
			where: {
				id: data.id,
			},
			data: {
				name: formatedName,
				email: data.email,
				password: data.password,
			},
		});
		res
			.status(200)
			.json({ message: "successfully register user", data: updateResult });
		return;
	} catch (er) {
		res.status(500).json({ error: er, message: er });
	}
}
