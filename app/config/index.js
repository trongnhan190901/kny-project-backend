const config = {
    app: {
        port: process.env.PORT || 1025,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/kny-project-backend"
    },
    jwt: {
		secret: process.env.JWT_SECRET || "kny-project-backend-secret-key",
	},
}

module.exports = config