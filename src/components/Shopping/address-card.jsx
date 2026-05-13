import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress,
    selectedId
}) {
    console.log(selectedId, addressInfo?._id)
    return (
        <Card className={`cursor-pointer border-red-700 ${selectedId?._id === addressInfo?._id ? 'border-red-900 border-[4px]' : 'border-black'}`}
            onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}>
            <CardContent className={`${selectedId === addressInfo?._id} ? 'border-black':''`}>
                <Label>address {addressInfo?.address}</Label>
                <Label>city {addressInfo?.city}</Label>
                <Label>pincode {addressInfo?.pincode}</Label>
                <Label>phone {addressInfo?.phone}</Label>
                <Label>notes {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className='flex justify-between p-3'>
                <Button onClick={() => handleEditAddress(addressInfo)}>edit</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo)}>delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard