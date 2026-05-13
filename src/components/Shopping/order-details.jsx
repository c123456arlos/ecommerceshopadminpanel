import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

function ShoppingOrderDetailsView({ orderDetails }) {
    const { user } = useSelector(state => state.auth)
    return (
        <DialogContent className='sm:max-w-[600px]'>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">order id</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">order date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">order price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">order status</p>
                        <Label>
                            {/* <Badge className={`py-1 px-3 ${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-500' : 'bg-black text-gray-300'}`}>
                                {orderDetails?.orderStatus}
                            </Badge> */}
                            <Badge
                                className={`py-1 px-3 ${orderDetails?.orderStatus === "confirmed"
                                        ? "bg-green-500"
                                        : orderDetails?.orderStatus === "rejected"
                                            ? "bg-red-600"
                                            : "bg-black"
                                    }`}
                            >
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                </div>
                <Separator></Separator>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">order details</div>
                        <ul className="grid gap-3">
                            {
                                orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                                    orderDetails?.cartItems.map(item =>

                                        <li className="flex items-center justify-between">
                                            <span>title {item.title}</span>
                                            <span>quantity {item.quantity}</span>
                                            <span>price ${item.price}</span>
                                        </li>
                                    ) : null
                            }
                        </ul>
                    </div>
                    <div className="grid gap-2"></div>
                    <div className="font-medium">shipping info</div>
                    <div className="grid gap-0.5 text-muted-foreground">
                        <span>{user.userName}</span>

                        <span>{orderDetails?.addressInfo?.city}</span>
                        <span>{orderDetails?.addressInfo?.pincode}</span>
                        <span>{orderDetails?.addressInfo?.phone}</span>
                        <span>{orderDetails?.addressInfo?.notes}</span>
                    </div>
                </div>
            </div>

        </DialogContent>
    )
}

export default ShoppingOrderDetailsView






