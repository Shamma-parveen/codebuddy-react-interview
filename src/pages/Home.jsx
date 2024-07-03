const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-3xl font-bold text-orange-600">Movie Seat Booking</h1>
      <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
        <div>
          <div className="flex flex-row-reverse gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="border-grey-300 h-8 w-8 rounded border bg-gray-300"></div>
                <p>Sold</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-8 w-8 rounded border border-yellow-500"></div>
                <p>Available</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-8 w-8 rounded border border-yellow-500 bg-yellow-500"></div>
                <p>Selected</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="mb-4 text-center text-xl font-medium">Book Ticket</p>
              <div className="flex flex-1 items-center justify-center border">
                <p className="text-amber-800">No Tickets Available</p>
              </div>
              <button className="bg-green-600 p-4 text-white">Pay Now ($345)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
        <input
          type="text"
          className="mb-4 block w-full rounded border p-3 outline-none"
          placeholder="Enter row count"
        />
        <div className="flex items-center justify-center">
          <button className="rounded bg-green-500 p-3 text-white">Seat List</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
