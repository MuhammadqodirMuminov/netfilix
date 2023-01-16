const cardImg = document.querySelector(".card-img");
const cardDescription = document.querySelector(".card-desc");
const cardGenre = document.querySelector(".card-genre");
const id = localStorage.getItem("id");
const token = localStorage.getItem("token");
const buttonControl = document.querySelector(".card-buttons");
const delBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");
const elModal = document.querySelector(".modal-section");
const modalContent = document.querySelector(".modal-content");
const modalDel = document.querySelector(".modal-delete");
const modalClose = document.querySelector(".modal-close");
const modalCloseBtn = document.querySelector(".modal-edit");
const editModal = document.querySelector(".modal-edit-section");
const editModalContent = document.querySelector(".modal-edit-content");
const editModalClose = document.querySelector(".modal-edit-close");
const editModalCloseBtn = document.querySelector(".modal-close-btn");
const updatePost = document.querySelector(".modal-update");

const fetchSingle = async () => {
	const res = await fetch(
		`https://639b4a2a31877e43d6888973.mockapi.io/data/${id}`,
		{ method: "GET" }
	).then((res) => res.json());

	if (token) {
		buttonControl.style.display = "flex";
	}

	cardImg.src = res.avatar;
	cardDescription.textContent = res.subtitle;
	cardGenre.textContent = res.genre;
};

fetchSingle();

delBtn.addEventListener("click", () => {
	elModal.style.display = "block";
	modalContent.style.transform = "translateY(100px)";
	document.body.style.overflow = "hidden";

	modalClose.addEventListener("click", () => {
		elModal.style.display = "none";
		modalContent.style.transform = "translateY(-4000px)";
		document.body.style.overflow = "scroll";
	});

	elModal.addEventListener("click", (e) => {
		if (e.target.classList.contains("modal-section")) {
			elModal.style.display = "none";
			modalContent.style.transform = "translateY(-4000px)";
			document.body.style.overflow = "scroll";
		}
	});

	modalCloseBtn.addEventListener("click", (e) => {
		elModal.style.display = "none";
		modalContent.style.transform = "translateY(-4000px)";
		document.body.style.overflow = "scroll";
	});

	modalDel.addEventListener("click", () => {
		const fetchDelete = async () => {
			const responce = await fetch(
				`https://639b4a2a31877e43d6888973.mockapi.io/data/${id}`,
				{ method: "DELETE" }
			).then((res) => res.json());
			localStorage.removeItem("id");
			window.location.href = "http://127.0.0.1:5500/index.html";
		};
		fetchDelete();
	});
});

editBtn.addEventListener("click", () => {
	editModal.style.display = "block";
	editModalContent.style.transform = "translateY(100px)";
	document.body.style.overflow = "hidden";

	const modalImg = document.querySelector("#modal-img");
	const modalSelect = document.querySelector(".select");
	const modalContent = document.querySelector("#modal-description");

	const fetchEdit = async () => {
		const responce = await fetch(
			`https://639b4a2a31877e43d6888973.mockapi.io/data/${id}`,
			{ method: "GET" }
		).then((res) => res.json());

		modalImg.value = responce.avatar;
		modalSelect.value = responce.genre;
		modalContent.value = responce.subtitle;

		updatePost.addEventListener("click", () => {
			const editPost = async () => {
				const post = {
					avatar: modalImg.value,
					genre: modalSelect.value,
					subtitle: modalContent.value,
				};

				const resData = await fetch(
					`https://639b4a2a31877e43d6888973.mockapi.io/data/${id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(post),
					}
				).then((data) => data.json());

				editModal.style.display = "none";
				editModalContent.style.transform = "translateY(-4000px)";
                document.body.style.overflow = "scroll";
                window.location.reload();
			};
			editPost();
		});
	};
	fetchEdit();

	editModalClose.addEventListener("click", () => {
		editModal.style.display = "none";
		editModalContent.style.transform = "translateY(-4000px)";
		document.body.style.overflow = "scroll";
	});

	editModal.addEventListener("click", (e) => {
		if (
			e.target.classList.contains("modal-edit-section") ||
			e.target.classList.contains("modal")
		) {
			editModal.style.display = "none";
			editModalContent.style.transform = "translateY(-4000px)";
			document.body.style.overflow = "scroll";
		}
	});

	editModalCloseBtn.addEventListener("click", () => {
		editModal.style.display = "none";
		editModalContent.style.transform = "translateY(-4000px)";
		document.body.style.overflow = "scroll";
	});
});
