const form = document.querySelector(".add");
const li = document.querySelector(".tasks");
const msg = document.querySelector(".message");
const search = document.querySelector(".search");

form.addEventListener("submit", event => {
    event.preventDefault();

    const getList = form.task.value;
    li.innerHTML += `<li>
                        <span>${getList}</span>
                        <i class="bi bi-trash delete"></i>
                    </li>`;
    
    form.reset();
    total();
});

li.addEventListener("click",event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        total();
    };
});

function total(){
    msg.querySelector("span").textContent = `You have ${li.children.length} tasks pending`;
};
total();

msg.addEventListener("click", event => {
    if(event.target.classList.contains("clear")){
        li.querySelectorAll("li").forEach(fe => {
            fe.remove();
        });
    };
    total();
});

function check(words){
        Array.from(li.children).filter(fill => !fill.textContent.toLowerCase().includes(words)).forEach(fe => fe.classList.add("hide"));
        Array.from(li.children).filter(fill => fill.textContent.toLowerCase().includes(words)).forEach(fe => fe.classList.remove("hide"));
};


search.addEventListener("keyup",event => {
    const words = search.search_input.value.trim().toLowerCase();
    check(words);
});

search.querySelector("i").addEventListener("click", event => {
    if(event.target.classList.contains("reset")){
        search.reset();

        const words = search.search_input.value.trim().toLowerCase();
        check(words);
    };
});
