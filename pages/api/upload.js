import { IncomingForm } from "formidable";

const imgbbUploader = require("imgbb-uploader");

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	console.log(req.body);
	const data = await new Promise((resolve, reject) => {
		const form = new IncomingForm();

		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			const oldPath = files.file.filepath;
			imgbbUploader(process.env.IMGB_API_KEY, oldPath)
				.then((response) => {
					res.status(200).json({ message: "success", apiResp: response });
				})
				.catch((error) => console.error(error));
		});
	});
}
