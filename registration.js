document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('register-button').addEventListener('click', function(event){
        if($_BANGLA_BANNER.validateSignUp()) {
            document.getElementById("register-button").style.display='none';
            document.getElementById("register-spinner").style.display = 'flex';
            var name = document.getElementById("register-name").value;
            var phone = document.getElementById("register-phone").value;
            var password = document.getElementById("register-password").value;
            $_BANGLA_BANNER.registraterUser(phone,name,password);
        }
    })
});

$_BANGLA_BANNER = {
    validateSignUp: function() {
        let nameValidate = document.getElementById("register-name").value;
        let phoneNumberValidate = document.getElementById("register-phone").value;
        let passwordValidate = document.getElementById("register-password").value;
        if(!nameValidate.length) {
            document.getElementById("name-error").innerText = "Name can not be empty";
            document.getElementById("phone-error").innerText = "";
            document.getElementById("password-error").innerText = "";
            return false;
        }
        if(!phoneNumberValidate.length) {
            document.getElementById("name-error").innerText = "";
            document.getElementById("phone-error").innerText = "Phone number can not be empty";
            document.getElementById("password-error").innerText = "";
            return false;
        }
        if(!passwordValidate.length) {
            document.getElementById("name-error").innerText = "";
            document.getElementById("password-error").innerText = "Password can not be empty";
            document.getElementById("phone-error").innerText = "";
            return false;
        }
        return true;
    },
    registraterUser: function(phone,name,password) {
        var registerUrl = CONFIG.HOST_URL + "api/user/register";
        const registerData = {
            "phone":phone,
            "name":name,
            "password":password
        };
        fetch(registerUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
          })
          .then(response => {
            switch(response.status) {
                case 409:
                    document.getElementById("register-button").style.display='flex';
                    document.getElementById("register-spinner").style.display = 'none';
                    document.getElementById("registration-status").innerText = "User with same email or phone already exists";
                    throw new Error("User with same email or phone already exists");
                case 201:
                    var responseData = response.json();
                    document.getElementById("register-button").style.display='flex';
                    document.getElementById("register-spinner").style.display = 'none';
                    document.getElementById("registration-status").innerText = "";
                    window.location.href = CONFIG.ROOT_DOMAIN + "signin.html";
                    break;
                default:
                    console.error(response.json());
                    document.getElementById("register-button").style.display='flex';
                    document.getElementById("register-spinner").style.display = 'none';
                    document.getElementById("registration-status").innerText = "Oh snap!! Something went wrong. Might be Aliens invaded us or we crashed";
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