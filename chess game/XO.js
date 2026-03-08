
let board = document.querySelector(".board");
let turn = "x";
let resetBtn = document.getElementById("reset-btn");

let Xscore=0;
let Oscore=0;


let result = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let baseArry = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [5, 2, 8],
    [4, 5, 6],
    [7, 5, 3],
    [9, 8, 7],
    [9, 6, 3]


];

for (let i = 0; i < 9; i++) {
    let box = document.createElement("div");
    box.classList.add("cell");
    box.setAttribute("i", i + 1);

    box.setAttribute("Event", "clickable");

    board.appendChild(box);
}
let cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        let able = e.target.getAttribute("Event");
        let i = parseInt(e.target.getAttribute("i"));
        if (turn == "x" && able == "clickable") {
            let T = "x";
            cell.textContent = "X";
            paltu(i, T);
            e.target.setAttribute("Event", "clickdisable");
            turn = "o";
            checkWin();
        }
        else if (turn == "o" && able == "clickable") {
            let T = "o";
            cell.textContent = "O";
            paltu(i, T);
            e.target.setAttribute("Event", "clickdisable");
            turn = "x";
            checkWin();
        }
    });
});

function checkWin() {
    for (let i = 0; i < 8; i++) {
        

        let check = (result[i][0] === result[i][1] && result[i][1] === result[i][2]);
        let checkBlank = result[i][0] == "" || result[i][1] == "" || result[i][2] == "";
        if (check == true && checkBlank == false) {
     result[i][0]=="x"?Xscore++:Oscore++;
           
            document.querySelectorAll('[Event="clickable"]').forEach(cell => {
                cell.setAttribute("Event", "clickdisable");
                document.getElementById("instuction").innerHTML = `<b>${result[i][0]}</b>` + " is win ,if you want to replay click the below restart button ";
         document.getElementById("score").innerHTML = `XScore: ${Xscore} OScore:${Oscore}`
         
            });
        }
    }
}
function paltu(k, T) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 3; j++) {
            if (baseArry[i][j] == k) {
                result[i][j] = T;
            }
        }
    }
}
resetBtn.addEventListener("click", () => {
    
     document.getElementById("instuction").innerText = "";
    document.querySelectorAll('[Event="clickdisable"]').forEach(cell => {
        cell.setAttribute("Event", "clickable");
        cell.textContent = "";

for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 3; j++) {
            
                result[i][j] ="";
           
        }
    }


    })
}
) ;

