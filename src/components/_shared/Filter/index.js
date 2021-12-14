import React, { useRef, useState } from "react";

const Filter = ({ handleChangeSort, sortBy, onSearch, keyword }) => {
  const typingTimeoutRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearch({ searchTerm: value });
    }, 300);
  };

  return (
    <div className="w-full mt-4 md:w-2/3 shadow p-5 rounded-lg bg-white">
      <div className="relative">
        <div className="absolute flex items-center ml-2 h-full">
          <svg
            className="w-4 h-4 fill-current text-primary-gray-dark"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
          </svg>
        </div>
        <input
          onChange={handleSearch}
          defaultValue={keyword}
          type="text"
          placeholder="Search title in now playing..."
          className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="font-medium">Sort Results By</p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
          <select
            value={sortBy}
            onChange={handleChangeSort}
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
          >
            <option value="">None</option>
            <option value="rating.desc">Rating Descending</option>
            <option value="rating.asc">Rating Ascending</option>
            <option value="release.desc">Release Date Descending</option>
            <option value="release.asc">Release Date Ascending</option>
            <option value="title.desc">Title Descending</option>
            <option value="title.asc">Title Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Filter;
