import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../redux/reducers/movies';
import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const directors = useSelector((state) => state.directors);
  const actors = useSelector((state) => state.actors);

  return (
    <>
      <Row className="justify-content-md-center gap-3 filter-bar" md={4}>
        <Col md={10}>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center gap-3 filter-bar">
        <Col sm={12} md={2}>
          <Dropdown>
            <Dropdown.Toggle className="filter--selectors" variant="primary">
              Genres
            </Dropdown.Toggle>
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
        </Col>
        <Col sm={12} md={2}>
          <Dropdown>
            <Dropdown.Toggle className="filter--selectors" variant="primary">
              Directors
            </Dropdown.Toggle>
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
        </Col>
        <Col sm={12} md={2}>
          <Dropdown>
            <Dropdown.Toggle className="filter--selectors" variant="primary">
              Actors
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                value=""
                key="clear"
                onClick={(e) => {
                  dispatch(setFilter(''));
                }}
              >
                Show All Actors
              </Dropdown.Item>
              {actors.map((actor, index) => (
                <Dropdown.Item
                  value={actor}
                  key={index}
                  onClick={(e) => {
                    dispatch(setFilter(actor));
                  }}
                >
                  {actor}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
          <Button
            variant="secondary"
            className="filter--selectors"
            type="button"
            placeholder="Search..."
            value="Clear"
            onClick={(e) => dispatch(setFilter(''))}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </>
  );
};
