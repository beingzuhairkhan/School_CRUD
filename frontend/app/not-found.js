import Link from "next/link";
export default function NotFound() {
  return (
    <>
   
    <div className="flex min-h-screen flex-col bg-gray-100">
    

      {/* 404 Content */}
      <main className="flex flex-1 flex-col items-center justify-center mt-8 p-6">
        <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-600">
          Oops! Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

      

        {/* Go Home Button */}
        <Link
          href="/"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition hover:bg-blue-700"
        >
          Go Home
        </Link>
      </main>

    </div>
    </>
  );
}