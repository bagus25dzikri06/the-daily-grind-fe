import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Menu } from "../types";

export const getAllMenus = async (): Promise<Menu[]> => {
    return await fetchAPI<Menu[]>("/menus")
}

export const getMenuDetail = async (id : string): Promise<Menu> => {
    return await fetchAPI<Menu>(`/menus/${id}`)
}

export const addMenu = async (data : FormData): Promise<Menu> => {
    return await fetchAPI<Menu>("/menus", {
        method: 'POST',
        headers: {
            ...getAuthHeaders()
        },
        body: data
    })
}

export const updateMenu = async (id : string, data : FormData): Promise<Menu> => {
    return await fetchAPI<Menu>(`/menus/${id}`, {
        method: 'PUT',
        headers: {
            ...getAuthHeaders()
        },
        body: data
    })
}

export const deleteMenu = async (id : string): Promise<void> => {
    return await fetchAPI<void>(`/menus/${id}`, {
        method: 'DELETE',
        headers: {
            ...getAuthHeaders()
        }
    })
}