import React from 'react';

import PageTitle from '../../_shared/PageTitle/PageTitle';
import useFetchData from '../../hooks/useFetchData';

const NowPlaying = () => {
  const { response, error, loading } = useFetchData('/movies/nowPlaying');

  if (error) {
    return <PageTitle>Error</PageTitle>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <PageTitle>Now Playing</PageTitle>
      <p>{JSON.stringify(response)}</p>
    </React.Fragment>
  );
};

export default NowPlaying;
