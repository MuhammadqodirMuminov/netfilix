const popular = document.querySelector(".box"),
	trend = document.querySelector("#trend"),
	tvShows = document.querySelector("#shows"),
	adventure = document.querySelector("#adventure"),
	original = document.querySelector("#original"),
	eltemplate = document.querySelector("#template"),
	elFragment = document.createDocumentFragment(),
	token = localStorage.getItem("token"),
	elSubnav = document.querySelector(".sub-nav"),
    elSelect = document.querySelector(".select");
    
if (token) {
    const a = document.createElement("a");
    a.textContent = "Admin";
    a.href = "http://127.0.0.1:5500/pages/admin.html";
    elSubnav.append(a);
}

let data = [];

fetch("https://639b4a2a31877e43d6888973.mockapi.io/data", { method: "GET" })
	.then((res) => res.json())
	.then((res) => {
		data = res;
		renderFilms(data, popular);
		renderFilmsMin(data, trend);
		renderFilms(data, tvShows);
		renderFilmsMin(data, adventure);
		renderFilmsMin(data, original);
	})
	.catch((err) => console.log(err));

function renderFilms(data, elParent) {
	elParent.textContent = "";

	const posts = data.slice(0, 12);

	posts.forEach((post) => {
		const templatepost = eltemplate.content.cloneNode(true),
			postImg = templatepost.querySelector("#postImg"),
			description = templatepost.querySelector(".description"),
			genre = templatepost.querySelector(".genre"),
			singleBtn = templatepost.querySelector(".singleBtn");
		singleBtn.setAttribute("data-id", `${post.id}`);

		postImg.src = post.avatar;
		description.textContent = post.subtitle;
		genre.textContent = post.genre;

		elFragment.appendChild(templatepost);
	});

	elParent.appendChild(elFragment);
}

// TREND POSTS

function renderFilmsMin(data, elParent) {
	elParent.textContent = "";

	const posts = data.slice(0, 6);

	posts.forEach((post) => {
		const templatepost = eltemplate.content.cloneNode(true),
			postImg = templatepost.querySelector("#postImg"),
			description = templatepost.querySelector(".description"),
			genre = templatepost.querySelector(".genre"),
			singleBtn = templatepost.querySelector(".singleBtn");
		singleBtn.setAttribute("data-id", `${post.id}`);

		postImg.src = post.avatar;
		description.textContent = post.subtitle;
		genre.textContent = post.genre;

		elFragment.appendChild(templatepost);
	});

	elParent.appendChild(elFragment);
}

// SELECTION

elSelect.addEventListener("change", () => {
	fetch("https://639b4a2a31877e43d6888973.mockapi.io/data", { method: "GET" })
		.then((res) => res.json())
		.then((res) => {
			data = res;
			selection(data);
		})
		.catch((err) => console.log(err));

	const selectPost = [];

	const selectValue = elSelect.value.toLowerCase();

	function selection(data) {
		if (selectValue !== "all") {
			data.forEach((post) => {
				if (post.genre.toLowerCase() == selectValue) {
					selectPost.push(post);
				}
			});
			renderFilms(selectPost, popular);
			trend.textContent = "";
			tvShows.textContent = "";
			adventure.textContent = "";
			original.textContent = "";
		} else {
			renderFilms(data, popular);
			renderFilmsMin(data, trend);
			renderFilms(data, tvShows);
			renderFilmsMin(data, adventure);
			renderFilmsMin(data, original);
		}
	}
});

// SINGLE PAGE

const singlePagefetch = async () => {
	const res = await fetch("https://639b4a2a31877e43d6888973.mockapi.io/data", {
		method: "GET",
	});
	const data = res.json();

	const box = document.querySelector(".box");

	box.addEventListener("click", (e) => {
		if (e.target.classList.contains("singleBtn")) {
			localStorage.setItem("id", `${e.target.dataset.id}`);
			console.log(e.target.dataset.id);
			window.location.href = "http://127.0.0.1:5500/pages/single.html";
		}
	});
	trend.addEventListener("click", (e) => {
		if (e.target.classList.contains("singleBtn")) {
			localStorage.setItem("id", `${e.target.dataset.id}`);
			console.log(e.target.dataset.id);
			window.location.href = "http://127.0.0.1:5500/pages/single.html";
		}
	});
	tvShows.addEventListener("click", (e) => {
		if (e.target.classList.contains("singleBtn")) {
			localStorage.setItem("id", `${e.target.dataset.id}`);
			console.log(e.target.dataset.id);
			window.location.href = "http://127.0.0.1:5500/pages/single.html";
		}
	});
	adventure.addEventListener("click", (e) => {
		if (e.target.classList.contains("singleBtn")) {
			localStorage.setItem("id", `${e.target.dataset.id}`);
			console.log(e.target.dataset.id);
			window.location.href = "http://127.0.0.1:5500/pages/single.html";
		}
	});
	original.addEventListener("click", (e) => {
		if (e.target.classList.contains("singleBtn")) {
			localStorage.setItem("id", `${e.target.dataset.id}`);
			console.log(e.target.dataset.id);
			window.location.href = "http://127.0.0.1:5500/pages/single.html";
		}
	});
};

singlePagefetch();
