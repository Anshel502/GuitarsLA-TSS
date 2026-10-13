import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db.ts";
export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = window.localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };
    const [data, setData] = useState(db);

    const [auth, setAuth] = useState(false);
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState(initialCart);

    const min_items = 1;
    const max_items = 5;

    const validCart = (true);



    const isEmpty = useMemo(() => cart.length === 0, [cart]);




    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function handlerClick(item) {
        const guitarExists = cart.findIndex((guitar) => guitar.id === item.id);
        //console.log(guitarExists);
        //setCart((prevCart) => [...cart, { ...item }]);

        //console.log(cart);
        if (guitarExists >= 0) {
            const updatedCart = [...cart];
            updatedCart[guitarExists].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
        }
    }

    function calculateTotal() {
        return cart.reduce((total, item) => {
            if (!item) return total;
            return total + (item.quantity || 0) * (item.price || 0);
        }, 0);
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map((item) => {

            if (item.id === id && item.quantity < max_items) {

                return {
                    ...item, quantity: item.quantity + 1,
                };

            }
            return item;
        });
        setCart(updatedCart);

    }

    function decreaseQuantity(id) {
        const item = cart.find((guitar) => guitar.id === id);

        if (item.quantity === min_items) {
            removeFromCart(id)
        } else {
            const updatedCart = cart.map((guitar) => {

                if (guitar.id === id) {
                    return {
                        ...guitar, quantity: guitar.quantity - 1,
                    };
                }
                return guitar;
            })

            setCart(updatedCart);

        }
    }

    function removeFromCart(id) {

        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));

    }

    function emptyCart() {

        setCart([]);
    }





    useEffect(() => {
        console.log(cart);
    }, [cart]);

    /*
    data.map((guitar) => {
      console.log("guitarra encontrada");
    });
    */
    //UseEffect
    /*
    useEffect(() => {
      //Accion al cargar el componente
      console.log("Componente listo");
    }, []);
    useEffect(() => {
      //Accion al cambio de una vari
      // able
      console.log("Token cambio ");
    }, [auth]);
    setTimeout(() => {
      setAuth(true);
      setTotal(1000);
    }, 3000);
  */
    return {
        cart,
        setCart,
        data,
        handlerClick,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        emptyCart,
        calculateTotal,
        isEmpty


    }


}
