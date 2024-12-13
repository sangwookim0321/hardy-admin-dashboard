import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 잘못된 경로 입니다.</p>
        <Link href="/" className="px-6 py-3 bg-colorSky text-white rounded-md hover:bg-colorDarkSky transition-colors">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
