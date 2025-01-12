import { ChangeEvent, useRef } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

interface ImageUploaderProps {
  image: string
  onImageChange: (image: string) => void
  className?: string
  label?: string
}

export function ImageUploader({ image, onImageChange, className = '', label }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onImageChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleRemoveImage = () => {
    onImageChange('')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        <div
          onClick={handleClick}
          className={`w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 ${
            image ? 'border-none' : ''
          }`}
        >
          {image ? (
            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <FiUpload className="w-6 h-6 text-gray-400" />
          )}
        </div>
        {image && (
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      {!image && label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
  )
}
