'use client'

import { useEffect, useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AuthPage() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">認証テスト</h1>
      
      {!session ? (
        <>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'github']}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  button_label: 'ログイン',
                  loading_button_label: '処理中...',
                  link_text: 'アカウントをお持ちの方はこちら',
                  social_provider_text: '{{provider}}でログイン',
                },
                sign_up: {
                  email_label: 'メールアドレス',
                  password_label: 'パスワード',
                  button_label: '登録',
                  loading_button_label: '処理中...',
                  link_text: '新規登録はこちら',
                  social_provider_text: '{{provider}}で登録',
                },
              }
            }}
          />
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button
              className="w-full py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              onClick={async () => {
                try {
                  const { data, error } = await supabase.auth.signInAnonymously();
                  if (error) throw error;
                  console.log('匿名ログイン成功:', data);
                } catch (error) {
                  console.error('匿名ログインエラー:', error);
                  alert('匿名ログインに失敗しました');
                }
              }}
            >
              匿名でログイン
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mb-4">ログイン中: {session.user.email}</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            onClick={() => supabase.auth.signOut()}
          >
            ログアウト
          </button>
          <Link href="/profile" className="mt-4 text-blue-600 hover:underline">
            プロフィールページへ
          </Link>
        </div>
      )}
    </div>
  )
}
