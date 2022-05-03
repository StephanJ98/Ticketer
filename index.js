let data = []

const loadData = () => {
    let check = localStorage.getItem('data')
    if (check == null) {
    } else {
        data = JSON.parse(localStorage.getItem('data'))
        const body = document.getElementById('body')
        data?.forEach(element => {
            body.insertAdjacentHTML('beforeend', `
        <div class="ticket">
            <div class="ticketTitleContainer">
                <textarea class="ticketTitle" name=${element[0]} cols="1" rows="1">${element[1]}</textarea>
                <div class="form">
                    <button type="submit" onclick="deleteTicket(${element[0]})">Delete</button>
                    <button type="submit" onclick="return editTicket(${element[0]})" style="border-top: 1px solid #d4cbbf;">Edit</button>
                </div>
            </div>
            <textarea class="ticketText" name=${element[0]}>${element[2]}</textarea>
        </div>`)
        })
    }
}

document.getElementById('body').addEventListener('load', loadData())

const editTicket = (id) => {
    let elements = document.getElementsByName(id)
    let dataLocal = [id]
    elements.forEach(element => {
        dataLocal.push(element.value)
    })
    for (let index = 0; index < data.length; index++) {
        if (data[index].includes(id)) {
            data[index][1] = dataLocal[1]
            data[index][2] = dataLocal[2]
        }
    }
    localStorage.setItem('data', JSON.stringify(data))
}

const deleteTicket = (id) => {
    for (let index = 0; index < data.length; index++) {
        if (data[index].includes(id)) {
            data.splice(index,1)
        }
    }
    localStorage.setItem('data', JSON.stringify(data))
    window.location.reload()
}

const addTicket = () => {
    const body = document.getElementById('body')
    let token = Math.round(Math.random() * 1000000)
    body.insertAdjacentHTML('beforeend', `
    <div class="ticket">
        <div class="ticketTitleContainer">
            <textarea class="ticketTitle" name=${token} cols="1" rows="1">Title</textarea>
            <div class="form">
                <button type="button" onclick="deleteTicket(${token})">Delete</button>
                <button type="button" onclick="editTicket(${token})" style="border-top: 1px solid #d4cbbf;">Edit</button>
            </div>
        </div>
        <textarea class="ticketText" name=${token}></textarea>
    </div>`)
    data.push([token,"Title","Some Text"])
    localStorage.setItem('data', JSON.stringify(data))
    window.location.reload()
}