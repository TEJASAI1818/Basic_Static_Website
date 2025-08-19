document.addEventListener('DOMContentLoaded', () => {
  const enrollForm = document.getElementById('enrollForm');
  const enrollMessage = document.getElementById('enrollMessage');

  if (enrollForm) {
    enrollForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const mobile = document.getElementById('mobile').value;
      const email = document.getElementById('email').value;
      const drivingType = document.getElementById('drivingType').value;

      // Client-side validation
      if (age < 16) {
        enrollMessage.textContent = 'You must be at least 16 years old to enroll.';
        enrollMessage.classList.remove('text-green-600');
        enrollMessage.classList.add('text-red-600');
        return;
      }

      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(mobile)) {
        enrollMessage.textContent = 'Please enter a valid 10-digit mobile number.';
        enrollMessage.classList.remove('text-green-600');
        enrollMessage.classList.add('text-red-600');
        return;
      }

      // Prepare data for submission
      const formData = {
        formType: 'enroll',
        name: name,
        age: age,
        mobile: mobile,
        email: email,
        drivingType: drivingType
      };

      try {
        const response = await fetch('https://0prfotkvx7.execute-api.us-east-1.amazonaws.com/deploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: JSON.stringify(formData)
          }),
        });

        const data = await response.json();
        if (response.ok) {
          enrollMessage.textContent = data.message || `Thank you, ${name}! Your enrollment as a ${drivingType} learner has been submitted.`;
          enrollMessage.classList.remove('text-red-600');
          enrollMessage.classList.add('text-green-600');
          enrollForm.reset();
        } else {
          enrollMessage.textContent = data.error || 'An error occurred. Please try again.';
          enrollMessage.classList.remove('text-green-600');
          enrollMessage.classList.add('text-red-600');
        }
      } catch (error) {
        enrollMessage.textContent = 'An error occurred. Please try again.';
        enrollMessage.classList.remove('text-green-600');
        enrollMessage.classList.add('text-red-600');
      }
    });
  }
});