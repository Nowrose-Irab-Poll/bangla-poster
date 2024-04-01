document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('signin-button').addEventListener('click', function(event){
        if($_BANGLA_BANNER.validateSignIn()) {
            document.getElementById("signin-button").style.display='none';
            document.getElementById("signin-spinner").style.display = 'flex';
            var phone = document.getElementById("formPhone").value;
            var password = document.getElementById("formPassword").value;
            $_BANGLA_BANNER.signInUser(phone,password);
        }
    })
});

$_BANGLA_BANNER = {
    validateSignIn: function() {
        let phoneNumberValidate = document.getElementById("formPhone").value;
        let passwordValidate = document.getElementById("formPassword").value;
        if(!phoneNumberValidate.length) {
            document.getElementById("phone-error").innerText = "Phone number can not be empty";
            document.getElementById("password-error").innerText = "";
            return false;
        }
        if(!passwordValidate.length) {
            document.getElementById("password-error").innerText = "Password can not be empty";
            document.getElementById("phone-error").innerText = "";
            return false;
        }
        return true;
    },
    signInUser: function(phone,password) {
        var signInUrl = CONFIG.HOST_URL + "api/user/login";
        const registerData = {
            "phone":phone,
            "password":password
        };
        fetch(signInUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
          })
          .then(response => {
            switch(response.status) {
                case 200:
                    var responseData = response.json();
                    document.getElementById("signin-button").style.display='flex';
                    document.getElementById("signin-spinner").style.display = 'none';
                    document.getElementById("signin-status").innerText = "";
                    window.location.href = CONFIG.ROOT_DOMAIN + "index.html";
                    break;
                case 404:
                    var responseData = response.json();
                    document.getElementById("signin-button").style.display='flex';
                    document.getElementById("signin-spinner").style.display = 'none';
                    document.getElementById("signin-status").innerText = "Phone number or password is wrong";
                    break;
                case 401:
                    var responseData = response.json();
                    document.getElementById("signin-button").style.display='flex';
                    document.getElementById("signin-spinner").style.display = 'none';
                    document.getElementById("signin-status").innerText = "Phone number or password is wrong";
                    break;
                default:
                    console.error(response.json());
                    document.getElementById("signin-button").style.display='flex';
                    document.getElementById("signin-spinner").style.display = 'none';
                    document.getElementById("signin-status").innerText = "Oh snap!! Something went wrong. Might be Aliens invaded us or we crashed";
                    throw new Error("Oh snap! Something went wrong");

            }
          })
          .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
            return "Oh snap! Something went wrong";
          });
    }
}