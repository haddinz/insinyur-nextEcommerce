import nc from "next-connect"
import Product from "../../model/Product"
import db from '../../Utils/db'
import data from '../../Utils/Data'
import User from "../../model/User"

const handler = nc()

handler.get(async (req, res) => {
    await db.connect()
    await User.deleteMany()
    await User.insertMany(data.users)
    await Product.deleteMany()
    await Product.insertMany(data.products)
    await db.disconnect()
    res.send({message: 'seeded successfully'})
})

export default handler