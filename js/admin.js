const logOut = document.querySelector(".log-out");
const popularPost = document.querySelector("#popularPost");
const fragment = document.createDocumentFragment();
const template = document.querySelector("#templateAll");
const genreSelect = document.querySelector(".select");
const subtitle = document.querySelector("#subtitle");
const image = document.querySelector("#image");
const form = document.querySelector(".form ");

logOut.addEventListener("click", () => {
	window.location.href = "http://127.0.0.1:5500/index.html";
	localStorage.removeItem("token");
});

let array = [];

const fetchAllPosts = async () => {
	const res = await fetch("https://639b4a2a31877e43d6888973.mockapi.io/data", {
		method: "GET",
	}).then((res) => res.json());

	render(res, popularPost);
};
fetchAllPosts();

function render(res, parent) {
	parent.textContent = "";

	res.reverse().forEach((post) => {
		const templatePost = template.content.cloneNode(true);
		const img = templatePost.querySelector("#postImg");
		const subtitle = templatePost.querySelector(".description");
		const genre = templatePost.querySelector(".genre");
		const singleBtn = templatePost.querySelector(".singleBtn");

		img.src = post.avatar;
		subtitle.textContent = post.subtitle;
		genre.textContent = post.genre;
		singleBtn.setAttribute("data-id", `${post.id}`);

		fragment.append(templatePost);
	});

	popularPost.appendChild(fragment);
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const genreValue = genreSelect.value;
	const subtitleValue = subtitle.value;
	const imageValue = image.value;

	const post = {
		avatar: imageValue,
		subtitle: subtitleValue,
		genre: genreValue,
	};

	const editPost = async () => {
		const resData = await fetch(
			`https://639b4a2a31877e43d6888973.mockapi.io/data`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(post),
			}
		).then((data) => data.json());

		window.location.reload();
	};
	editPost();
});
