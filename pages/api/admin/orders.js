import nc from "next-connect"
import Order from "../../../model/Order"
import { isAuth, isAdmin } from "../../../Utils/auth"
import db from '../../../Utils/db'
import {onError} from '../../../Utils/error'

const handler = nc({
    onError
})  
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
    await db.connect()
    const orders = await Order.find({}).populate('user', 'name')
    await db.disconnect()
    
    res.send(orders)
})

export default handler   