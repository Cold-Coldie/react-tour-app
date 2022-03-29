import React, { useState } from "react";
import Usefetch from "../hooks/UseFetch";

const Tours = () => {
  const tourURL = "https://course-api.com/react-tours-project";

  const [readMore, setReadMore] = useState(false);

  const {
    data: tours,
    setData: setTours,
    isPending,
    error,
  } = Usefetch(tourURL);

  const handleFilter = (id) => {
    const newTours = tours.filter((tour) => {
      return tour.id !== id;
    });

    setTours(newTours);
  };

  const handleRefresh = () => {
    window.location.reload(false);
  };

  const emptyTours = tours.length === 0;

  return (
    <>
      {error && (
        <div className="text-slate-800 font-bold text-2xl m-5 h-screen">
          {error}
        </div>
      )}
      {isPending && (
        <div className="text-slate-800 font-bold text-2xl m-5 h-screen">
          Loading...
        </div>
      )}
      {tours && (
        <div className="min-h-screen">
          <div className="mb-10">
            <div className="flex justify-center">
              <h1 className="text-slate-800 font-bold text-5xl m-5">
                {emptyTours ? "No Tours Left" : "Our Tours"}
              </h1>
            </div>

            <div className="flex justify-center">
              <hr className="border-b-4 border-blue-500 w-32"></hr>
            </div>
          </div>

          <div>
            {tours.map((tour) => (
              <div
                className="rounded-md overflow-hidden flex justify-center flex-col shadow-xl mb-10 pb-10 w-[20rem] md:w-[40rem] bg-white"
                key={tour.id}
              >
                <div className="flex justify-center h-80">
                  <img
                    className="object-cover"
                    src={tour.image}
                    alt={tour.name}
                  />
                </div>

                <div className="flex p-5 mb-2">
                  <p className="text-slate-800 font-semibold text-sm md:text-lg pr-5">
                    {tour.name}
                  </p>

                  <div className="ml-auto w-17 h-7 p-1 text-sm md:text-lg font-semibold bg-blue-100 rounded text-blue-500 flex justify-center items-center">
                    $ {tour.price}
                  </div>
                </div>

                <div className="pt-0 p-10 text-slate-800">
                  {readMore ? tour.info : `${tour.info.substring(0, 200)}...`}
                  <span
                    className="text-blue-400 ml-2 text-sm cursor-pointer"
                    onClick={() => {
                      setReadMore(!readMore);
                    }}
                  >
                    {readMore ? "Show less" : "Read more"}
                  </span>
                </div>

                <div
                  className="border-2 border-red-700 text-red-700 w-fit px-10 rounded text-center mx-auto cursor-pointer"
                  onClick={() => {
                    handleFilter(tour.id);
                  }}
                >
                  Not Interested
                </div>
              </div>
            ))}
          </div>

          {emptyTours && (
            <div
              className="border-2 border-blue-700 text-blue-700 w-fit px-10 rounded text-center mx-auto cursor-pointer"
              onClick={() => {
                handleRefresh();
              }}
            >
              Refresh
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Tours;
