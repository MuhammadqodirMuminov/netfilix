const elFormLogin = document.querySelector(".login-form"),
	elEmailInput = document.querySelector("#email"),
	elPhoneInput = document.querySelector("#phone"),
	elPasswordInput = document.querySelector("#password");

elFormLogin.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const email = elEmailInput.value;
	const password = elPasswordInput.value;
	const Phone = elPhoneInput.value;

	const data = {
		email: email,
		password: password,
		phone: Phone,
		name: "name",
		inn: 123123,
		company_name: "kompany",
		type: "partner",
		bank_account: "asdasd",
		bank_name: "bank",
		mfo: 12123123321123,
		company_address: "asdasdwqeq",
	};

	(async function () {
		try {
			const res = await fetch(
				"https://backend.gazoil.uz/accounts/register/",
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (res.status === 201) {
                window.location.href = "http://127.0.0.1:5500/index.html";
                localStorage.setItem('token','token');
			} else {
				const igNore = document.createElement("p");
				igNore.textContent =
					"Email yoki password no'to'g'ri kiritildi !!!";
				igNore.style.color = "yellow";
				elFormLogin.append(igNore);
			}
		} catch (error) {
			console.log(error);
		}
	})();
});
