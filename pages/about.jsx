import Navbar from "@/components/navbar";

export default function About() {
    return (
        <>
        <Navbar />
        <section className="py-10 bg-gray-100 min-h-screen sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 -mr-6 overflow-hidden bg-gray-300 rounded-full">
                <img
                  className="object-cover w-full h-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-1.jpg"
                  alt=""
                />
              </div>

              <div className="relative overflow-hidden bg-gray-300 border-8 border-white rounded-full w-28 h-28">
                <img
                  className="object-cover w-full h-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/male-avatar-1.jpg"
                  alt=""
                />
              </div>

              <div className="w-20 h-20 -ml-6 overflow-hidden bg-gray-300 rounded-full">
                <img
                  className="object-cover w-full h-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-2.jpg"
                  alt=""
                />
              </div>
            </div>

            <h2 className="mt-8 text-3xl font-bold leading-tight text-black lg:mt-12 sm:text-4xl lg:text-5xl">
              About <span className="border-b-8 border-yellow-300">FindingAlly</span> 
            </h2>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 md:mt-10">
            Finding Ally allows users to find study partners who share similar academic goals, interests, and study habits. The website aims to help users achieve their academic goals more efficiently by connecting them with like-minded individuals. Users can search for study partners based on various filters, such as subject, level of study, location, and availability. They can also schedule study sessions, collaborate on projects, and share resources with their partners. The website is designed to provide a user-friendly and secure platform for students to connect and collaborate, making the studying experience more enjoyable and productive.
            </p>

          </div>
        </div>
      </section>
      </>
    );
    }