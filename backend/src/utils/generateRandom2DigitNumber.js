const getRandom2DigitNumber = () => {
    return Math.floor(Math.random() * (25 - 12 + 1)) + 12;
}

export default getRandom2DigitNumber;