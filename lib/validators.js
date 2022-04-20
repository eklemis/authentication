export function emailValid(email) {
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.match(mailformat)) return true;
	return false;
}
export function passwordValid(password) {
	if (password.trim().length > 7) return true;
	return false;
}
