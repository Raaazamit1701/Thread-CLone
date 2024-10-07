import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		httpOnly: true,       // secure by preventing client-side access
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict",   // CSRF protection, prevents cross-site usage
		secure: process.env.NODE_ENV === "production", // send cookie only over HTTPS
	  });
	  

	return token;
};

export default generateTokenAndSetCookie;
