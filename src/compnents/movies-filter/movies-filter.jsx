import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../redux/reducers/movies';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const genres = useSelector((state) => state.genres);
  const directors = useSelector((state) => state.directors);

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <Dropdown>
        <Dropdown.Toggle variant="primary">Filter by Genres</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            value=""
            key="clear"
            onClick={(e) => {
              dispatch(setFilter(''));
            }}
          >
            Show All Genres
          </Dropdown.Item>
          {genres.map((genre, index) => (
            <Dropdown.Item
              value={genre}
              key={index}
              onClick={(e) => {
                dispatch(setFilter(genre));
              }}
            >
              {genre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="primary">Filter by Dorector</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            value=""
            key="clear"
            onClick={(e) => {
              dispatch(setFilter(''));
            }}
          >
            Show All Directors
          </Dropdown.Item>
          {directors.map((director, index) => (
            <Dropdown.Item
              value={director}
              key={index}
              onClick={(e) => {
                dispatch(setFilter(director));
              }}
            >
              {director}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
