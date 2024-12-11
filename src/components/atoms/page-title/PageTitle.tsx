import { IoIosArrowBack } from 'react-icons/io'

interface PageTitleProps {
  title: string
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="flex items-center gap-1 text-xl font-medium mb-6">
      <IoIosArrowBack className="text-gray-500" />
      <span>{title}</span>
    </div>
  )
}
