document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const digitBoxes = document.querySelectorAll('.digit-box');
    const digits = document.querySelectorAll('.digit');
    const spinButton = document.getElementById('spin-btn');
    const fromInput = document.getElementById('from-input');
    const toInput = document.getElementById('to-input');
    const enBtn = document.getElementById('en-btn');
    const viBtn = document.getElementById('vi-btn');
    const titleEn = document.getElementById('title-en');
    const titleVi = document.getElementById('title-vi');

    // Language toggle
    enBtn.addEventListener('click', function() {
        enBtn.classList.add('active');
        viBtn.classList.remove('active');
        titleEn.classList.remove('d-none');
        titleVi.classList.add('d-none');
    });

    viBtn.addEventListener('click', function() {
        viBtn.classList.add('active');
        enBtn.classList.remove('active');
        titleVi.classList.remove('d-none');
        titleEn.classList.add('d-none');
    });

    // Input validation
    fromInput.addEventListener('change', validateInputs);
    toInput.addEventListener('change', validateInputs);
    
    function validateInputs() {
        let fromValue = parseInt(fromInput.value);
        let toValue = parseInt(toInput.value);
        
        // Ensure values are numbers
        if (isNaN(fromValue)) fromValue = 0;
        if (isNaN(toValue)) toValue = 9999;
        
        // Enforce limits
        fromValue = Math.max(0, Math.min(9999, fromValue));
        toValue = Math.max(0, Math.min(9999, toValue));
        
        // Ensure "from" is not greater than "to"
        if (fromValue > toValue) {
            fromInput.classList.add('shake');
            toInput.classList.add('shake');
            
            setTimeout(() => {
                fromInput.classList.remove('shake');
                toInput.classList.remove('shake');
            }, 500);
            
            // Swap values
            const temp = fromValue;
            fromValue = toValue;
            toValue = temp;
        }
        
        // Update input values
        fromInput.value = fromValue;
        toInput.value = toValue;
    }

    // Spin button click handler
    spinButton.addEventListener('click', function() {
		if (spinButton.classList.contains('spinning')) return;

		spinButton.classList.add('spinning');
		validateInputs();

		const fromValue = parseInt(fromInput.value);
		const toValue = parseInt(toInput.value);

		// Dừng animation cũ
		digits.forEach(digit => {
			digit.parentElement.classList.remove('spinning');
			digit.classList.remove('winner');
			digit.textContent = '0';
		});

		const randomNum = getRandomNumber(fromValue, toValue);
		const paddedNumber = randomNum.toString().padStart(4, '0');

		// TẤT CẢ bắt đầu quay ngay lập tức
		digits.forEach((digit) => {
			digit.parentElement.classList.add('spinning');
		});

		// Dừng quay lần lượt từng digit
		digits.forEach((digit, index) => {
			const stopDelay = 6000 + index * 2000; // bắt đầu dừng từ 5s, mỗi thẻ cách 2s

			setTimeout(() => {
				digit.parentElement.classList.remove('spinning');
				digit.textContent = paddedNumber[index];

				digit.classList.add('winner');
				setTimeout(() => digit.classList.remove('winner'), 200);

				if (index === digits.length - 1) {
					spinButton.classList.remove('spinning');
				}
			}, stopDelay);
		});
	});
	
    // Get random number within range
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Display number in the digit boxes
    function displayNumber(number) {
        // Pad with leading zeros if necessary
        const paddedNumber = number.toString().padStart(4, '0');
        
        // Update each digit
        for (let i = 0; i < 4; i++) {
            digits[i].textContent = paddedNumber[i];
        }
    }

    // Initialize with zeros
    displayNumber(0);
});