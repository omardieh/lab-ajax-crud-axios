const charactersAPI = new APIHandler("http://localhost:8000");
const container = document.querySelector(".characters-container");

const useTemplate = ({ name, occupation, cartoon, weapon }) => {
  return `
  <div class="character-info">
    <div class="name"> ${name} </div>
    <div class="occupation">${occupation}</div>
    <div class="cartoon">${cartoon}</div>
    <div class="weapon">${weapon}</div>
  </div>
  `;
};

window.addEventListener("load", () => {
  fetchAll();
  async function fetchAll() {
    const allCharacters = await charactersAPI.getFullList();
    container.innerHTML = "";
    allCharacters.data.forEach((element) => {
      container.innerHTML += useTemplate(element);
    });
  }
  document.getElementById("fetch-all").addEventListener("click", fetchAll);

  async function fetchOne() {
    const inputValue = document.querySelector("[name='character-id'").value;
    const oneCharacter = await charactersAPI.getOneRegister(inputValue);
    container.innerHTML = useTemplate(oneCharacter.data);
  }
  document.getElementById("fetch-one").addEventListener("click", fetchOne);

  async function deleteOne() {
    const inputValue = document.querySelector(
      "[name='character-id-delete'"
    ).value;
    await charactersAPI.deleteOneRegister(inputValue);
  }
  document.getElementById("delete-one").addEventListener("click", deleteOne);

  async function editCharacter(event) {
    event.preventDefault();
    const id = document.querySelector(
      "#edit-character-form input[name='chr-id']"
    ).value;
    const name = document.querySelector(
      "#edit-character-form input[name='name'"
    ).value;
    const occupation = document.querySelector(
      "#edit-character-form input[name='occupation'"
    ).value;
    const weapon = document.querySelector(
      "#edit-character-form input[name='weapon'"
    ).value;
    const cartoon = document.querySelector(
      "#edit-character-form input[name='cartoon'"
    ).checked;

    const body = { name, occupation, weapon, cartoon };
    await charactersAPI.updateOneRegister(id, body);
  }
  document
    .getElementById("edit-character-form")
    .addEventListener("submit", editCharacter);

  async function newCharacter(event) {
    event.preventDefault();
    const name = document.querySelector(
      "#new-character-form input[name='name'"
    ).value;
    const occupation = document.querySelector(
      "#new-character-form input[name='occupation'"
    ).value;
    const weapon = document.querySelector(
      "#new-character-form input[name='weapon'"
    ).value;
    const cartoon = document.querySelector(
      "#new-character-form input[name='cartoon'"
    ).checked;

    const body = { name, occupation, weapon, cartoon };
    await charactersAPI.createOneRegister(body);
  }
  document
    .getElementById("new-character-form")
    .addEventListener("submit", newCharacter);
});
