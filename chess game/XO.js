let board = document.querySelector(".board");
let turn = "x";
let result = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

for (let i = 0; i < 9; i++) {
  let  j=0;
j++;
    let box = document.createElement("div");
    box.classList.add("cell");
    box.setAttribute("i", i);
    box.setAttribute("j", j);
    box.setAttribute("Event", "clickable");
    if (j == 1) j = 0;
    board.appendChild(box);
}
let cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        let value = e.target.getAttribute("Event");
         let i=parseInt(e.target.getAttribute("i"));
            let j=parseInt(e.target.getAttribute("j"));
        if (turn == "x" && value == "clickable") {
           
            cell.textContent = "X";
         result[i][j]="x";
            e.target.setAttribute("Event", "clickdisable");
            turn = "o";
        }
        else if (turn == "o" && value == "clickable") {
            cell.textContent = "O";
             result[i][j]="o";
            e.target.setAttribute("Event", "clickdisable");
            turn = "x";
        }
    });
});




