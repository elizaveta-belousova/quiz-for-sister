const hiddenChar = document.querySelector("#hidden_char_placeholder");
let charOpacity = 1;

hiddenChar.addEventListener("click", () => {
  charOpacity = (charOpacity - 0.1).toFixed(1);
  hiddenChar.style.opacity = charOpacity;

  if (charOpacity < 0.1) {
    hiddenChar.remove();
  }
});

const chars = document.querySelectorAll(".password span:not(.hidden_char)");
const questions = document.querySelectorAll(".question");
let currentQuestionIndex = 0;

questions.forEach(x => {
  x.addEventListener("click", function(event) {
    const target = event.target;
    if (target.tagName !== "BUTTON") return;

    if (!!target.dataset.answer) {
      const input = this.querySelector("input");
      console.log(input.value);
      if (input.value.toLowerCase() === target.dataset.answer) {
        moveNext(true);
      } else if (!!target.dataset.waitRightAnswer) {
        // тут осознанно не листаем дальше, не говорим об ошибке, просто чистим инпут, хе-хе
        input.value = "";
      } else {
        input.value = "";
        moveNext(false);
      }
    } else {
      moveNext(!!target.dataset.correct);
    }
  });
});

function moveNext(isSuccess) {
  if (currentQuestionIndex === questions.length - 1) {
    if (isSuccess) {
      questions[currentQuestionIndex].style.display = "none";
      document.querySelector("#success").style.display = "flex";
      document.body.style.overflow = "hidden";
    } else {
      const finalQuestion = questions[questions.length - 1];
      finalQuestion.querySelector('.error_text').style.display = "block";
      finalQuestion.querySelector("input").classList.add("error_input");
    }
    return;
  }

  if (isSuccess) {
    const currentChar = chars[currentQuestionIndex];
    currentChar.textContent = currentChar.dataset.char;
  }

  questions[currentQuestionIndex].style.display = "none";
  questions[currentQuestionIndex + 1].style.display = "block";
  currentQuestionIndex++;
}