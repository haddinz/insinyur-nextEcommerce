import nc from "next-connect"
import Product from "../../../model/Product"
import { isAuth, isAdmin } from "../../../Utils/auth"
import db from '../../../Utils/db'
import {onError} from '../../../Utils/error'

const handler = nc({
    onError
})  
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
    await db.connect()
    const products = await Product.find({})
    await db.disconnect()
    
    res.send(products)
})

export default handler   