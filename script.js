let input = document.querySelector("input");
const boxes = document.querySelectorAll(".box");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal_btn = document.getElementById("=");
const reset_btn = document.getElementById("reset");
const delete_btn = document.getElementById("delete");

boxes.forEach((element)=>{
  element.addEventListener("click", ()=>{
    new Audio("sounds/click_sound.mp3").play();
  });
});

numbers.forEach((number)=>{
  number.addEventListener("click", ()=>{
    input.value += number.id;
  });
});

operators.forEach((operate)=>{
  operate.addEventListener("click", ()=>{
    input.value += ' ' + operate.id + ' ';
    
    if (input.value.includes("=")) {
      const final_answer = new Function("return " + input.value.trimEnd().slice(0, -1))();

      if ((final_answer == "Infinity") || (final_answer == "-Infinity")) {
        input.value = "Error in computing";
      } else {
        input.value = "= " + final_answer;
      }

      equal_btn.style.backgroundColor = "rgb(242,78,78)";

      boxes.forEach((element)=>{
        if (element.id !== "reset") {
          element.disabled = true;
        }
      });
    }
  })
})

reset_btn.addEventListener("click", ()=>{
  input.value = ' ';
  equal_btn.style.backgroundColor = "rgb(20, 245, 20)";

  boxes.forEach((element)=>{
    element.disabled = false;
  });
});

delete_btn.addEventListener("click", ()=>{
  input.value = input.value.trimEnd().slice(0, -1);
});