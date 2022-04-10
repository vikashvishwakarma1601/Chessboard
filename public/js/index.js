const container = document.querySelector(".container");
const loaderItem = Array.from(document.querySelectorAll("#loader .pixel"));
const resetBtn = document.querySelector(".reset-btn");
const fragment = document.createDocumentFragment();

let cache = Array.from(Array(8), () => new Array(8));
let row = (col = 0);

const renderBoard = () => {
  for (let i = 0; i < 64; i++) {
    let box = createBox(i);
    row = (i / 8) | 0;
    if (col >= 8) {
      col = 0;
    }
    if (row & 1 && !(col & 1)) {
      box.style.backgroundColor = "#546e7ac9";
    } else if (!(row & 1) && col & 1) {
      box.style.backgroundColor = "#546e7ac9";
    } else {
      box.style.backgroundColor = "#ffffff91";
    }
    box.dataset.row = row;
    box.dataset.col = col;
    cache[row][col] = box;
    col++;
    fragment.appendChild(box);
  }
  return fragment;
};

function createBox(id) {
  let boxWrapper = document.createElement("div");
  boxWrapper.classList.add("box");
  boxWrapper.setAttribute("id", id);
  id++;
  return boxWrapper;
}

(function () {
  let idx = 0;
  container.style.border = "none";
  resetBtn.style.display = "none";
  let id = setInterval(() => {
    loaderItem[idx].style.transform = "scale(1.4)";
    loaderItem[idx].style.boxShadow =
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px";

    if (idx > 0) {
      loaderItem[idx - 1].style.transform = "scale(1)";
      loaderItem[idx - 1].style.boxShadow = "none";
    }
    if (idx == 0) {
      loaderItem[loaderItem.length - 1].style.transform = "scale(1)";
      loaderItem[loaderItem.length - 1].style.boxShadow = "none";
    }
    idx < loaderItem.length - 1 ? idx++ : (idx = 0);
  }, 300);

  let fragment = renderBoard();
  setTimeout(() => {
    if (fragment) {
      clearInterval(id);
      document.querySelector("#loader").style.display = "none";
      container.appendChild(fragment);
      resetBtn.style.display = "inline";
    }
  }, 2000);
})();

container.addEventListener("click", (event) => {
  let row = +event.target.dataset["row"];
  let col = +event.target.dataset["col"];

  for (let i = row; i >= 0; i--) {
    if (cache[i][col - (row - i)]) {
      cache[i][col - (row - i)].classList.add("active");
    }

    if (i != row && cache[i][col + (row - i)]) {
      cache[i][col + (row - i)].classList.add("active");
    }
  }

  for (let i = row + 1; i < 8; i++) {
    if (cache[i][col - (i - row)]) {
      cache[i][col - (i - row)].classList.add("active");
    }

    if (cache[i][col + (i - row)]) {
      cache[i][col + (i - row)].classList.add("active");
    }
  }
});

resetBtn.addEventListener("click", () => {
  let col = 0;
  for (let i = 0; i < 64; i++) {
    row = (i / 8) | 0;
    if (col >= 8) {
      col = 0;
    }
    if (row & 1 && !(col & 1)) {
      cache[row][col].classList.remove("active");
    } else if (!(row & 1) && col & 1) {
      cache[row][col].classList.remove("active");
    } else {
      cache[row][col].classList.remove("active");
    }
    col++;
  }
});
