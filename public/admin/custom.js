'use strict';

const alertBox = document.getElementById('alert-box');
function addAlert(message, status = 'danger') {
    if (message) {
        message = message.split('\n');
        message = message.filter(item => {
            return item !== '' && item !== ' ' && !item.includes('request.body');
        }).join("<br />");
    } else {
        message = 'Something went wrong!';
    }
    let typeClass = 'danger';
    if (status === 'success') {
        typeClass = 'success';
    } else if (status === 'info') {
        typeClass = 'info';
    } else if (status === 'warning') {
        typeClass = 'warning';
    }
    const alertBoxId = 'alert-' + Date.now().toString();
    alertBox.innerHTML += `
    <div class="alert alert-dismissible alert-${typeClass} fade show" role="alert" id="${alertBoxId}">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    setTimeout(function (alertId) {
        document.getElementById(alertId).remove();
    }.bind(null, alertBoxId), 8000);

}

function setEventListener() {
    const allInputs = document.querySelectorAll('input, select, textarea');
    for (const input of allInputs) {
        input.removeEventListener('focus', console.log);
        input.addEventListener('focus', function () {
            this.classList.remove('is-invalid');
            const parent = this.closest('.mb-3');
            if (parent) {
                const feedbackBox = parent.querySelector('.invalid-feedback-box');
                if (feedbackBox) {
                    feedbackBox.innerHTML = '';
                }
            }
        });
    }

    const allRadio = document.querySelectorAll('input[type="radio"]');
    for (const radio of allRadio) {
        if (radio.value === radio.dataset.value) {
            radio.checked = true;
        }
    }

    const birthday = document.getElementById('birthday');
    if (birthday) {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() - 1);
        birthday.max = maxDate.toLocaleDateString('fr-ca');

        birthday.addEventListener("invalid", function (e) {
            e.preventDefault();
            e.target.classList.add('is-invalid');
            const parent = e.target.closest('.mb-3');
            if (parent) {
                const feedbackBox = parent.querySelector('.invalid-feedback-box');
                if (feedbackBox) {
                    feedbackBox.innerHTML += `<div class="invalid-feedback" style="display: unset;    margin-right: 5px;" >${e.target.validationMessage}.</div>`;
                }
            }
        }, true);
    }
}

(function () {
    setEventListener();
    function handleSubmit(event) {
        if (event.target.dataset.submit === 'no') {
            return;
        }
        event.preventDefault();
        const invalidFeedbackBoxs = document.querySelectorAll('.invalid-feedback-box');
        for (const box of invalidFeedbackBoxs) {
            box.innerHTML = '';
        }
        const multiSelectValues = {};
        const allMultiSelect = event.target.querySelectorAll('.multi-select');
        for (const multiSelect of allMultiSelect) {
            if (!multiSelectValues[multiSelect.name]) {
                multiSelectValues[multiSelect.name] = [];
            }
            for (const option of multiSelect.options) {
                if (option.selected) {
                    multiSelectValues[multiSelect.name].push(option.value);
                }
            }
        }

        const data = new FormData(event.target);
        let values = Object.fromEntries(data.entries());
        const url = event.target.action;
        const method = event.target.method;
        const redirectUrl = event.target.dataset.redirect;
        const schemaName = event.target.dataset.schema;
        let notRequired = event.target.dataset.notRequired;
        console.log('notRequired =====', notRequired);
        if (schemaName && schemas.hasOwnProperty(schemaName)) {
            const schema = { ...schemas[schemaName] };
            if (notRequired) {
                notRequired = notRequired.split(',');
                for (const key of notRequired) {
                    if (values.hasOwnProperty(key)) {
                        delete schema[key];
                    }
                }
            }

            for (const key in schema) {
                if (Object.hasOwnProperty.call(schema, key)) {
                    if (schema[key].presence?.allowEmpty && !values[key] && !schema[key].equality) {
                        delete schema[key];
                    }
                }
            }

            // console.log('schema =====', schema);

            values = { ...values, ...multiSelectValues };
            const errors = validate({ ...values }, schema);
            console.log('errors =====', errors);
            if (errors) {
                for (const key in errors) {
                    if (Object.hasOwnProperty.call(errors, key)) {
                        const messages = errors[key];
                        const input = document.querySelector(`[name="${key}"]`);
                        input.classList.add('is-invalid');
                        const parent = input.closest('.mb-3');
                        if (parent) {
                            const feedbackBox = parent.querySelector('.invalid-feedback-box');
                            if (feedbackBox) {
                                for (const message of messages) {
                                    feedbackBox.innerHTML += `<div class="invalid-feedback" style="display: unset;    margin-right: 5px;" >${message.charAt(0).toUpperCase() + message.slice(1)}.</div>`;
                                }
                            }
                        }
                    }
                }
                setEventListener();
                return;
            } else {
                console.log('No errors');
            }
        } else {
            console.log('Schema not found');
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                console.log('res =====', res);
                addAlert(res.message, res.status);
                if (res.status === 'success') {
                    if (redirectUrl !== 'noredirect') {
                        window.location.href = redirectUrl || '/admin/profile';
                    }
                    if (event.target.dataset.reset !== 'noreset') {
                        event.target.reset();
                    }
                }
                if (res.name === 'AJV_VALIDATION_ERROR') {
                    const errors = res.errors;
                    for (const error of errors) {
                        const input = document.querySelector(`[name="${error.instancePath.slice(1)}"]`);
                        if (input) {
                            input.classList.add('is-invalid');
                            const parent = input.closest('.mb-3');
                            if (parent) {
                                const feedbackBox = parent.querySelector('.invalid-feedback-box');
                                if (feedbackBox) {
                                    feedbackBox.innerHTML += `<div class="invalid-feedback" style="display: unset;" >${error.message.charAt(0).toUpperCase() + error.message.slice(1)}</div>`;
                                }
                            }

                        }
                    }
                }

            })
            .catch(err => console.log(err));
    }
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);

    $('.togglePassword').on('click', function () {
        $(this).toggleClass('fa-eye');
        $(this).toggleClass('fa-eye-slash');
        var passwordInput = $(this).siblings('input');
        var fieldType = passwordInput.attr('type');
        // Toggle between password and text
        passwordInput.attr('type', fieldType === 'password' ? 'text' : 'password');

    });


    const currentPath = location.pathname;
    $(".sidebar-dropdown > a").each(function () {
        if ($(this).attr("href") == currentPath) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });

})();

// validation Shecmas 
var loginSchema = {
    email: {
        presence: { allowEmpty: false },
        email: true,
    },
    password: {
        presence: { allowEmpty: false },
        length: {
            minimum: 8,
            message: "must be at least 8 characters"
        }
    }
}

var profileSchema = {
    firstName: {
        presence: { allowEmpty: false },
    },
    lastName: {
        presence: { allowEmpty: false },
    },
    email: {
        presence: { allowEmpty: false },
        email: true,
    },
    phone: {
        presence: { allowEmpty: false }
    }
};

var forgotPasswordSchema = {
    email: {
        presence: { allowEmpty: false },
        email: true,
    }
};
var resetPasswordSchema = {
    password: {
        presence: { allowEmpty: false },
        length: {
            minimum: 8,
            message: "must be at least 8 characters"
        }
    },
    confirmPassword: {
        presence: { allowEmpty: false },
        equality: {
            attribute: "password",
            message: "doesn't match"
        }
    }
};
var changePasswordSchema = {
    oldPassword: {
        presence: { allowEmpty: false },
        length: {
            minimum: 8,
            message: "must be at least 8 characters"
        }
    },
    password: {
        presence: { allowEmpty: false },
        length: {
            minimum: 8,
            message: "must be at least 8 characters"
        }
    },
    confirmPassword: {
        presence: { allowEmpty: false },
        equality: {
            attribute: "password",
            message: "doesn't match"
        }
    }
};

var schemas = {
    login: loginSchema,
    profile: profileSchema,
    forgotPassword: forgotPasswordSchema,
    resetPassword: resetPasswordSchema,
    changePassword: changePasswordSchema
};

