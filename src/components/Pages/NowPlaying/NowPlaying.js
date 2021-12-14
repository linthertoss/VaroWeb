import React, { useEffect, useState } from "react";

import PageTitle from "../../_shared/PageTitle/PageTitle";
import Card from "../../_shared/Card";

import useFetchData from "../../hooks/useFetchData";
import Filter from "../../_shared/Filter";

const NowPlaying = () => {
  const [endPoint, setEndpoint] = useState("/movies/nowPlaying");
  const { response, error, loading, refetch } = useFetchData(endPoint);

  const [movieExpandIndex, setMovieExpandIndex] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangeSort = (e) => {
    setSortBy(e.target.value);
  };

  const onSearch = ({ searchTerm }) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    let query = [];
    if (searchTerm) {
      query.push(`keyword=${searchTerm}`);
    }
    if (sortBy) {
      query.push(`sort_by=${sortBy}`);
    }
    if (query.length > 0) {
      setEndpoint(`/movies/nowPlaying?${query.join("&")}`);
    }
  }, [searchTerm, sortBy]);

  useEffect(() => {
    refetch();
  }, [endPoint]);

  if (error) {
    return <PageTitle>Error</PageTitle>;
  }

  return (
    <React.Fragment>
      <PageTitle>Now Playing</PageTitle>
      <Filter keyword={searchTerm} sortBy={sortBy} handleChangeSort={handleChangeSort} onSearch={onSearch} />
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-18 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {!loading &&
          response.movies &&
          response.movies.map((item, index) => (
            <Card
              key={item.id}
              id={item.id}
              imgSrc={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              title={item.original_title}
              overview={item.overview}
              isExpand={index === movieExpandIndex}
              rating={item.vote_average}
              handleExpand={() => setMovieExpandIndex(index === movieExpandIndex ? null : index)}
            />
          ))}
        {loading && (
          <>
            <Card isShowSkeleton isExpand={false} handleExpand={() => {}} />
            <Card isShowSkeleton isExpand={false} handleExpand={() => {}} />
            <Card isShowSkeleton isExpand={false} handleExpand={() => {}} />
            <Card isShowSkeleton isExpand={false} handleExpand={() => {}} />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default NowPlaying;
