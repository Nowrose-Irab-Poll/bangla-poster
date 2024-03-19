document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('register-button').addEventListener('click', function(event){
        if($_BANGLA_BANNER.validateSignUp()) {
            document.getElementById("register-button").style.display='none';
            document.getElementById("register-spinner").style.display = 'flex';
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
    }
}