import nc from "next-connect"
import Order from "../../../model/Order"
import { isAuth } from "../../../Utils/auth"
import db from '../../../Utils/db'
import {onError} from '../../../Utils/error'

const handler = nc({
    onError
})
handler.use(isAuth)

handler.get(async (req, res) => {
    await db.connect()
    const orders = await Order.find({ user: req.user._id })
    res.send(orders)
})

export default handler