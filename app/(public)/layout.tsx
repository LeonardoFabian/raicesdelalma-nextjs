import { Navbar } from "@/components";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center">
                { children }
            </main>
        </>
    )
}