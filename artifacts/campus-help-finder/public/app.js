(() => {
  const searchInput = document.querySelector("#resource-search");
  const clearButton = document.querySelector("#clear-search");
  const resetButton = document.querySelector("#reset-search");
  const cards = [...document.querySelectorAll(".resource-card")];
  const count = document.querySelector("#result-count");
  const emptyState = document.querySelector("#empty-state");

  function filterResources() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const searchableText = `${card.dataset.search} ${card.querySelector("h3").textContent} ${card.querySelector("p").textContent}`.toLocaleLowerCase();
      const matches = !query || searchableText.includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    count.textContent = String(visibleCount);
    emptyState.hidden = visibleCount !== 0;
    clearButton.hidden = searchInput.value.length === 0;
  }

  searchInput.addEventListener("input", filterResources);

  function resetSearch() {
    searchInput.value = "";
    filterResources();
    searchInput.focus();
  }

  clearButton.addEventListener("click", resetSearch);
  resetButton.addEventListener("click", resetSearch);

  document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === "Escape" && document.activeElement === searchInput) {
      resetSearch();
    }
  });
})();
