import React, { Component } from "react";
import SearchBar from "./search/SearchBar";

export default class SearchIndex extends Component {
  render() {
    return (
      <div className="principal-search">
        <h1>tip<span>&</span>trip</h1>
        <div className="main-headline">
          <SearchBar />
          <h2>Busca recomendaciones en tu ciudad de destino</h2>
        </div>
      </div>
    );
  }
}
