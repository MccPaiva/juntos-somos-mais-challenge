import React from "react";
import "./style.css";
import logo from "./img/logo.svg"
import rawData from "./frontend-challenge.json";
import Profile from "./Components/Profile.js";
import State from "./Components/State.js";
import {nanoid} from 'nanoid'
import ReactPaginate from 'react-paginate';


function App() {

  const [userData, setUserData] = React.useState(rawData);

  const [filteredData, setFilteredData] = React.useState([]);

  const [statePreference, setStatePreference] = React.useState([
    {name: "são paulo",
    isSelected: false,
    id: nanoid()},
    {name: "rio de janeiro",
    isSelected: false,
    id: nanoid()},
    {name: "minas gerais",
    isSelected: false,
    id: nanoid()},
    {name: "espírito santo",
    isSelected: false,
    id: nanoid()},
    {name: "bahia",
    isSelected: false,
    id: nanoid()},
    {name: "acre",
    isSelected: false,
    id: nanoid()},
    {name: "alagoas",
    isSelected: false,
    id: nanoid()},
    {name: "amapá",
    isSelected: false,
    id: nanoid()},
    {name: "amazonas",
    isSelected: false,
    id: nanoid()},
    {name: "ceará",
    isSelected: false,
    id: nanoid()},
    {name: "goiás",
    isSelected: false,
    id: nanoid()},
    {name: "maranhão",
    isSelected: false,
    id: nanoid()},
    {name: "mato grosso",
    isSelected: false,
    id: nanoid()},
    {name: "mato grosso do sul",
    isSelected: false,
    id: nanoid()},
    {name: "pará",
    isSelected: false,
    id: nanoid()},
    {name: "paraíba",
    isSelected: false,
    id: nanoid()},
    {name: "paraná",
    isSelected: false,
    id: nanoid()},
    {name: "pernambuco",
    isSelected: false,
    id: nanoid()},
    {name: "piauí",
    isSelected: false,
    id: nanoid()},
    {name: "rio grande do norte",
    isSelected: false,
    id: nanoid()},
    {name: "rio grande do sul",
    isSelected: false,
    id: nanoid()},
    {name: "rondônia",
    isSelected: false,
    id: nanoid()},
    {name: "roraima",
    isSelected: false,
    id: nanoid()},
    {name: "santa catarina",
    isSelected: false,
    id: nanoid()},
    {name: "sergipe",
    isSelected: false,
    id: nanoid()},
    {name: "tocantins",
    isSelected: false,
    id: nanoid()},
    {name: "distrito federal",
    isSelected: false,
    id: nanoid()}
  ])

  const [showAll, setShowAll] = React.useState(false);

  const [noneSelected, setNoneSelected] = React.useState(true);

  const [filteredStates, setFilteredStates] = React.useState([]);

  const transformData = React.useCallback(data => data.map(item => {

      return {
        ...item,
        id: nanoid()
      }
  }), []);

  React.useEffect(()=>{
    setUserData(transformData(rawData.results))
  }, []);

  React.useEffect(()=>{
    setFilteredData(userData)
  }, [userData]);

  React.useEffect(() => {
  if (statePreference.some(state => state.isSelected)) {

    const filtered = userData.filter(
      user =>
        statePreference.some(
          state =>
            state.isSelected &&
            user.location.state.toLowerCase() === state.name.toLowerCase()
        )
    );
    setFilteredData(filtered);
  } else {
    setFilteredData(userData);
  }
}, [statePreference, userData]);

  function capitalizeWords(str){
  
    let splitWord = str.split(" ");

    for(let i = 0; i < splitWord.length; i++){
      if(
        splitWord[i] == "de" || 
        splitWord[i] == "da" || 
        splitWord[i] == "do" ||
        splitWord[i] == "das" || 
        splitWord[i] == "dos")
        {
        splitWord[i] = splitWord[i]
      }else{
        splitWord[i] = splitWord[i].charAt(0).toUpperCase() + splitWord[i].slice(1)
      }
    }

    return(splitWord.join(" "));
  } 

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = React.useState(0);

    const endOffset = itemOffset + itemsPerPage;

    let currentItems;

    if (Array.isArray(filteredData)){
     currentItems = filteredData.slice(itemOffset, endOffset);
    }
  
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = (event) => {

      const newOffset = (event.selected * itemsPerPage) % filteredData.length;

      setItemOffset(newOffset);
    };

    return (
      <>
      <div className="profile-list">
        <Items currentItems={currentItems} />
      </div>
        <ReactPaginate
          containerClassName="page-list"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  function toggleStateSelection(selectedState) {
    const newStatePreference = statePreference.map(currentState =>
      currentState.name === selectedState.name
        ? { ...currentState, isSelected: !currentState.isSelected }
        : currentState
    );
    setStatePreference(newStatePreference);
//CONTINAUR AQUI
  
    if (selectedState.isSelected) {
      setFilteredStates(filteredStates.filter(st => st !== selectedState.name));
    } else {
      setFilteredStates(filteredStates.concat(selectedState.name));
    }
  }

  let listStates;

  if (showAll) {
    listStates = statePreference.map(state =>
    <State
    stateName = {capitalizeWords(state.name)}
    toggleStateSelection = {() => toggleStateSelection(state)}
    key = {state.id}
    />
    );
  }else{
    const reducedStates = statePreference.slice(0, 4);
    listStates = reducedStates.map(state =>
    <State
    stateName = {capitalizeWords(state.name)}
    toggleStateSelection = {() => toggleStateSelection(state)}
    key = {state.id}
    />
    );
  }

  function changeShown(){
    setShowAll(prev => !showAll)
  }

  function sortItems(item){

    if (Array.isArray(filteredData)) {

      switch (item) {
            case "name":
              setFilteredData([...filteredData].sort((a, b) =>
              a.name.first > b.name.first ? 1 : -1,
              ))
              setUserData([...userData].sort((a, b) =>
              a.name.first > b.name.first ? 1 : -1,
              ))
              break;
            case "state":
              setFilteredData([...filteredData].sort((a, b) =>
              a.location.state > b.location.state ? 1 : -1,
              ))
              setUserData([...userData].sort((a, b) =>
              a.location.state > b.location.state ? 1 : -1,
              ))
              break;
            case "city":
              setFilteredData([...filteredData].sort((a, b) =>
              a.location.city > b.location.city ? 1 : -1,
              ))
              setUserData([...userData].sort((a, b) =>
              a.location.city > b.location.city ? 1 : -1,
              ))
              break;
            default:
              setFilteredData([...filteredData].sort((a, b) =>
              a.name.first > b.name.first ? 1 : -1,
              ))
              setUserData([...userData].sort((a, b) =>
              a.name.first > b.name.first ? 1 : -1,
              ))
      }
    }
  }

  function Items({ currentItems }) {

    const selectedProfile = currentItems?.map(result => 
      <Profile
      firstName = {capitalizeWords(result.name.first)}
      lastName = {capitalizeWords(result.name.last)}
      picture = {result.picture.large}
      adress = {capitalizeWords(result.location.street)}
      city = {capitalizeWords(result.location.city)}
      state = {capitalizeWords(result.location.state)}
      postcode = {result.location.postcode}
      key = {result.id}
      />
    );
    return (
      <>
        {selectedProfile}
      </>
    );
  }

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="logo-container">
            <img className="logo" src={logo}></img>
          </div>
          <input type="text" placeholder="Buscar aqui"></input>
          <div className="empty"></div>
          <div className="empty"></div>
        </div>
      </header>
      <section>
        <div className="container">
          <p className="breadcrumbs">Home > Usuários > Detalhes</p>

          <h1>Lista de Membros</h1>

          <div className="section-container">
            <aside>
              <div className="by-state">
                <div>
                  <h2>Por Estado</h2>
                  {listStates}
                  <a onClick={changeShown}>{
                    showAll || "Ver Todos"
                  }</a>
                </div>
              </div>
            </aside>

            <div className="profiles">
              <div className="order">
                <div>
                  <p>{`Exibindo 
                    ${filteredData.length < 9 
                    ? filteredData.length : 9}
                     de ${filteredData.length} itens`}</p>
                  <div className="options">
                    <p>Ordenar por:</p>
                    <select onChange={(e) => sortItems(e.target.value)}>
                      <option value="name"></option>
                      <option value="name">Nome</option>
                      <option value="state">Estado</option>
                      <option value="city">Cidade</option>
                    </select>
                  </div>
                </div>
              </div>
                {/* {profile} */}
              <PaginatedItems itemsPerPage={9} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
