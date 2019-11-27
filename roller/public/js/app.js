// const inputTopic = document.querySelector("#input-topic");
// const inputNick = document.querySelector("#input-nick");
// const list = document.querySelector(".list");
// const buttonAdd = document.querySelector("#button-topic");
// const modal = document.querySelector(".modal");

// const showModal = () => {
//   if (!modal.classList.contains("modal--visible")) {
//     modal.classList.add("modal--visible");
//     setTimeout(() => {
//       modal.classList.remove("modal--visible");
//     }, 3000);
//   }
// };

// const addItem = e => {
//   e.preventDefault();
//   if (inputTopic.value.length >= 5) {
//     return (list.innerHTML += `<li class="item">${inputTopic.value} <button class="vote">Chcę to</button></li>`);
//   }
//   showModal();
// };

// buttonAdd.addEventListener("click", addItem);


const list = document.querySelector('.list')
const userInput = document.querySelector('#input-topic')
const buttonAdd = document.querySelector('#button-topic')
const form = document.querySelector('#topic-form')

const getTopics = () => {
  fetch('/getTopics', { method: "get" }).then((response) => {
    return response.json()
  }).then((data) => {
    displayTopics(data)
  })
}

getTopics()

const resetTopic = () => {
  userInput.value = ''
}

const buildIDs = topic => {
  return {
    editID: "_edit" + topic._id,
    deleteID: "delete_" + topic._id,
    listItemID: "listItem_" + topic._id,
    topicID: "topic_" + topic._id
  }
}

const buildTemplate = (topic, ids) => {
  return `
<li class="item" id=${ids.listItemID}>
  ${topic.topic} (liczba głosów)<button class="vote" id="${ids.editID}">Chcę to</button><button class="vote edit" id="${ids.deleteID}">Usuń</button>
</li>
`
}

const displayTopics = data => {
  data.forEach((topic) => {
    let ids = buildIDs(topic);
    list.innerHTML += (buildTemplate(topic, ids))
    // editTopic(topic, ids.topicID, ids.topicID)
    // deleteTopic(topic, ids.listItemID, ids.deleteID)
  })
}
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch('/', {
    method: 'post',
    body: JSON.stringify({ topic: userInput.value }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }).then((response) => {
    return response.json()
  }).then((data) => {
    if (data.result.ok == 1 && data.result.n == 1) {
      let ids = buildIDs(data.document)
      displayTopics.innerHTML = (buildTemplate(data.document, ids))
      // editTopic(data.document, ids, topicID, ids.editID)
      // deleteTopic(data.document, ids.listItemID, ids.deleteID)
    }
    resetTopic()
  })
})