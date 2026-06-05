function includeHTML() {
  const includeElements = document.querySelectorAll("[include-html]");

  includeElements.forEach((el) => {
    const file = el.getAttribute("include-html");

    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        el.innerHTML = data;
        el.removeAttribute("include-html");
      });
  });
}

includeHTML();