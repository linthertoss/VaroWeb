import React, { useState } from "react";

import PageTitle from "../../_shared/PageTitle/PageTitle";
import useFetchData from "../../hooks/useFetchData";
import Card from "../../_shared/Card";
import useToken from "../../hooks/useToken";

const Favorite = () => {
  const { response, error, loading } = useFetchData("/movies/nowPlaying");
  const { response: token } = useToken();

  const [movieExpandIndex, setMovieExpandIndex] = useState(null);

  if (error) {
    return <PageTitle>Error</PageTitle>;
  }
  if (loading) {
    return "loading";
  }

  console.log(response);

  return (
    <React.Fragment>
      <PageTitle>Now Playing</PageTitle>
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-18 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {response.results &&
          response.results.map((item, index) => (
            <Card
              id={item.id}
              imgSrc={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              title={item.original_title}
              overview={item.overview}
              isExpand={index === movieExpandIndex}
              rating={item.vote_average}
              handleExpand={() => setMovieExpandIndex(index === movieExpandIndex ? null : index)}
            />
          ))}
      </div>
    </React.Fragment>
  );
};

export default Favorite;
