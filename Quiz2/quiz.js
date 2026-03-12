function gradeQuiz() {
    let score = 0;

    // Clear previous highlights
    document.querySelectorAll("label").forEach(label => {
        label.style.color = "";
        label.style.fontWeight = "";
    });

    // Helper to mark answers
    function markCorrect(id) {
        const label = document.querySelector(`label[for="${id}"]`);
        label.style.color = "green";
        label.style.fontWeight = "bold";
    }

    function markWrong(id) {
        const label = document.querySelector(`label[for="${id}"]`);
        label.style.color = "red";
        label.style.fontWeight = "bold";
    }

    // Question 1
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1) {
        if (q1.value === "b") {
            score++;
            markCorrect(q1.id);
        } else {
            markWrong(q1.id);
            markCorrect("q1b");
        }
    }

    // Question 2
    const q2 = document.querySelector('input[name="q2"]:checked');
    if (q2) {
        if (q2.value === "b") {
            score++;
            markCorrect(q2.id);
        } else {
            markWrong(q2.id);
            markCorrect("q2b");
        }
    }

    // Question 3 (multi-select)
    const q3 = Array.from(document.querySelectorAll('input[name="q3"]:checked')).map(el => el.value);
    const correctQ3 = ["heal", "fly"];

    if (q3.includes("heal")) markCorrect("q3a"); else markWrong("q3a");
    if (q3.includes("fly")) markCorrect("q3b"); else markWrong("q3b");
    if (q3.includes("teleport")) markWrong("q3c");

    if (q3.includes("heal") && q3.includes("fly") && !q3.includes("teleport")) {
        score++;
    }

    // Question 4 (multi-select)
    const q4 = Array.from(document.querySelectorAll('input[name="q4"]:checked')).map(el => el.value);
    const correctQ4 = ["forest", "castle"];

    if (q4.includes("forest")) markCorrect("q4a"); else markWrong("q4a");
    if (q4.includes("castle")) markCorrect("q4b"); else markWrong("q4b");
    if (q4.includes("city")) markWrong("q4c");

    if (q4.includes("forest") && q4.includes("castle") && !q4.includes("city")) {
        score++;
    }

    // Display result
    const resultBox = document.getElementById("result");
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h2>RESULT</h2>
        <p>You scored ${score} / 4</p>
    `;
}


