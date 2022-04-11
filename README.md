Create Dark Mode {01:29:55}
Npm Install js Cookies {01.40.01}
Download js Cookies {01:31.00}
Download Monggoo Db {01:43:33} [
    define connect and disconnect
    use it in the API
]`   

Create product API (01.56.55) {
    create product model
    seed sample data
    create /api/product/index
    create product api
}

Fetch Product From API (02:08:39) {
    use getServerSideProps()
    get product from db
    return data as a props
    use it in product screen too
}

7. Implement item to cart (02.20.58) {
    define cart in content
    dispatch add to cart action
    set click event handler for button
}

8. Create cart screen (02.34.57) {
    create cart js
    redirect to cart screen
    use dynamic from next js
    use context to get cart items
    list item in cart items
}

9. Convert Cart Screen to Dynamic Component (02.50.15) {
    this scene how to fix bug position in next js
} 

10. Update Remove item in cart (02.53.30) {
    implement onChange for select
    show notification by notistack
    implement delete button handler
}

11. Create Login Screen (03:07:24) {
    create form
    add email adn password field
    add login butoon
    style form
}

12. Create sample User (03:17:25) {
    create user model
    add sample user
}

13. Build Login API (03:23:11) {
    use jsonwebtoken ro sign token
    implemenent login api
    {
        kesalahan terjadi akibar salah nama folder users => user dalam menergetkan api data base
    }
}

14. Copmplete Login Screen (3:35:45) {
    handle form submition
    add userinfo to context
    save userinfo in cookies
    show user name in navbar using menu
    {
        lihat kesalahan pada parse cookies,
        biasanya cookies nya udah di parse sehingga terjadi syntax error
        
        add JSON.stringfy when you fecth data
    }
}

15. Create register page (03.49.10) {
    create form
    implement backend api
    redirect user to redirect page
}

16. Login and Register form Validation (03:56:50) {
    install react-hook-form
    change input to controller
    use notistack to show errors
}

17. Create Shipping Page (04:13:08) {
    create form
    add adress firlds
    save in context and cookies
}

18. Create Payment Page (04:26:22) {
    create form
    add radio button
    save method in context
}

19. Create place order page (04:41:21) {
    displya order info
    show order summary
    add place order button
}

20. Implement Place Order Action (04:54:38) {
    create click handler
    send akax request
    clear cart
    redirect to order screen
    create backend api
}

21. Create Order Details Page (05:13:09) {
    create api to order info
    create payment, shipping and item
    create order summary
}

22. Pay order By Paypal (05:35:36) {
    install paypal button
    use it in order screen
    implement in order api
}

23. Display Order History (06:01:42) {
    Create orders API
    show orders in profile screen
    {
        Erorr not defind
        Axios not defind same but not look erorr
    }
}

1. Update User Profile (06:17:56) {
    create profile screen
    create update profile API
}

33. Create Admin Dashboard {
    readte admin menu
    add admin auth middleware
    implement admin summary api

    {
        perhatikan event onClose atau onClick
    }
}

34. List Order for Admin {
    fix isAdmin middleware
    create orders page
    create orders api
    use api in page
}

35. Delivered Order {
    create delivered API
    add delivered button
    implement click handler

    {
        conditional rendering
    }
}

36. List Product For Admin {
    create product page
    create product API
    use API in page
}

37. Create Product Edit Page {
    create edit page
    create edit for product
    show product data in from
}

38. Update Product {
    create form submit handler
    cretae backend API for update
}

39. Upload Product Image {
    create cloudinary account
    get cloudinary keys
    create upload API
    upload files in edit page
}

40. Create and Delete Product {
    add create product button
    build new product API
    add handler for delete
    implement delete API
}

41. List User For Admin {
    create users page
    create users API
    use API in page
}

42. Create User Edit Page {
    create edit page
    create API for user
    show user data in form
}

43. Deploy on Vercel {
    create vercel account
    connect to github
    create atlas monggo db
}