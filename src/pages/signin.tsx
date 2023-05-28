import Brand from "@/components/marketing/ui/Brand";
import { GoogleIcon } from "@/components/Icons/GoogleIcon";
import Layout from "@/components/marketing/Layout";
import { signIn } from "next-auth/react";
import { ApplicationError } from "@/lib/errors";

export default function Login() {

  const handleSignIn = () => {
    signIn("google")
      .catch((err: string) => new ApplicationError(err))
  }

  return (
    <>
      <Layout>
        <div className='w-full flex flex-col items-center justify-center px-4'>
          <div className='max-w-sm w-full text-zinc-800 flex flex-col gap-5'>
            <div className='text-center'>
              <Brand imageHeight={50} imageWidth={50} textClassName='text-3xl font-bold' />
              <div className='mt-5 space-y-2'>
                <h1 className='text-white text-2xl font-bold sm:text-3xl'>
                  Inicia sesión
                </h1>
              </div>
            </div>
            <button
              type='button'
              className='w-full flex items-center justify-center gap-x-3 py-2.5 border border-zinc-200 rounded-lg text-sm font-medium bg-zinc-200/40 hover:bg-zinc-200 ring-purple-500 focus:ring duration-150'
              onClick={handleSignIn}
            >
              <GoogleIcon />
              Iniciar sesión con Google
            </button>
            <button
              type='button'
              className='w-full flex items-center justify-center gap-x-3 py-2.5 border border-zinc-200 rounded-lg text-sm font-medium bg-zinc-200/40 hover:bg-zinc-200 ring-purple-500 focus:ring duration-150'
              onClick={handleSignIn}
            >
              <GoogleIcon />
              Crear una cuenta con Google
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
