
const jwt = require("jsonwebtoken");
const config = process.env;
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

//USED TO CREATE A USER ACCESS TOKEN
const generateAccessToken = (user) => {
	return jwt.sign(
		{ id: user.id },
		ACCESS_TOKEN_SECRET,
		{ expiresIn: "1h" }
	);
};

//USED TO CREATE A USER REFRESH TOKEN
 const generateRefreshToken = (user) => {
	return jwt.sign(
		{ id: user.id },
		REFRESH_TOKEN_SECRET,
		{ expiresIn: "7d" }
	);
};

//USED TO VERIFY THE ACCESS TOKEN
const verifyAccessToken = (token) => {
	try {
		return jwt.verify(token, ACCESS_TOKEN_SECRET);
	}
	catch(e) {
		return null;
	}
};

 const verifyRefreshToken = (token) => {
	try {
		return jwt.verify(token, REFRESH_TOKEN_SECRET);
	}
	catch(e) {
		return null;
	}
};
module.exports = {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken}