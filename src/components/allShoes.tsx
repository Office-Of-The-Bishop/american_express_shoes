import { useRef, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ProductCard } from "./ProductCard"
import { Product } from "@/types/product"
import { ProductImage } from "./productImage"

type Shoe = {
  id: string
  name: string
  price: number
  // add other fields
}

type Props = {
  shoes: Product[]
  itemsPerPage?: number,
  handleProductClick: (v: Product) => void
  onSelectImage: (Shoe: Product) => void
}

export default function ShoePagination({
  shoes,
  // itemsPerPage = 32,
  handleProductClick,
  onSelectImage
}: Props) {
  const topRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  // const[selectedForImage , setselectedForImageselectedForImage]= useState()
  let itemsPerPage: number

  if (window.innerWidth > 640) {
    itemsPerPage = 32
  } else {
    itemsPerPage = 16
  }
  // window.alert(itemsPerPage)
  const totalPages = Math.ceil(shoes.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const MAX_VISIBLE_PAGES = 3
  const half = Math.floor(MAX_VISIBLE_PAGES / 2)

  let startPage = Math.max(1, currentPage - half)
  let endPage = Math.min(totalPages, currentPage + half)
  if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1)
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1)
    }
  }
  const currentShoes = shoes.slice(startIndex, endIndex)
  const goToPage = () => {
    // setPage(p)
    topRef.current?.scrollIntoView()
  }
  return (<>
    <div ref={topRef} className=" mb-2" />
    <div className="w-full ">
      {/* 👟 SHOES */}
      <div className="grid mb-10 items-stretch gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 place-items-center px-4">
        {currentShoes.map((shoe: Product) => <ProductCard
          key={shoe.id}
          product={shoe}
          onSelectImage={(shoe) => { onSelectImage(shoe) }}
          onProductClick={(shoe) => handleProductClick(shoe)}
        />
        )}
      </div>


      {/* 📄 PAGINATION */}
      <Pagination>
        <PaginationContent className="flex flex-wrap justify-center gap-1">
          {/* PREV */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setCurrentPage((p) => Math.max(p - 1, 1))
                goToPage()
              }}
            />
          </PaginationItem>

          {/* FIRST */}
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 3 && <PaginationEllipsis />}
            </>
          )}

          {/* MIDDLE PAGES */}
          {/* sadas */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => {
                  setCurrentPage(page)
                  goToPage()
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* LAST */}
          {endPage < totalPages && (
            <>
              {currentPage < totalPages - 2 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* NEXT */}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setCurrentPage((p) => Math.min(p + 1, totalPages))
                goToPage()
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div></>
  )
}
