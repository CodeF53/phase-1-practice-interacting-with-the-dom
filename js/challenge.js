let counterValue = 0;
let isPaused = false;

function updateCounterNode(){
    document.getElementById("counter").textContent = counterValue;
}
function incrementCounter(){
    counterValue++;
    updateCounterNode();
}
function decrementCounter(){
    counterValue--;
    updateCounterNode();
}
function like(){
    // check if we already have a li for this number
    let li = document.querySelector(`#num-${counterValue}`)
    if (li != null) {
        // get the number from the <span> inside our list entry +1
        let NewLikeCount = parseInt(li.children[0].innerText)+1
        // then change innerHTML to use that new like count in the new span
        li.innerHTML = counterValue + " has been liked <span>" + NewLikeCount + "</span> times"
    } else {
        li = document.createElement("li")
        // give it a unique identifier we can search the dom for
        li.id = `num-${counterValue}`
        // put the like count in a span so its easier to parse later on
        li.innerHTML = counterValue + " has been liked <span>1</span> time"

        document.querySelector(".likes").appendChild(li)
    }
}

// increment counter every second if not paused
setInterval(()=>{if (!isPaused){incrementCounter()}}, 1000)

// subtract button
document.getElementById("minus").addEventListener("click", decrementCounter)

// add button
document.getElementById("plus").addEventListener("click", incrementCounter)

// like button
document.getElementById("heart").addEventListener("click", like)

// pause button
let buttons = document.getElementsByTagName("button")
document.getElementById("pause").addEventListener("click", ()=>{ 
    isPaused = !isPaused; 
    if (isPaused) {
        document.getElementById("pause").innerText = "resume"
        for (let i = 0; i < buttons.length; i++){
            if (buttons[i].id != "pause") {
                buttons[i].disabled = true
            }
        }
    } else {
        document.getElementById("pause").innerText = "pause"
        for (let i = 0; i < buttons.length; i++){
            if (buttons[i].id != "pause") {
                buttons[i].disabled = false
            }
        }
    }
})

// Comment forum
document.getElementById("comment-form").addEventListener("submit", (event)=>{
    // stop forum from trying to send some HTTP thing
    event.preventDefault();

    let commentInputNode = event.target.children[0]
    if (commentInputNode.value.length>0){
        let comment = document.createElement("p")
        comment.textContent = commentInputNode.value
        document.querySelector("#list.comments").appendChild(comment)

        commentInputNode.value = ""
    }
})