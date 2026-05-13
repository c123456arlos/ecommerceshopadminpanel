import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

export const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket></ShoppingBasket>
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <BadgeCheck></BadgeCheck>
    },
]


function MenuItems({ setOpen }) {
    const navigate = useNavigate()
    return <nav className='mt-8 flex-col flex gap-2'>
        {
            adminSidebarMenuItems.map(menuItem => <div key={menuItem.id}
                onClick={() => {
                    navigate(menuItem.path)
                    setOpen ? setOpen(false) : null
                }} className='flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-xl text-muted-foreground bg-slate-100 hover:bg-muted hover:text-foreground'>
                {menuItem.icon}
                <span>{menuItem.label}</span>
            </div>)
        }
    </nav>
}


function AdminSidebar({ open, setOpen }) {
    const navigate = useNavigate()
    return <>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side='left' className='w-64'>
                <div className='flex flex-col h-full'>
                    <SheetHeader className={'border-b'}>
                        <SheetTitle className='flex gap-2 mt-5 mb-5'>
                            <ChartNoAxesCombined size={30}></ChartNoAxesCombined>
                            <h1 className='text-3xl font-extrabold'>admin</h1>
                        </SheetTitle>
                    </SheetHeader>
                    <MenuItems setOpen={setOpen}></MenuItems>
                </div>
            </SheetContent>
        </Sheet>
        <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
            <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
                <ChartNoAxesCombined size={30}></ChartNoAxesCombined>
                <h1 className='text-3xl font-extrabold'>admin</h1>
            </div>
            <MenuItems></MenuItems>
        </aside>
    </>
}

export default AdminSidebar