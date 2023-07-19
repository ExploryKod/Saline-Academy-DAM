const PasswordStrengthIndicator = ({ strength }) => {

    return(
        <div className={`password-strength strength-${strength.toString()}`}><span></span></div>
    )
};

export default PasswordStrengthIndicator;