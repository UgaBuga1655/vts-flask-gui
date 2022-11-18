function checkIfStudentInTable(name, surname){
    table = document.getElementById("table")
    for (const row of table.children){
        if(row.querySelector("#name").innerHTML==name 
        && row.querySelector("#surname").innerHTML==surname){
            return true
        }
    };
    return false
}

function generateGroupLi(group_list, group) {
    li = document.createElement("li")
    li.setAttribute("onclick", "toggleGroupActive(this)")
    li.setAttribute("class", "active")
    li.setAttribute("id", group)
    li.innerHTML = group
    del_button = document.createElement("button")
    del_button.innerHTML = "x"
    del_button.setAttribute("onclick", "removeGroup(this.parentElement)")
    li.appendChild(del_button)
    group_list.appendChild(li)
}

function addGroup(){
    let group_list = document.getElementById("groups")
    let group = document.getElementById("group-form").value

    // jeśli taki przedmiot już istnieje, to nic nie rób
    for (const list_element of group_list.children){
        if (list_element.innerHTML == group){
            return false
        }
    }
    
    generateGroupLi(group_list, group)

    // zaktualizuj aktywne pola wyboru
    for (const row of table.children){
        for (const td of row.children){
            if (td.id=="select"){
                updateSelection(td)
            }
        }
    }
    
    return true
}

function toggleGroupActive(li) {
    li.className = li.className === 'active' ? 'inactive' : 'active'
    for (const row of table.children){
        for (const td of row.children){
            if (td.id=="group-field" && td.innerHTML == li.id){
                td.className = li.className
            }
        }
    }
}

function removeGroup(group){
    // usuwa przedmiot z listy i z tabeli
    let group_name = group.id
    let table = document.getElementById("table")
    group.remove()
    for (const row of table.children){
        for (const td of row.children){
            // usuwa pola z usuwanym przedmiotem
            if (td.id=="group-field" && td.innerHTML == group_name){
                td.remove()
            }
            // aktualizuje pola z selekcją
            if (td.id=="select"){
                updateSelection(td)
            }
        }
    }
}

function updateSelection(select){
    select.innerHTML = "" // usuwa obecne opcje
    let groups = document.getElementById("groups") // znajduje obecną listę możliwych rozszerzeń
    let row = select.parentElement

    // robi listę przedmiotów, które uczeń już rozszerza
    let current_groups = []
    for (const td of row.children){
        if (td.id == "group-field"){
            current_groups.push(td.innerHTML)
        }
    }

    // dodaje opcję dla każdego możliwego przedmiotu, o ile uczeń już go nie rozszerza
    for (const list_element of groups.children){
        if (!(current_groups.includes(list_element.id))){
            let option = document.createElement("option")
            option.innerHTML = list_element.id
            select.appendChild(option) 
        }

    }
}

function generateGroupSelect(element){
    // dodaje do rzędu pole do wyboru przedmiotu
    let select = document.createElement("select")
    select.setAttribute("id", "select")
    element.appendChild(select)
    updateSelection(select)
}

function generateConfirmButton(row){
    // dodaje do rzędu guzik do zatwierdzenia wyboru przedmiotu
    let confirm_button = document.createElement("button")
    confirm_button.innerHTML = "OK"
    confirm_button.setAttribute("id", "confirm_button")
    confirm_button.setAttribute("onclick", "confirmGroup(this.parentElement)")
    row.appendChild(confirm_button)
}

function confirmGroup(row){
    // przypisuje przedmiot uczniowi
    
    // dodaje pole z przedmiotem, o ile pole wyboru ma jakąś wartość
    select = row.querySelector("#select")
    let value = select.value
    if (value!=""){
        let group = document.createElement("td")
        group.setAttribute("id", "group-field")
        group.setAttribute("onclick", "removeFromGroup(this)")
        group.setAttribute ("class", document.getElementById(value).className)
        group.innerHTML = value
        row.appendChild(group)
    }
    select.remove()
    row.querySelector("#confirm_button").remove() // usuwa niepotrzebne przyciski
    generateAddToGroupButton(row) // dodaje nowy guzik do dodania nowego przedmiotu
}

function addToGroup(element){
    let row = element.parentElement
    element.remove()

    generateGroupSelect(row)
    generateConfirmButton(row)

}

function removeFromGroup(group_field){
    let select = group_field.parentElement.querySelector("#select")
    group_field.remove()
    if (select){
        updateSelection(select)
    }
    }

function generateAddToGroupButton(row){
    let add_group_button = document.createElement("button")
    add_group_button.setAttribute("id", "add_group_button")
    add_group_button.setAttribute("onclick", "addToGroup(this)")
    add_group_button.innerHTML = "+"
    row.appendChild(add_group_button)
}
function addStudent(){
    let student_name = document.getElementById("name-form").value
    let student_surname = document.getElementById("surname-form").value
    
    if(checkIfStudentInTable(student_name, student_surname)){
        return false
    }

    let row = document.createElement("tr")

    let del_button = document.createElement("button")
    // remove entire row when pressed
    del_button.setAttribute("onclick", "this.parentElement.remove()")
    del_button.innerHTML = "X"
    row.appendChild(del_button)
    
    
    let name = document.createElement("td")
    name.setAttribute("id", "name")
    name.innerHTML = student_name
    row.appendChild(name)
    
    let surname = document.createElement("td")
    surname.setAttribute("id", "surname")
    surname.innerHTML = student_surname
    row.appendChild(surname)

    generateAddToGroupButton(row)
    
    let table = document.getElementById("table")
    table.insertBefore(row, table.firstChild)

    return true
}

function populateTable(){
    dane = textContent.split('\n')
    dane.forEach((element, index) => {
        dane[index] = element.split(' ')
    });
    // wczytanie rozszerzeń
    let roz = dane.shift()
    let group_list = document.getElementById("groups")
    group_list.innerHTML = ""
    roz.forEach(group => {
        generateGroupLi(group_list, group)
    })
    // wczytanie wszystkich uczniów
    let table = document.getElementById("table")
    table.innerHTML = ""
    dane.forEach(student => {
        // console.log(student)
        let row = document.createElement("tr")
         
        let del_button = document.createElement("button")
        // remove entire row when pressed
        del_button.setAttribute("onclick", "this.parentElement.remove()")
        del_button.innerHTML = "X"
        row.appendChild(del_button)

        let name = document.createElement("td")
        name.setAttribute("id", "name")
        name.innerHTML = student.shift()
        row.appendChild(name)

        let surname = document.createElement("td")
        surname.setAttribute("id", "surname")
        surname.innerHTML = student.shift()
        row.appendChild(surname)

        while (student.length>0) {
            let group = document.createElement("td")
            let value = student.shift()
            group.setAttribute("id", "group-field")
            group.setAttribute("onclick", "removeFromGroup(this)")
            group.setAttribute("class", document.getElementById(value).className)
            group.innerHTML = value
            row.appendChild(group)
        }

        generateAddToGroupButton(row)
        table.appendChild(row)
    })
    // console.log(dane)
}

function generateFileFromTable(){
    let dane = ""

    let group_list = document.getElementById("groups")
    let groups = []

    for (const group of group_list.children) {
        groups.push(group.id)
    }
    dane = dane.concat(groups.join(" "), "\n")

    let table = document.getElementById("table")

    for (row of table.children){
        for (td of row.children) {
            if (td.id == "name" || td.id == "surname" || td.id == "group-field"){
                dane = dane.concat(td.innerHTML, " ")
            }
        }
        dane = dane.concat("\n")
    }

    console.log(dane)
}

const inputFile = document.getElementById("file-form")
inputFile.onchange = (e) => {
    const file = inputFile.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
        // e.target points to the reader
        textContent = e.target.result
        console.log(`The content of ${file.name} is \n${textContent}`)
    }
    reader.onerror = (e) => {
        const error = e.target.error
        console.error(`Error occured while reading ${file.name}`, error)
    }
    reader.readAsText(file)
}