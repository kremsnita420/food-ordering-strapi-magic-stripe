import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";

import AuthContext from "../context/AuthContext";
import { API_URL } from "../utils/urls";

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const token = await getToken()
                    const order_res = await fetch(`${API_URL}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const data = await order_res.json()
                    setOrders(data)
                } catch (err) {
                    setOrders([])
                }
            }
        }

        fetchOrders()
    }, [user])

    return orders
}

export default function Account() {

    const { user, logoutUser, getToken } = useContext(AuthContext)
    const orders = useOrders(user, getToken)
    console.log("Account.render orders", orders)

    if (!user) {
        return (
            <div>
                <p>Please log in or reigster</p>
                <Link href="/"><a>Go back</a></Link>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Account Page</title>
                <meta name="description" content="The account page where you can view your past orders" />
            </Head>

            <h2>Account Page</h2>

            <h3>Your Orders</h3>

            {orders.map(order => (
                <div key={order.id}>
                    {new Date(order.created_at).toLocaleDateString('en-EN')} {order.product.name} ${order.total} {order.status}
                </div>
            ))}

            <hr />
            <p>Logged in as: {user.email}</p>
            <a href="#" onClick={logoutUser}>Log out</a>
        </div>
    )
}