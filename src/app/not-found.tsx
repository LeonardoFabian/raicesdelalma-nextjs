import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-primary">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-gold-pastel px-2 text-md rounded rotate-12 absolute -mt-24 text-primary font-heading font-bold">
        Page Not Found
      </div>
      <div className="text-center mb-5 max-w-lg ">
        <p className="text-white">The page you are looking for does not exist. Please check the URL or go back to the homepage.</p>
      </div>
      <button className="mt-5">       
            <span className="relative flex px-8 py-3 bg-primary hover:bg-gold-pastel border border-white text-white hover:text-primary font-heading font-bold rounded-lg transition-all">
              <Link href="/">Go Home</Link>
            </span>
        
        </button>
    </main>
  )
}