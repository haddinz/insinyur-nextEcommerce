import nc from 'next-connect'
import { isAdmin, isAuth } from '../../../../../Utils/auth'
import User from '../../../../../model/User'
import db from '../../../../../Utils/db'

const handler = nc()
// handler.use(isAdmin, isAuth)
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
    await db.connect()
    const user = await User.findById(req.query.id)
    await db.disconnect()
    res.send(user)
})

handler.put(async (req, res) => {
    await db.connect()
    const user = await User.findById(req.query.id)
    if (user) {
        user.name = req.body.name
        user.isAdmin = Boolean(req.body.isAdmin)
        // user.slug = req.body.slug
        // user.price = req.body.price
        // user.category = req.body.category
        // user.image = req.body.image
        // user.countInStock = req.body.countInStock
        // user.description = req.body.description
        await user.save()
        await db.disconnect()
        res.send({ message: 'User Updated Successfully' })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'User Not Found' })
    }
})

handler.delete(async (req, res) => {
    await db.connect()
    const user = await User.findById(req.query.id)
    if (user) {
        await user.remove()
        await db.disconnect()
        res.send({ message: 'User Deleted' })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'User Not Found' })
    }
})

export default handler 