import React from "react";
import useFetchData from "../../hooks/useFetchData";

import FavoriteIC from "../../../assets/favorite.png";

const Card = ({ id, imgSrc, title, overview, rating, isExpand, handleExpand }) => {
  const { response, error, loading } = useFetchData(`/movies/${id}/casters`);

  return (
    <div className="relative">
      <div className="absolute bottom-4 right-4 cursor-pointer" title="click to favorite">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          enableBackground="new 0 0 20 20"
          viewBox="0 0 485 485"
          fill="red"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M343.611 22.543c-22.614 0-44.227 5.184-64.238 15.409-13.622 6.959-26.135 16.205-36.873 27.175-10.738-10.97-23.251-20.216-36.873-27.175-20.012-10.225-41.625-15.409-64.239-15.409C63.427 22.543 0 85.97 0 163.932c0 55.219 29.163 113.866 86.678 174.314 48.022 50.471 106.816 92.543 147.681 118.95l8.141 5.261 8.141-5.261c40.865-26.406 99.659-68.479 147.681-118.95C455.837 277.798 485 219.151 485 163.932c0-77.962-63.427-141.389-141.389-141.389z"
            data-original="#000000"
          ></path>
        </svg>
      </div>
      <div className={`rounded h-full overflow-hidden shadow-lg`} onClick={handleExpand}>
        <div className={`flex ${isExpand ? "flex-row" : "md:flex-col flex-row"}`}>
          <div className="flex-1">
            <img className="w-full" src={imgSrc} alt="Mountain" />
          </div>
          <div className="flex-1">
            <div className="px-6 pt-4 pb-1">
              <div className="font-bold text-xl">{title}</div>
            </div>
            <div className="px-6 py-1">
              <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Rating: {rating}
              </span>
            </div>
          </div>
        </div>
        {isExpand && (
          <div className="px-2 py-4">
            <b>Description</b>
            <p className="text-gray-700 text-base mt-1 mb-4">{overview}</p>
            <b>Cast</b>
            {loading && (
              <>
                <p className={"h-6 my-1 bg-gray-100 rounded animate-pulse"} />
                <p className={"h-6 my-1 bg-gray-100 rounded animate-pulse"} />
                <p className={"h-6 my-1 bg-gray-100 rounded animate-pulse"} />
              </>
            )}
            {!loading && (
              <p className={`text-gray-700 italic mt-1 mb-4`}>{response.cast.map((item) => item.name).join(", ")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
