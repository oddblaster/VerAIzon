import { useState } from "react";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

interface AnswerData {
  answer: string;
}

interface ResultData {
  original_query: string;
  answer: AnswerData;
}

export default function Example() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ResultData | null>(null);

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:5000/getinfo?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="bg-white min-h-screen min-w-screen ">
      <div>
        <div className="flex items-center h-[50vh] w-[60vw] border-[2] rounded-xl mx-auto p-10 m-10 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-gray-100 bg-gradient-to-br from-[#b57bee] to-[#8752a3]">
          <div className="text-center w-full">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3 ">
                Find the perfect Verizon plan
              </h1>
            </div>
            <div className="relative">
              <label htmlFor="Search" className="sr-only">
                {" "}
                Search{" "}
              </label>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                id="Search"
                placeholder="Enter your query..."
                className="w-full rounded-full px-5 py-3 border-none pe-10 shadow-sm sm:text-sm border-2 bg-purple-300"
              />

              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700"
                  onClick={handleSearch}
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="">
          <div className="p-7 max-w-2xl"></div>
        </div>

        <div className="mx-auto -mt-16 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Here's a suggestion for you
          </h2>
          <div>
            <div className="flex items-center justify-center py-6">
              <div className="bg-white border-l-8 border-[#a556f5] rounded-lg shadow-md p-4 w-full flex items-center">
                <div className="flex-shrink-0 mr-6">
                  <img
                    className="h-40 w-40 object-cover rounded"
                    src="https://img.freepik.com/premium-vector/social-media-leisure-flat-vector-illustration-modern-pastime-lifestyle-cartoon-concept-trendy-activity-idea-user-hand-holding-smartphone-with-online-post-internet-technology-mobile-entertainment_106317-8378.jpg"
                  />
                </div>
                <div>
                  <h2 className="text-xl underline decoration-purple-400 decoration-4 font-bold mb-2">
                    {result?.original_query}
                  </h2>
                  <p>{result?.answer?.answer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
