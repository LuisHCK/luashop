export const index = async (req, res) => {
    try {
        console.log(req.auth)
        res.json({ msg: 'hello' })
    } catch (error) {
        console.error(error)
    }
}
