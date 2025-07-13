function submitAnswer(questionName, correctValue, feedbackId) {
  const selected = document.querySelector(`input[name="${questionName}"]:checked`);
  const feedback = document.getElementById(feedbackId);

  if (!selected) {
    feedback.textContent = "⚠️ Please select an answer first.";
    feedback.className = "feedback wrong";
    return;
  }

  // Lock all options
  const options = document.querySelectorAll(`input[name="${questionName}"]`);
  options.forEach(opt => opt.disabled = true);

  // Disable the submit button
  const button = feedback.previousElementSibling;
  button.disabled = true;

  if (selected.value === correctValue) {
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = `❌ Wrong. The correct answer is ${correctValue}.`;
    feedback.className = "feedback wrong";
  }
}
