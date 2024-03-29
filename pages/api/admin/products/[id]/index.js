import nc from 'next-connect'
import { isAdmin, isAuth } from '../../../../../Utils/auth'
import Product from '../../../../../model/Product'
import db from '../../../../../Utils/db'

const handler = nc()
// handler.use(isAdmin, isAuth)
handler.use(isAuth, isAdmin)

handler.get(async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    await db.disconnect()
    res.send(product)
})

handler.put(async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    if (product) {
        product.name = req.body.name
        product.slug = req.body.slug
        product.price = req.body.price
        product.category = req.body.category
        product.image = req.body.image
        product.featuredImage = req.body.featuredImage
        product.isFeatured = req.body.isFeatured
        product.countInStock = req.body.countInStock
        product.description = req.body.description
        await product.save()
        await db.disconnect()
        res.send({ message: 'Product Updated Successfully' })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'Product Not Found' })
    }
})

handler.delete(async (req, res) => {
    await db.connect()
    const product = await Product.findById(req.query.id)
    if (product) {
        await product.remove()
        await db.disconnect()
        res.send({ message: 'Product Deleted' })
    } else {
        await db.disconnect()
        res.status(404).send({ message: 'Product Not Found' })
    }
})

export default handler 