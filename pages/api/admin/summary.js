import nc from "next-connect"
import Order from "../../../model/Order"
import Product from "../../../model/Product"
import User from "../../../model/User"
import { isAuth, isAdmin } from "../../../Utils/auth"
import db from '../../../Utils/db'
import {onError} from '../../../Utils/error'

const handler = nc({
    onError
})  
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
    await db.connect()
    const ordersCount = await Order.countDocuments()
    const productCount = await Product.countDocuments()
    const userCount = await User.countDocuments()
    const ordersPriceGroup = await Order.aggregate([
        {
            $group: {
                _id: null,
                sales: { $sum: '$totalPrice'},
            }
        }
    ])
    const ordersPrice = ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales  : 0
    const salesData = await Order.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m', date: '$createdAt'}
                },
                totalSales: { $sum: '$totalPrice' }
            }
        }
    ])
    await db.disconnect()
    res.send({ ordersCount, productCount, userCount, ordersPrice, salesData })
})

export default handler   