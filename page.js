document.addEventListener("DOMContentLoaded", function () {
  const currency = "€";

  /* ---------------------------------- */
  //!             Functions             */
  /* ---------------------------------- */

  function updateProductTotal(li) {
    // Retrieve count and discount values from the list item
    const count = parseInt(li.querySelector(".count").textContent);
    const discount = parseFloat(
      li.querySelector("#discount").textContent.replace(currency, "")
    );
    // Calculate item total and update the displayed value
    const productTotal = (count * discount).toFixed(2);
    li.querySelector("#item-total").textContent = productTotal + currency;
    return parseFloat(productTotal);
  }

  function updateSummary() {
    // Initialize subtotal
    let subtotal = 0;
    // Get all list items containing items in the cart
    const items = document.querySelectorAll(".items li");
    // Iterate through each list item and update the subtotal
    items.forEach(function (li) {
      subtotal += updateProductTotal(li);
    });

    // Calculate VAT, shipping, and total
    const vat = (subtotal * 0.19).toFixed(2);

    let shipping;
    const shippingInfo = document.getElementById("shipping-info");
    if (subtotal > 200) {
      shipping = "0.00";
      // add info into shipping if subtotal over 400€
      shippingInfo.textContent = "Shipping (FREE)";
    } else if (subtotal === 0) {
      shippingInfo.textContent = "Shipping";
      shipping = "0.00";
      const items = document.querySelector(".items");
      items.textContent = "Your shopping cart is empty";
      items.style.cssText =
        "background-color:lightgreen; margin:0rem 0rem 2rem 2rem;padding:0rem;text-align:center;";
    } else {
      shippingInfo.textContent = "Shipping";
      shipping = "8.00";
    }

    const total = (subtotal + parseFloat(vat) + parseFloat(shipping)).toFixed(
      2
    );

    // Update summary section with calculated values
    document.getElementById("sub-total").textContent =
      subtotal.toFixed(2) + currency;
    document.getElementById("tax").textContent = vat + currency;
    document.getElementById("shipping-price").textContent = shipping + currency;
    document.getElementById("total").textContent = total + currency;
  }

  function removeItem(li) {
    // Remove the specified list item and update the summary
    li.remove();
    updateSummary();
  }

  /* ---------------------------------- */
  //!          Event Listeners          */
  /* ---------------------------------- */
  const plusButtons = document.querySelectorAll(".plus");
  const minusButtons = document.querySelectorAll(".minus");
  const removeButtons = document.querySelectorAll(".remove");
  const allInputs = document.querySelectorAll("input");

  // add or remove opacity => on and off focus inputs
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

  // Increase the count when the plus button is clicked (+1)
  plusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const countSpan = button.parentElement.querySelector(".count");
      let count = parseInt(countSpan.textContent);
      if (count < 10) {
        count++;
        countSpan.textContent = count;
      } else alert("You can order a maximum of 10 of the same product in one purchase.");
      // Update item total and summary
      updateProductTotal(button.closest("li"));
      updateSummary();
    });
  });

  // Decrease the count when the minus button is clicked (-1)
  minusButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const countSpan = button.parentElement.querySelector(".count");
      let count = parseInt(countSpan.textContent);
      if (count > 1) {
        count--;
        countSpan.textContent = count;
        // Update item total and summary
        updateProductTotal(button.closest("li"));
        updateSummary();
      }
    });
  });

  // Remove the item when the remove button is clicked
  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      removeItem(button.closest("li"));
    });
  });

  // Initially update the summary (default)
  updateSummary();
});
