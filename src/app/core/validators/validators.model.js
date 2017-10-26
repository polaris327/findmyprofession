export var ValidationErrors = {
    full_name: {
        required: 'Full name is required field.',
        minLength: 'Full name should be more than 3 characters length.',
        maxLength: 'Full name should be less than 30 characters length.'
    },
    email: {
        required: 'Email is required field.',
        pattern: 'Email pattern is not valid.'
    },
    password: {
        required: 'Password is required field',
        minLength: 'Password should be more than 8 characters length.',
        format: 'Password should include as least one numeric, special character and at least on capital letter.'
    },
    confPassword: {
        required: 'Confirm password is required.',
        passwordsNotMatch: 'Passwords should be equals.'
    },
    acceptConditions: {
        required: 'You should accept conditions.',
        requiredTrue: 'You should accept conditions.'
    },
    number: {
        required: 'Card number is required field.',
        in_valid: 'Invalid card number.'
    },
    phone_number: {
        required: 'Phone number is required field.'
    }
};
