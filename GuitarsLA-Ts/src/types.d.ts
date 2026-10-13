 type Guitar = {
    
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
} 

type CartItem = Guitar&{
    
  quantity: number
} 

type GuitarProps = {
    guitar: Guitar,
    handlerClick: (item:Guitar) => void,
    
}

type CartProps ={
cart:CartItem[]
decreaseQuantity:(item:number) => void,
increaseQuantity:(item:number) => void,
removeFromCart:(item:number) => void,
emptyCart:() => void
,isEmpty:boolean,total:Number;

}
