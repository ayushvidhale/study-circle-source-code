export default function Onboarding() {
  return (
<section className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen">
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div className="lg:col-span-2 lg:py-12">
        

        <div className="justify-center place-content-center">
          <h1 className="text-5xl font-bold text-white">
          Welcoming to FindingAlly
          </h1>

          <address className="mt-2 text-xl not-italic font-semibold">
          Hi there, Complete your profile
          </address>
          {/* <p className="max-w-xl text-lg mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus praesentium architecto, corporis reiciendis nemo numquam autem saepe dignissimos cumque laboriosam! Temporibus officiis facere itaque repellat vero nisi inventore aliquid dolorem.
        </p> */}
        </div>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form action="" className="space-y-4">
          <div>
            <label className="sr-only" for="name">Name</label>
            <input
              className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" for="email">Email</label>
              <input
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
              />
            </div>

            <div>
              <label className="sr-only" for="phone">Phone</label>
              <input
                className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                id="phone"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div>
              <input
                className="peer sr-only"
                id="option1"
                type="radio"
                tabindex="-1"
                name="option"
              />

              <label
                for="option1"
                className="block w-full rounded-lg border border-gray-300 p-3 hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-blue-500"
                tabindex="0"
              >
                <span className="text-sm font-medium text-gray-600"> Option 1 </span>
              </label>
            </div>

            <div>
              <input
                className="peer sr-only"
                id="option2"
                type="radio"
                tabindex="-1"
                name="option"
              />

              <label
                for="option2"
                className="block w-full rounded-lg border border-gray-300 p-3 hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-blue-500"
                tabindex="0"
              >
                <span className="text-sm font-medium text-gray-600"> Option 2 </span>
              </label>
            </div>

            <div>
              <input
                className="peer sr-only"
                id="option3"
                type="radio"
                tabindex="-1"
                name="option"
              />

              <label
                for="option3"
                className="block w-full rounded-lg border border-gray-300 p-3 hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-blue-500"
                tabindex="0"
              >
                <span className="text-sm font-medium text-gray-600"> Option 3 </span>
              </label>
            </div>
          </div>

          <div>
            <label className="sr-only" for="message">Message</label>

            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white sm:w-auto"
            >
              Start Finding Ally
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

  );
}
