const calculate = () => {
    // Getting input values and converting to numbers
    const inputs = [
        { id: 'telugu', name: 'Telugu' },
        { id: 'hindi', name: 'Hindi' },
        { id: 'english', name: 'English' },
        { id: 'mathematics', name: 'Mathematics' },
        { id: 'science', name: 'Science' },
        { id: 'social', name: 'Social' }
    ];
    let totalGrades = 0;
    let marksList = "<table><tr><th>Subject</th><th>Marks</th><th>Pass/Fail</th></tr>";
    let failedSubjects = [];

    for (let { id, name } of inputs) {
        let value = parseFloat(document.querySelector(`#${id}`).value);
        if (isNaN(value) || value < 0 || value > 100) {
            document.querySelector("#showdata").innerHTML = "Please enter valid numbers between 0 and 100 in all fields.";
            return;
        }
        totalGrades += value;
        const resultClass = value < 35 ? 'fail' : ''; // Adjusted failing grade to below 35
        marksList += `<tr class="${resultClass}"><td>${name}</td><td>${value}</td><td>${value < 35 ? 'Fail' : 'Pass'}</td></tr>`;
        if (value < 35) {
            failedSubjects.push(name); // Add to failedSubjects if score is less than 35
        }
    }

    // Close the table
    marksList += "</table>";

    // Calculate percentage
    const percentage = (totalGrades / 600) * 100;

    // Determine grade based on percentage
    let grade = '';
    if (percentage > 90) grade = "A1";
    else if (percentage > 80) grade = "A2";
    else if (percentage > 70) grade = "B1";
    else if (percentage > 60) grade = "B2";
    else if (percentage > 50) grade = "C1";
    else if (percentage > 40) grade = "C2";
    else if (percentage >= 35) grade = 'D';
    else grade = 'E';

    // Display the result
    const resultText = `Marks List:<br>${marksList}<br>
                        Out of 600, your total is ${totalGrades} and your percentage is ${percentage.toFixed(2)}%.<br>
                        Your grade is ${grade}. ${failedSubjects.length > 0 ? `You are Fail due to scoring less than 35 in the following subject(s): ${failedSubjects.join(', ')}.` : "You are Pass."}`;
    document.querySelector("#showdata").innerHTML = resultText;
    localStorage.setItem('gradeResults', resultText);
};

const resetForm = () => {
    document.getElementById("gradeForm").reset();
    document.querySelector("#showdata").innerHTML = "";
    localStorage.removeItem('gradeResults');
};

const validateInput = (input) => {
    let value = parseFloat(input.value);
    if (isNaN(value) || value < 0 || value > 100) {
        input.style.borderColor = 'red'; // Highlight invalid input
    } else {
        input.style.borderColor = '#ccc'; // Reset border color
    }
};

const saveResults = () => {
    const results = document.querySelector("#showdata").innerHTML;
    if (results) {
        // Create a blob of the result data
        const blob = new Blob([results], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grade_results.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        alert('No results to save.');
    }
};

const printResults = () => {
    const results = document.querySelector("#showdata").innerHTML;
    if (results) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Results</title></head><body>');
        printWindow.document.write(results);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        alert('No results to print.');
    }
};

// Load saved results from local storage on page load
window.onload = () => {
    const savedResults = localStorage.getItem('gradeResults');
    if (savedResults) {
        document.querySelector("#showdata").innerHTML = savedResults;
    }
};
