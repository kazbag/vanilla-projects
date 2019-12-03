const list = document.querySelector('.list')
const userInput = document.querySelector('#input-topic')
const buttonAdd = document.querySelector('#button-topic')
const form = document.querySelector('#topic-form')
const modal = document.querySelector('#modal')

const showModal = () => {
  if (!modal.classList.contains('modal--visible')) {
    modal.classList.add('modal--visible')
    userInput.focus()
    setTimeout(() => {
      modal.classList.remove('modal--visible')
    }, 4000);
  }
}

const buildTemplate = (topic, ids) => {
  return `
      <li class="item" id=${ids.listItemID}>
        <span>
          ${topic.topic} <span id="${ids.topicID}">(${topic.votes})</span>
        </span>
        <div class="buttons">
        <button type="button" class="vote" id="${ids.voteID}">Głosuj</button>
          <button type="button" class="edit" id="${ids.editID}">Edytuj</button>
          <button type="button" class="delete" id="${ids.deleteID}">Usuń</button>
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

const voteForTopic = (topic, topicID, voteID) => {
  let voteBtn = document.querySelector(`#${voteID}`)
  voteBtn.addEventListener('click', () => {
    fetch(`/${topic._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },

      body: JSON.stringify({ topic: topic.topic, votes: topic.votes })
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data.ok == 1) {
        let topicIndex = [...document.querySelector(`#${topicID}`).childNodes]
        topicIndex[0].textContent = `(${data.value.votes})`
      }
    })
  })
}

const editTopic = (topic, topicID, editID) => {
  let editBtn = document.querySelector(`#${editID}`)
  editBtn.addEventListener("click", () => {
    fetch(`/${topic._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ topic: userInput.value })
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data.ok == 1) {
        let topicIndex = document.querySelector(`#${topicID}`)
        topicIndex.textContent = `${data.value.topic} (0)`
        resetTopic()
      }
    })
  })
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
        document.querySelector(`#${listItemID}`).parentNode.removeChild(document.querySelector(`#${listItemID}`))
      }
    })
  })
}

const buildIDs = topic => {
  return {
    editID: "edit_" + topic._id,
    deleteID: "delete_" + topic._id,
    listItemID: "listItem_" + topic._id,
    topicID: "topic_" + topic._id,
    voteID: "vote_" + topic._id
  }
}


const displayTopics = data => {
  data.forEach((topic) => {
    let ids = buildIDs(topic);
    const el = document.createElement('li')
    el.innerHTML = buildTemplate(topic, ids)
    list.appendChild(el)
    editTopic(topic, ids.topicID, ids.editID)
    deleteTopic(topic, ids.listItemID, ids.deleteID)
    voteForTopic(topic, ids.topicID, ids.voteID)
  })
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (userInput.value.length > 5) {
    fetch('/', {
      method: 'post',
      body: JSON.stringify({ topic: userInput.value, votes: 0 }),
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
        editTopic(data.document, ids.topicID, ids.editID)
        deleteTopic(data.document, ids.listItemID, ids.deleteID)
        voteForTopic(data.document, ids.topicID, ids.voteID)
      }
      resetTopic()
    })
  } else {
    showModal()
  }
})

const setDateOfNextMeeting = () => {
  const today = new Date();
  // to fix
  if (today.getDay > 1 && today.getDay < 5) {
    today.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7);
  } else {
    today.setDate(today.getDate() + (4 + 7 - today.getDay()) % 7)
  }
  let month = String(today.getMonth() + 1);
  let day = String(today.getDate());
  let dayName = today.getDay > 1 ? "Poniedziałek" : "Czwartek";
  const year = String(today.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  document.querySelector('#next-meeting').textContent = `Następne spotkanie: ${dayName} ${day}/${month}/${year}`
}

setDateOfNextMeeting()