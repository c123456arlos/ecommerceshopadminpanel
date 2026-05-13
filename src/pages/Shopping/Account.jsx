import React from 'react'
import accImg from '../../assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Address from '@/components/Shopping/address'
import ShoppingOrders from '@/components/Shopping/orders'

function ShoppingAccount() {
    return (
        <div className='flex flex-col'>
            <div className='relative h-[300px] w-full overflow-hidden'>
                <img src={accImg} w={'1600'} h={'300'} style={{ aspectRatio: '1600/300', objectFit: 'cover' }} className='h-full w-full object-cover object-center'></img>
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
                <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                    <Tabs defaultValue='orders'>
                        <TabsList>
                            <TabsTrigger value='orders'>orders</TabsTrigger>
                            <TabsTrigger value='address'>address</TabsTrigger>
                        </TabsList>
                        <TabsContent value='orders'><ShoppingOrders></ShoppingOrders></TabsContent>
                        <TabsContent value='address'><Address></Address></TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    )
}

export default ShoppingAccount