import bcrypt from "bcryptjs"

const data = {
    users: [
        {
            name: 'Admin Jhon',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Insinyur Admin',
            email: 'insinyur@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Parrobas',
            slug: 'parrobas',
            category: 'High',
            image: '/images/01.jpg',
            isFeatured: true,
            featuredImage:'/images/banner1.jpg',
            price: 20,
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A Popular Shoes'
        },
        {
            name: 'Kampess',
            slug: 'kampess',
            category: 'Low',
            image: '/images/02.jpg',
            isFeatured: true,
            featuredImage:'/images/banner2.jpg',
            price: 20,
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A Popular Shoes'
        },
        {
            name: 'Mikke',
            slug: 'mikke',
            category: 'High',
            image: '/images/03.jpg',
            price: 15,
            rating: 4,
            numReviews: 10,
            countInStock: 20,
            description: 'A Popular Shoes'
        },
        {
            name: 'Warrior',
            slug: 'warrior',
            category: 'Low',
            image: '/images/04.jpg',
            price: 25,
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A Popular Shoes'
        },
        {
            name: 'Kompazz',
            slug: 'kompazz',
            category: 'High',
            image: '/images/05.jpg',
            price: 20,
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A Popular Shoes'
        },
        {
            name: 'Natural',
            slug: 'natural',
            category: 'Low',
            image: '/images/06.jpg',
            price: 23,
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A Popular Shoes'
        },
    ]
}

export default data