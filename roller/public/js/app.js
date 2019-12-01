const list = document.querySelector('.list')
const userInput = document.querySelector('#input-topic')
const buttonAdd = document.querySelector('#button-topic')
const form = document.querySelector('#topic-form')

const buildTemplate = (topic, ids) => {
  return `
      <li class="item" id=${ids.listItemID}>
        ${topic.topic} (liczba głosów)
        <div class="buttons">
          <button class="vote" id="${ids.editID}">Chcę to</button>
          <button type="button" class="vote delete" id="${ids.deleteID}">Usuń</button>
        </div>
      </li>
  `
}

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

const deleteTopic = (topic, listItemID, deleteID) => {
  let deleteBtn = document.querySelector(`#${deleteID}`)
  deleteBtn.addEventListener('click', () => {
    fetch(`/${topic._id}`, {
      method: 'delete'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data.ok == 1) {
        list.removeChild(document.querySelector(`#${listItemID}`))
      }
    })
  })
}

const buildIDs = topic => {
  return {
    editID: "_edit" + topic._id,
    deleteID: "delete_" + topic._id,
    listItemID: "listItem_" + topic._id,
    topicID: "topic_" + topic._id
  }
}


const displayTopics = data => {
  data.forEach((topic) => {
    let ids = buildIDs(topic);
    const el = document.createElement('li')
    el.innerHTML = buildTemplate(topic, ids)
    list.appendChild(el)
    deleteTopic(topic, ids.listItemID, ids.deleteID)
    // editTopic(topic, ids.topicID, ids.topicID)
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
      const el = document.createElement('li')
      el.innerHTML = buildTemplate(data.document, ids)
      list.appendChild(el)
      // editTopic(data.document, ids, topicID, ids.editID)
      deleteTopic(data.document, ids.listItemID, ids.deleteID)
    }
    resetTopic()
  })
})