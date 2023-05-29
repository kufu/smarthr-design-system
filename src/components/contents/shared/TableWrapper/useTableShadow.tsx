import { throttle } from '@Lib/throttle'
import { useEffect, useRef, useState } from 'react'

export const useTableShadow = () => {
  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(false)

  useEffect(() => {
    const currentRef = tableWrapperRef.current

    const handleScroll = throttle(() => {
      if (currentRef) {
        const scrollLeft = currentRef.scrollLeft
        const scrollRight = currentRef.scrollWidth - currentRef.clientWidth - currentRef.scrollLeft
        setShowLeftShadow(scrollLeft > 0)
        setShowRightShadow(scrollRight > 0)
      }
    }, 200)
    handleScroll()

    window.addEventListener('resize', handleScroll)
    currentRef?.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleScroll)
      currentRef?.removeEventListener('scroll', handleScroll)
    }
  }, [tableWrapperRef, setShowLeftShadow, setShowRightShadow])

  return { tableWrapperRef, showRightShadow, showLeftShadow }
}
