const inputTopic = document.querySelector("#input-topic");
const inputNick = document.querySelector("#input-nick");
const list = document.querySelector(".list");
const buttonAdd = document.querySelector("#button-topic");
const modal = document.querySelector(".modal");

const showModal = () => {
  if (!modal.classList.contains("modal--visible")) {
    modal.classList.add("modal--visible");
    setTimeout(() => {
      modal.classList.remove("modal--visible");
    }, 3000);
  }
};

const addItem = e => {
  e.preventDefault();
  if (inputTopic.value.length >= 5) {
    return (list.innerHTML += `<li class="item">${inputTopic.value} <button class="vote">Chcę to</button></li>`);
  }
  showModal();
};

buttonAdd.addEventListener("click", addItem);
