let array = localStorage.array ? JSON.parse(localStorage.array) : [];


const render_all = () => {
    let x = document.getElementById("bd");
    bd.innerHTML = "";
    add_edit_div_to_bd();
    add_wrapper();
}

const render_screen = () => {

    let x = document.getElementById("wrapper");
    x.innerHTML = "";

    make_date_and_tasks_div();
    make_input_div();
    make_the_table();
    add_to_local_storage();

}

let in_format_date = (date) => {
    let today = new Date(date);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

const add_edit_div_to_bd = () => {
    let x = document.getElementById("bd");
    bd.innerHTML =
        `   
        <div class="array_task_desc" id = "array_task_desc">
            
        </div>
    `;
}

const add_wrapper = () => {
    let x = document.getElementById("bd");
    bd.innerHTML +=
        `
        <div class="name">To Do App</div>
        <div class="wrapper" id="wrapper">

        </div>
    `;
    render_screen();
}

const make_date_and_tasks_div = () => {
    let x = document.getElementById("wrapper");
    x.innerHTML +=
        `
        <div class = "make_date_and_tasks_div" id = "make_date_and_tasks_div">
                
        </div> 
    
    `;
    calculate_number_of_tasks();
    make_date();
}

const make_date = () => {
    let x = document.getElementById("make_date_and_tasks_div");
    x.innerHTML +=
        `
        <div class="date_of_nearest_task">
            ${in_format_date(new Date().toLocaleDateString())}
            
        </div>
    ` ;
}

const calculate_number_of_tasks = () => {
    let x = document.getElementById("make_date_and_tasks_div");
    let num = 0;
    for (let i = 0; i < array.length; i++)
        num += (array[i].done == 0 &&
            comp(i, array[i].end_date, new Date().toDateString()));
    x.innerHTML +=
        `
        <div class="number_of_tasks">
            ${num}
        </div>
    
    `;
}

const make_input_div = () => {
    let x = document.getElementById("wrapper");
    x.innerHTML +=
        `
        <div class="make_input_div">
            <input type="text" name="text" id="input" placeholder = "Item description" onkeydown = "add_by_enter(event);">
            <button type="submit" id = "submit" class = "sub" onclick = "Submit();"> Submit </button>
        </div>
    
    `;

}

const Submit = () => {
    let inp = document.getElementById("input");
    if (inp.value != "") {
        let item = {
            title_of_task: "" + inp.value,
            add_date: in_format_date(new Date().toLocaleDateString()),
            end_date: in_format_date(new Date().toLocaleDateString()),
            done: false,
            description: '',
        };
        array.push(item);
        inp.value = "";
    }
    render_screen();
}

const make_the_table = () => {
    let x = document.getElementById("wrapper");
    x.innerHTML +=
        `
        <div class="tasks_div" id = "tasks_div">
                
        </div>
    ` ;
    render_array_elements();
}

const add_by_enter = (event) => {
    console.log(event);
    if (event.keyCode == 13) {
        Submit();
    }

}

let comp = (i, end, now) => {
    let x = new Date(end);
    let y = new Date(now);
    if (x.getFullYear() != y.getFullYear()) {
        return x.getFullYear() > y.getFullYear();
    }
    else if (x.getMonth() != y.getMonth()) {
        return x.getMonth() > y.getMonth();
    }
    else {
        return x.getDate() >= y.getDate();
    }
}

const render_array_elements = () => {
    array.sort(function (ob1, ob2) {
        const date1 = new Date(ob1.end_date);
        const date2 = new Date(ob2.end_date);
        return date1 - date2;
    });

    let x = document.getElementById("tasks_div");
    if(array.length == 0)
    {
        x.innerHTML = 
        `
            <span> 
                There is no tasks &#9989
            </span>
        `;
    }
    else
    {

        for (let i = 0; i < array.length; i++) {
                x.innerHTML += 
                `
                    <div class = "task">
                        <div class = "data ${array[i].done ? "done" : ""} ${(!comp(i, array[i].end_date, new Date().toDateString()) && !array[i].done) ? "late" : ""}">
                            <span title = "Title of task"> 
                                ${array[i].title_of_task} 
                            </span>
                            <span class = "date_in_task">
                                Add Date : ${in_format_date(array[i].add_date)} <br/> 
                                ${array[i].end_date ? "End Date : " + array[i].end_date : ""}
                            </span>
                        </div>
                        <div class = "true_and_false">
                            <div title = "Done" class = "Tr ${array[i].done ? "tr_done" : ""}" onclick = "done_task(${i});"> 
                                &#9989
                            </div>
                            <div title = "Delete"class = "Fl" onclick="delete_task(${i});"> 
                                &#10060
                            </div>
                        </div>  
                        <div class = "edit_and_description">
                            <div class = "Ed" title = "Edit" onclick = "show_edit_div(${i});">
                                &#128295
                            </div>
                            <div class="description" title = "Description" onclick = "show_description_div(${i});">
                                &#128196
                            </div>
                        </div>
                    </div>
                `;
                    
            }
        }
    }

const add_to_local_storage = () => {
    localStorage.array = JSON.stringify(array);
}

const delete_task = (i) => {
    array.splice(i, 1);
    render_screen();
}

const done_task = (i) => {

    array[i].done = !array[i].done;
    render_screen();
}

const show_edit_div = (i) => {
    let today = in_format_date(new Date());
    let x = document.getElementById("array_task_desc"); // the div 
    x.innerHTML =
        `
        <div class="edit_div">
            <div class="title_in_edit_div">
                <span class="title_in_edit"> Title : </span>
                <input type="text"class = "title_placeholder_in_edit"  id = "title_placeholder_in_edit">
            </div>
            <div class = "end_date_in_edit_div"> 
                <span class="end_date_in_edit" id = "end_date_in_edit"> End date : </span>
                <input type = "date" id = "end_date" title ="End Date" min = "${today}"/>
            </div>
            <div class = "Description_in_edit_div"> 
                <span class="description_in_edit" id = "description_in_edit"> Description : </span>
                <textarea name="textArea" id="text_area_in_edit" cols="29" rows="15"></textarea>      
            </div>
            <div class = "buttons_in_edit" id = "buttons_in_edit">
                <div class ="cancel_button" onclick = "hide_edit_div();">
                    Cancel
                </div> 
                <div class = "save_button" onclick = "save_from_edit(${i});">
                    Save
                </div>
            </div>
        </div>
        
    
    `;
    // element information 
    let place_holder_in_title = document.getElementById("title_placeholder_in_edit");
    let place_holder_of_date = document.getElementById("end_date");
    let place_holder_text_area = document.getElementById("text_area_in_edit");

    place_holder_in_title.value = array[i].title_of_task;
    place_holder_text_area.value = array[i].description;
    place_holder_of_date.value = in_format_date(array[i].end_date);
    x.style.display = "flex";
}

const save_from_edit = (i) => {
    let place_holder_in_title = document.getElementById("title_placeholder_in_edit");
    let place_holder_of_date = document.getElementById("end_date");
    let place_holder_text_area = document.getElementById("text_area_in_edit");

    if (place_holder_in_title != "")
        array[i].title_of_task = place_holder_in_title.value;

    array[i].end_date = place_holder_of_date.value;
    array[i].description = place_holder_text_area.value;

    hide_edit_div();
    render_all();
}

const hide_edit_div = () => {
    let x = document.getElementById("array_task_desc");
    x.style.display = "none";
}

const show_description_div = (i) => {
    let x = document.getElementById("array_task_desc");
    x.innerHTML =
        `   
        <div class="description_div" id = "description_div">
            <div class ="close_in_description_div">
                <span class = "button_in_description_to_close" onclick = "hide_description_div();">
                    &#10006;
                </span>
            </div>
            <div class="title_in_description_div">
                <span class="title_in_description"> 
                    Title : 
                </span>
                <span class="title_in_description_of_place_holder"> ${array[i].title_of_task} </span>
            </div>
            <div class = "end_date_in_description_div"> 
                <span class="title_of_end_date_in_description" id = "title_of_end_date_in_description">
                    End date : 
                </span>
                <span class="end_date_in_description" > 
                    ${array[i].end_date} 
                </span>
            </div>
            <div class = "Description_in_description_div"> 
                <span class="description_in_description" id = "description_in_description">
                    Description : 
                </span>
                <div class = "description_of_task"> 
                    ${array[i].description == "" ? "Nothing" : array[i].description}
                </div>      
            </div>

        </div>
    `;
    x.style.display = "flex";
}

const hide_description_div = () => {
    let x = document.getElementById("array_task_desc");
    x.style.display = "none";
}

render_all();