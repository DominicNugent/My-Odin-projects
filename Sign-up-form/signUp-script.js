    // links to fern pic's creator
    document.addEventListener('DOMContentLoaded', function() {
    const attribution1 = "https://unsplash.com/it/@haliewestphoto?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    const attribution2 = "https://unsplash.com/it/foto/pianta-a-foglia-verde-in-fotografia-ravvicinata-25xggax4bSA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"

    const href1 = document.querySelector('.source1');
    const href2 = document.querySelector('.source2');

    href1.href = attribution1;
    href2.href = attribution2;
});

    // password comparison checker
document.addEventListener('DOMContentLoaded', function () {
    var passwordField1 = document.querySelector('#password');
    var passwordField2 = document.querySelector('#confirm-password');
    var pwMsg = document.querySelector('#pw-message');
    //pw-match-message

    passwordField1.addEventListener('blur', verifyPasswordMatch);
    passwordField2.addEventListener('blur', verifyPasswordMatch);

    function verifyPasswordMatch() {
        // Get the values of both password fields
        var password1 = passwordField1.value;
        var password2 = passwordField2.value;
        var badPasswords = ['password', 'PASSWORD', 'Password'];

        if (password1 !== '' && password2 !== '') {
            // Check if the passwords match
            if (password1 === password2) {
                // Passwords match, update styles or provide feedback
                passwordField1.setCustomValidity('');
                passwordField2.setCustomValidity('');
                console.log('Passwords match');
                pwMsg.textContent = ' ';
                if (badPasswords.includes(password1)) {
                    pwMsg.textContent = 'Dude. What did I tell you about using that?!';
                }

            } else {
                // Passwords do not match, update styles or provide feedback
                passwordField1.setCustomValidity('Passwords do not match');
                passwordField2.setCustomValidity('Passwords do not match');
                console.log('Passwords do not match');
                pwMsg.textContent = '* Passwords do not match';
            }
        } else {
            console.log("Need both PW fields to have a value before comparing.");
        }
    }
});