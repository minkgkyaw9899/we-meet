import otpGenerator from "otp-generator"

export const generateOTPCode = (length = 6) => {
    return otpGenerator.generate(length, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    })
}
