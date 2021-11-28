import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  HierarchicalMenu,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'CSDBX0SZMQ',
  '4bfa904cde10c4036e72bb5ad6a698d4'
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <h1>React InstantSearch e-commerce demo</h1>
        <InstantSearch
          indexName="crawler_tg_content"
          searchClient={searchClient}
        >
          <div className="left-panel">
            <h2>Categorieën</h2>
            <HierarchicalMenu
              attributes={['categories.lvl0', 'categories.lvl1']}
            />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <img
        src={props.hit.image}
        align="left"
        alt={props.hit.name}
        width={200}
        height={200}
        mode="fit"
      />
      <div className="hit-title">
        <Highlight attribute="title" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="text" hit={props.hit} />
      </div>
      <div className="hit-pagetype">{props.hit.pageType}</div>
      <div className="hit-pagepublicationdate">
        {props.hit.pagePublicationDate}
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
