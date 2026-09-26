import {create} from 'zustand'
import { Menu } from '../types'
import {persist} from 'zustand/middleware'

export interface MenuOrderTotal extends Menu {
    qty: number;
}

export interface CustomerInfo {
    customerName : string;
    customerContact: string;
    customerAddress : string;
}

interface MenuOrder {
    customerInfo: CustomerInfo | null;
    items: MenuOrderTotal[];
    setCustomerInfo: (info: CustomerInfo) => void;
    addMenu: (menu: Menu, qty?: number) => void;
    removeMenu: (menuId: string) => void;
    reset: () => void;
}

export const useMenuOrder = create<MenuOrder>()(
    persist(
        (set, get) => ({
            customerInfo: null,
            items: [],
            setCustomerInfo: (info) => {
                set({customerInfo: info})
            },
            addMenu: (menu, qty = 1) => {
                const items = get().items
                const existingItems = items.find((item) => item._id === menu._id)

                if (existingItems) {
                    set({
                        items: items.map((item) => item._id === menu._id ? {
                            ...item, qty: item.qty + qty
                        } : item)
                    })
                } else {
                    set({
                        items: [...items, {
                            ...menu, qty
                        }]
                    })
                }
            },
            removeMenu: (menuId) => {
                set({
                    items: get().items.filter((item) => item._id !== menuId)
                })
            },
            reset: () => {
                set({
                    items: [],
                    customerInfo: null
                })
            }
        }), {
            name: 'order-storage'
        } 
    )
)