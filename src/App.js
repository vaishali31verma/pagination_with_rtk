import React, { useState } from "react";
import "./App.css";
import { useGetPokemonByNameQuery } from "./redux/pokemon";
import LoadingSpinner from "./components/LoadingSpinner";
import ImageCard from "./components/ImageCard";

function App() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ size: "med", breed: 0 }); // Initial filter value
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery({
    limit,
    page,
    filter,
  });

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLoadPrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFilterChange = (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
          ? 1
          : 0
        : e.target.value;
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <h1 class="text-3xl font-bold text-center">Dogs Gallery</h1>

      <div className="flex gap-3">
        <div className="w-1/4 p-4 flex flex-col gap-4">
          <p className="font-medium">Filters </p>
          <div className="flex gap-2">
            <span>Select a size</span>
            <select
              className="border p-2"
              name="size"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="small">small</option>
              <option value="med">med</option>
              <option value="full">full</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <section className="flex flex-row justify-start gap-1">
            <span className="text-gray-900 pr-3 w-[]">Has breeds</span>
            <label className="rampUplabel">
              <input
                name="breed"
                type="checkbox"
                id="rampUp"
                checked={filter.breed}
                onChange={handleFilterChange}
              />
            </label>
            <span className=" text-gray-900 pr-3 w-[]">No breeds</span>
          </section>
        </div>
        <div className="w-3/4 p-4">
          {error ? (
            <div>Oh no, there was an error</div>
          ) : isLoading || isFetching ? (
            <div className="loader">
              <LoadingSpinner />
            </div>
          ) : data ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                {data?.map((image) => (
                  <ImageCard
                    id={image.id}
                    key={image.id}
                    name={image.name}
                    imageUrl={image.url}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleLoadPrevious}
                  disabled={page === 1}
                  className="btn"
                >
                  Previous
                </button>
                <button onClick={handleLoadMore} className="btn">
                  Next
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
