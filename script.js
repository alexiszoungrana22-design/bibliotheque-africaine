
const resources = [
  {
    title: "Littérature africaine",
    author: "Collection à constituer",
    category: "Littérature",
    symbol: "📚",
    description: "Découvrir les romans, les poèmes et les écrivains du continent.",
    url: ""
  },
  {
    title: "Histoire des royaumes africains",
    author: "Collection à constituer",
    category: "Histoire",
    symbol: "🏛️",
    description: "Explorer les royaumes, les empires et les grandes périodes historiques.",
    url: ""
  },
  {
    title: "Ressources pour les étudiants",
    author: "Collection éducative",
    category: "Éducation",
    symbol: "🎓",
    description: "Un espace pour réunir des cours et des documents éducatifs autorisés.",
    url: ""
  },
  {
    title: "Contes et traditions africaines",
    author: "Patrimoine oral",
    category: "Culture",
    symbol: "🌍",
    description: "Préserver et découvrir les récits et les traditions des peuples africains.",
    url: ""
  }
];

let selectedCategory = "Tous";

const list = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");
const count = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");

function renderResources() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");

  const filtered = resources.filter(item => {
    const matchesCategory =
      selectedCategory === "Tous" ||
      item.category === selectedCategory;

    const text = [
      item.title,
      item.author,
      item.category,
      item.description
    ].join(" ").toLocaleLowerCase("fr");

    return matchesCategory && text.includes(query);
  });

  list.replaceChildren();

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "book-card";

    const symbol = document.createElement("div");
    symbol.className = "book-symbol";
    symbol.textContent = item.symbol;

    const category = document.createElement("div");
    category.className = "book-category";
    category.textContent = item.category;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = item.author;

    const description = document.createElement("p");
    description.textContent = item.description;

    card.append(symbol, category, title, author, description);

    if (item.url) {
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = "Consulter la ressource";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.append(link);
    } else {
      const note = document.createElement("p");
      note.textContent = "Collection en préparation";
      card.append(note);
    }

    list.append(card);
  });

  count.textContent =
    filtered.length + (filtered.length > 1
      ? " ressources"
      : " ressource");

  emptyMessage.hidden = filtered.length > 0;
}

document.getElementById("search-form").addEventListener(
  "submit",
  event => {
    event.preventDefault();
    renderResources();
  }
);

searchInput.addEventListener("input", renderResources);

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderResources();
  });
});

renderResources();
