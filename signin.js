document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('signin-button').addEventListener('click', function(event){
        if($_BANGLA_BANNER.validateSignIn()) {
            document.getElementById("signin-button").style.display='none';
            document.getElementById("signin-spinner").style.display = 'flex';
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
    }
}