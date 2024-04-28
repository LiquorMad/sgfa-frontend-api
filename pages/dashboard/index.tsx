import AppLayout from '@/components/Layouts/AppLayout'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'

export default function Dashboard(){
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>SGFA</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    // Fetch data from an API
    const { ['sgfa.token']: token } = parseCookies(ctx)
    if(!token)
      return{
        redirect:{
          destination:'/',
          permanent: false,
        }
      }
    return {
      props: {
       token: token
      }
    };
  } catch (error) {
    // Handle error
    console.error('Error fetching data:', error);
    return {
      props: {
       token: null
      }
    };
  }
}