import jwt from 'jsonwebtoken'

const userAuth = (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Login again' })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (tokenDecode.id) {
            req.userID = tokenDecode.id
            next()
        } else {
            return res.status(401).json({ success: false, message: 'Not authorized. Login again' })
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
}

export default userAuth