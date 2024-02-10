/* ----------------------------------- */
//!             SELECTORS              */
/* ----------------------------------- */
const allInputs = document.querySelectorAll("input");
const allMinusBtn = document.querySelectorAll("#minus");
const allCountSpan = document.querySelectorAll("#count");
const allPlusBtn = document.querySelectorAll("#plus");
const allRemoveI = document.querySelectorAll(".remove");

// for updating amounts
const subTotalSpan = document.getElementById("sub-total");
const taxSpan = document.getElementById("tax");
const shippingInfoSpan = document.getElementById("shipping-info");
const shippingPriceSpan = document.getElementById("shipping-price");
const totalSpan = document.getElementById("total");

/* ----------------------------------- */
//!          EVENT LISTENERS           */
/* ----------------------------------- */

allInputs.forEach((input) => {
  input.addEventListener("focusin", (e) => {
    e.target.parentElement.classList.remove("opacity");
  });

  input.addEventListener("focusout", (e) => {
    if (!e.target.value || e.target.checked == false) {
      e.target.parentElement.classList.add("opacity"); // only add opacity, if its empty
    }
  });
});

allMinusBtn.forEach((minus) => {
  minus.addEventListener("click", handleMinusBtnClick);
});

allPlusBtn.forEach((plus) => {
  plus.addEventListener("click", handlePlusBtnClick);
});

allRemoveI.forEach((remove) => {
  remove.addEventListener("click", handleRemoveIClick);
});
