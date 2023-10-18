import Link from "next/link";

export default function Error(){
    return (

<div className="h-screen w-screen flex items-center bg-gray-100">
	<div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
   		<div className="max-w-md">
      		<div className="text-5xl font-dark font-bold">404</div>
            <p
              className="text-xl md:text-2xl font-light leading-normal"
            >Sorry we couldn&apos;t find this page. </p>
          <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
          
          <Link href="/" className="px-4 inline py-4 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-red-500 active:bg-red-500 hover:bg-red-600">back to homepage</Link>
    </div>
  </div>
</div>
    );

}