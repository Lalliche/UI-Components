import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-[family-name:var(--font-geist-sans)] text-gray-800">
      {/* Top Bar */}
      <header className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-blue-500">
            Component Playground
          </div>
          <nav>
            <ul className="flex gap-6 text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer transition duration-300">
                Home
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition duration-300">
                Components
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition duration-300">
                About
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 container mx-auto p-8 sm:p-16">
        <div className="bg-white shadow-lg rounded-lg p-8 sm:p-12">
          <h1 className="text-3xl font-semibold mb-6 text-gray-700">
            Welcome to My Component Playground
          </h1>
          <p className="text-gray-500 mb-4">
            This is a space where I design, build, and test my custom components
            using React and Tailwind CSS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Component Cards */}
            <div className="flex items-center justify-center h-32 bg-blue-100 rounded-md shadow-sm">
              <p className="text-blue-600 font-medium">Component 1</p>
            </div>
            <div className="flex items-center justify-center h-32 bg-blue-100 rounded-md shadow-sm">
              <p className="text-blue-600 font-medium">Component 2</p>
            </div>
            <div className="flex items-center justify-center h-32 bg-blue-100 rounded-md shadow-sm">
              <p className="text-blue-600 font-medium">Component 3</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-gray-300 p-4 text-center">
        <p>© 2024 Component Playground. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
