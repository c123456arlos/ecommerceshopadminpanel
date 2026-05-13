import { useState } from "react"
import CommonForm from "../common/form"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice"
import { useToast } from "@/hooks/use-toast"

const initialFormData = {
    status: ''
}

function AdminOrderDetailsView({ orderDetails }) {
    const [formData, setFormData] = useState(initialFormData)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { toast } = useToast()
    console.log(orderDetails, 'orderdetauslorderdetauslorderdetausl')
    function handleUpdateStatus(event) {
        event.preventDefault()
        console.log(formData)
        const { status } = formData
        // dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then(data => {
        //     console.log(data, '1234567890')
        //     if (data?.payload?.success) {
        //         dispatch(getOrderDetailsForAdmin(orderDetails?._id))
        //         dispatch(getAllOrdersForAdmin())
        //         setFormData(initialFormData)
        //     }
        // })
        dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then(
            data => {
                console.log(data, '1243555555555555')
                if (data?.payload?.success) {
                    dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                    dispatch(getAllOrdersForAdmin())
                    setFormData(initialFormData)
                    toast({
                        title: data?.payload?.message
                    })
                }
            }
        )
    }
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
            <div>
                <CommonForm formControls={[
                    {
                        label: "OrderStatus",
                        name: "status",
                        componentType: "select",
                        options: [
                            { id: "pending", label: "pending" },
                            { id: "inProcess", label: "In process" },
                            { id: "shipping", label: "shipping" },
                            { id: "rejected", label: "rejected" },
                            { id: "delivered", label: "delivered" }
                        ],
                    },
                ]} formData={formData} setFormData={setFormData} buttonText={'update order status'}
                    onSubmit={handleUpdateStatus}></CommonForm>
            </div>
        </DialogContent>
    )
}
export default AdminOrderDetailsView





// import { useState } from "react";
// import CommonForm from "../common/form";
// import { DialogContent } from "../ui/dialog";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";
// import { Badge } from "../ui/badge";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getAllOrdersForAdmin,
//     getOrderDetailsForAdmin,
//     updateOrderStatus,
// } from "@/store/admin/order-slice";
// import { useToast } from "@/hooks/use-toast";


// const initialFormData = {
//     status: "",
// };

// function AdminOrderDetailsView({ orderDetails }) {
//     const [formData, setFormData] = useState(initialFormData);
//     const { user } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const { toast } = useToast();

//     console.log(orderDetails, "orderDetailsorderDetails");

//     function handleUpdateStatus(event) {
//         event.preventDefault();
//         const { status } = formData;

//         dispatch(
//             updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
//         ).then((data) => {
//             if (data?.payload?.success) {
//                 dispatch(getOrderDetailsForAdmin(orderDetails?._id));
//                 dispatch(getAllOrdersForAdmin());
//                 setFormData(initialFormData);
//                 toast({
//                     title: data?.payload?.message,
//                 });
//             }
//         });
//     }

//     return (
//         <DialogContent className="sm:max-w-[600px]">
//             <div className="grid gap-6">
//                 <div className="grid gap-2">
//                     <div className="flex mt-6 items-center justify-between">
//                         <p className="font-medium">Order ID</p>
//                         <Label>{orderDetails?._id}</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Order Date</p>
//                         <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Order Price</p>
//                         <Label>${orderDetails?.totalAmount}</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Payment method</p>
//                         <Label>{orderDetails?.paymentMethod}</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Payment Status</p>
//                         <Label>{orderDetails?.paymentStatus}</Label>
//                     </div>
//                     <div className="flex mt-2 items-center justify-between">
//                         <p className="font-medium">Order Status</p>
//                         <Label>
//                             <Badge
//                                 className={`py-1 px-3 ${orderDetails?.orderStatus === "confirmed"
//                                     ? "bg-green-500"
//                                     : orderDetails?.orderStatus === "rejected"
//                                         ? "bg-red-600"
//                                         : "bg-black"
//                                     }`}
//                             >
//                                 {orderDetails?.orderStatus}
//                             </Badge>
//                         </Label>
//                     </div>
//                 </div>
//                 <Separator />
//                 <div className="grid gap-4">
//                     <div className="grid gap-2">
//                         <div className="font-medium">Order Details</div>
//                         <ul className="grid gap-3">
//                             {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
//                                 ? orderDetails?.cartItems.map((item) => (
//                                     <li className="flex items-center justify-between">
//                                         <span>Title: {item.title}</span>
//                                         <span>Quantity: {item.quantity}</span>
//                                         <span>Price: ${item.price}</span>
//                                     </li>
//                                 ))
//                                 : null}
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="grid gap-4">
//                     <div className="grid gap-2">
//                         <div className="font-medium">Shipping Info</div>
//                         <div className="grid gap-0.5 text-muted-foreground">
//                             <span>{user.userName}</span>
//                             <span>{orderDetails?.addressInfo?.address}</span>
//                             <span>{orderDetails?.addressInfo?.city}</span>
//                             <span>{orderDetails?.addressInfo?.pincode}</span>
//                             <span>{orderDetails?.addressInfo?.phone}</span>
//                             <span>{orderDetails?.addressInfo?.notes}</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <CommonForm
//                         formControls={[
//                             {
//                                 label: "Order Status",
//                                 name: "status",
//                                 componentType: "select",
//                                 options: [
//                                     { id: "pending", label: "Pending" },
//                                     { id: "inProcess", label: "In Process" },
//                                     { id: "inShipping", label: "In Shipping" },
//                                     { id: "delivered", label: "Delivered" },
//                                     { id: "rejected", label: "Rejected" },
//                                 ],
//                             },
//                         ]}
//                         formData={formData}
//                         setFormData={setFormData}
//                         buttonText={"Update Order Status"}
//                         onSubmit={handleUpdateStatus}
//                     />
//                 </div>
//             </div>
//         </DialogContent>
//     );
// }

// export default AdminOrderDetailsView;


