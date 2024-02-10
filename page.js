/* ----------------------------------- */
//!             SELECTORS              */
/* ----------------------------------- */
const allInputs = document.querySelectorAll("input");
const allMinusBtn = document.querySelectorAll("#minus");
const allCountSpans = document.querySelectorAll(".count");
const discountSpan = document.querySelector("#discount");
const allPlusBtn = document.querySelectorAll("#plus");
const allRemoveI = document.querySelectorAll(".remove");
const allItemTotalSpan = document.querySelectorAll("#item-total");

// for updating amounts
const subTotalSpan = document.getElementById("sub-total");
const taxSpan = document.getElementById("tax");
const shippingInfoSpan = document.getElementById("shipping-info");
const shippingPriceSpan = document.getElementById("shipping-price");
const totalSpan = document.getElementById("total");
const currency = "€";

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

/* ----------------------------------- */
//!             FUNCTIONS              */
/* ----------------------------------- */

// decrease product quantity
function handleMinusBtnClick(e) {
  const countSpan = e.target.nextElementSibling;
  if (parseInt(countSpan.textContent) > 1) {
    countSpan.textContent--;
    updateAmounts(e.target.closest(".item"));
  }
}

// increase product quantity
function handlePlusBtnClick(e) {
  const countSpan = e.target.previousElementSibling;
  if (parseInt(countSpan.textContent) < 10) {
    countSpan.textContent++;
    updateAmounts(e.target.closest(".item"));
  } else {
    alert("You can order a maximum of 10 of the same product in one purchase.");
  }
}

function handleRemoveIClick(e) {
  if (confirm("The product will be removed. Are you sure?")) {
    const removedItem = e.target.closest("li");
    const parentList = removedItem.parentElement;
    parentList.removeChild(removedItem);
    updateSummary(removedItem); // Update summary after removing the item
  }
}

function updateSummary(removedItem) {
  // If an item is removed, subtract its total from subtotal
  if (removedItem) {
    const removedItemTotal = parseFloat(
      removedItem.querySelector("#item-total").textContent
    );
    const subTotal = parseFloat(subTotalSpan.textContent.replace(currency, ""));
    const newSubTotal = subTotal - removedItemTotal;
    subTotalSpan.textContent = newSubTotal.toFixed(2) + currency;

    // Calculate VAT
    const taxAmount = (newSubTotal * 0.19).toFixed(2);
    taxSpan.textContent = taxAmount + currency;

    // Update Shipping Fee
    let shippingFee = 8;
    if (newSubTotal > 400) {
      shippingInfoSpan.textContent = "Shipping (Free)";
      shippingFee = 0;
    } else {
      shippingInfoSpan.textContent = "Shipping";
    }
    shippingPriceSpan.textContent = shippingFee.toFixed(2) + currency;

    // Calculate Total
    const totalAmount = (
      newSubTotal +
      parseFloat(taxAmount) +
      shippingFee
    ).toFixed(2);
    totalSpan.textContent = totalAmount + currency;
  }
}

function updateAmounts() {
  // Initialize subtotal
  let subTotalSum = 0;

  // Update each product total and calculate subtotal
  allItemTotalSpan.forEach((itemTotalSpan, index) => {
    if (itemTotalSpan) {
      const discount = parseFloat(
        document.querySelectorAll("#discount")[index].textContent
      );
      const count = parseFloat(allCountSpans[index].textContent);
      const itemTotal = (discount * count).toFixed(2);
      itemTotalSpan.textContent = itemTotal + currency;
      subTotalSum += parseFloat(itemTotal);
    }
  });

  // Update the subtotal
  subTotalSpan.textContent = subTotalSum.toFixed(2) + currency;

  // Calculate the tax amount
  const taxAmount = (subTotalSum * 0.19).toFixed(2);
  taxSpan.textContent = taxAmount + currency;

  // Shipping Fee
  let shippingFee = 8;
  if (subTotalSum > 400) {
    shippingInfoSpan.textContent = "Shipping (Free)";
    shippingFee = 0;
  } else {
    shippingInfoSpan.textContent = "Shipping";
  }
  shippingPriceSpan.textContent = shippingFee.toFixed(2) + currency;

  // Calculate the Total (including VAT)
  const totalAmount = (
    subTotalSum +
    parseFloat(taxAmount) +
    shippingFee
  ).toFixed(2);
  totalSpan.textContent = totalAmount + currency;
}
