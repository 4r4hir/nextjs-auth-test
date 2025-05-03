import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">認証テストアプリケーション</h1>
      <div className="flex flex-col space-y-4">
        <Link href="/auth" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          認証ページへ
        </Link>
      </div>
    </main>
  )
}
