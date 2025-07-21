import Link from "next/link";

export default function Navigation() {
    return(
        <nav className="bg-white shadow p-4 mb-4">
            <ul className="flex gap-4 justify-center">
                <li>
                    <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
                </li>
                <li>
                    <Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link>
                </li>
            </ul>
        </nav>
    );
}