'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return
      }
      
      setUser(session.user)
      setLoading(false)
    }
    
    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">読み込み中...</div>
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">プロフィール</h1>
      
      {user && (
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-gray-600">メールアドレス</p>
            <p>{user.email}</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-gray-600">ユーザーID</p>
            <p className="break-all">{user.id}</p>
          </div>
          
          <div className="border-b pb-2">
            <p className="text-gray-600">認証プロバイダー</p>
            <p>{user.app_metadata?.provider || 'メール/パスワード'}</p>
          </div>
          
          <div className="flex justify-between mt-6">
            <Link href="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
              ホームへ戻る
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
