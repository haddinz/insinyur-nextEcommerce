import nc from "next-connect"
import Order from "../../../../model/Order"
import db from '../../../../Utils/db'
import {onError} from '../../../../Utils/error'
import { isAuth } from '../../../../Utils/auth'

const handler = nc({
    onError
})
handler.use(isAuth)
handler.put(async (req, res) => {
    await db.connect()
    const order = await Order.findById(req.query.id)
    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const deliveredOrder = await order.save()
        await db.disconnect()
        res.send({ message: 'order paid', order: deliveredOrder })
    } else {
        await db.disconnect()
        res.status(404).send({ message : ' order not found '})
    }
})

export default handler