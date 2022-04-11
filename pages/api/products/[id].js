import nc from "next-connect"
import Product from "../../../model/Product"
import db from '../../../Utils/db'

const handler = nc()

handler.get(async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    await db.disconnect()
    res.send(product)
})

export default handler