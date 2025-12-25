import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from 'axios'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getImageUrl = (name: string) => {
  if (!name) return '';
  if (!name.includes('http')) {
    const base = new URL(axios.defaults.baseURL as string).origin
    // window.alert(base)
    return base+'/api/storage/' + name
    // return base+'/storage/' + name

  }
  console.log('img == ',name)
  return name
}


export const setCartId = (id)=>{
  localStorage.setItem('cartId',id)
}

export const getCartId =()=>{
  return localStorage.getItem('cartId')
}