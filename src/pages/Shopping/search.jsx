import ProductDetailsDialog from '@/components/Shopping/product-details'
import ShoppingProductTile from '@/components/Shopping/product-tile'
import { Input } from '@/components/ui/input'
import { toast, useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchProductDetails } from '@/store/shop/products-slice'
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

function SearchProducts() {
    const [keyword, setKeyword] = useState('')
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { searchResults } = useSelector(state => state.shopSearch)
    const { productDetails } = useSelector(state => state.shopProducts)
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.shopCart)

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000)
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    }, [keyword])
    function handleAddToCart(getCurrentProductId, getTotalStock) {
        console.log(cartItems, 'cartItems')
        let getCartItems = cartItems.items || []
        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId)
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `only ${getQuantity} added for item`,
                        variant: 'destructive'
                    })
                    return
                }
            }
        }
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast({ title: 'product add success to cart' })
            }
        }
        )
    }
    function handleGetProductDetails(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true)
    }, [productDetails])
    console.log(searchResults, 'searchresult')
    return (
        <div className='container mx-auto md:px-6 px-4 py-8'>
            <div className='flex justify-center mb-8'>
                <div className='w-full flex items-center'>
                    <Input value={keyword} name={keyword}
                        onChange={(event) => setKeyword(event.target.value)} className='py-6' placeholder='search products'></Input>
                </div>
            </div>
            {
                !searchResults.length ? <h1 className='text-5xl font-extrabold'>no results found</h1> : null
            }
            <div className='grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {searchResults.map(item => <ShoppingProductTile handleAddToCart={handleAddToCart}
                    product={item} handleGetProductDetails={handleGetProductDetails}></ShoppingProductTile>)}
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    )
}

export default SearchProducts