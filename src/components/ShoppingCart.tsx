import React from 'react'

const ShoppingCart = () => {
  return (
    <div><button
  className="relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
  aria-label="Shopping cart"
>

  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="9" cy="20" r="1" />
    <circle cx="17" cy="20" r="1" />
    <path d="M3 4h2l2 12h11l2-8H6" />
  </svg>

  
</button>

</div>
  )
}

export default ShoppingCart