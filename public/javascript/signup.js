const remove_errors = (id) => {
    const error_prompt = document.getElementById(id)
    if (error_prompt) {
        error_prompt.remove();
    }
}

const toggle_spinner = () => {
    document.querySelector(`#submit-text`).classList.toggle('hidden')
    document.querySelector('.spinner').classList.toggle('hidden')
}

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    toggle_spinner();
    remove_errors('signup_error_prompt');
    const data = {
        user_name: document.getElementById('signup-username').value,
        user_email: document.getElementById('signup-email').value,
        user_pwd: document.getElementById('signup-password').value
    }
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
 
    if ( response.ok ){
        location = `/login`
    } else {
        const body = await response.json()
        const error_prompt = document.createElement('span');
        error_prompt.id = 'signup_error_prompt';
        error_prompt.classList.add('error_prompt');
        error_prompt.innerHTML = '*' + body.msg;
        document.getElementById('error-container').prepend(error_prompt)
    }
    toggle_spinner();
});