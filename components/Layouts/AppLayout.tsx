import { PropsWithChildren, ReactNode } from 'react'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { parseCookies } from 'nookies'
import { recoverUserInformation } from '@/lib/auth'
interface Props {
    header: ReactNode
}

const AppLayout = ({ header, children }: PropsWithChildren<Props>) => {
        return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navigation/>
            {/* Page Heading */}
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
