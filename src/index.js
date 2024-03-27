document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggleDescriptions').addEventListener('change', toggleDescriptions);
  
    // Initially add 5 rows
    for (let i = 0; i < 5; i++) {
      addRow();
    }
  });
  
  function addRow() {
    var container = document.getElementById('courseInputs');
    var newRow = document.createElement('div');
    newRow.className = 'courseRow';
    newRow.innerHTML = `
      <input type="number" name="credits[]" placeholder="Weight/Credits" min="0">
      <input type="text" name="grades[]" placeholder="Grade">
      <input type="text" name="descriptions[]" class="description" placeholder="Description" style="display: none;">
      <button type="button" class="deleteRowBtn" onclick="deleteRow(this)" style="background-color: #ff5b5b;">Delete</button>
    `;
    container.appendChild(newRow);
  }
  
  function deleteRow(button) {
    button.closest('.courseRow').remove();
  }
  
  function resetForm() {
    document.getElementById('gpaCalculator').reset();
    var descriptions = document.querySelectorAll('.description');
    descriptions.forEach(function (description) {
      description.style.display = 'none';
    });
    document.getElementById('toggleDescriptions').checked = false;
  }
  
  function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    const credits = document.getElementsByName('credits[]');
    const grades = document.getElementsByName('grades[]');
  
    for (let i = 0; i < credits.length; i++) {
      const grade = grades[i].value.toUpperCase().trim();
      const credit = parseFloat(credits[i].value);
      const gradePoint = getGradePoint(grade);
      if (gradePoint !== null && !isNaN(credit)) {
        totalPoints += gradePoint * credit;
        totalCredits += credit;
      } else {
        alert('Please enter valid grades and credits.');
        return;
      }
    }
  
    const gpa = totalPoints / totalCredits;
    alert(`Your GPA is: ${gpa.toFixed(2)}`);
  }
  
  
  function getGradePoint(grade) {
    if (grade >= 90) return 4.3;
    if (grade >= 85) return 4.0;
    if (grade >= 80) return 3.7;
    if (grade >= 77) return 3.3;
    if (grade >= 73) return 3.0;
    if (grade >= 70) return 2.7;
    if (grade >= 67) return 2.3;
    if (grade >= 63) return 2.0;
    if (grade >= 60) return 1.7;
    if (grade >= 50) return 1.0;
    if (grade >= 1) return 0.0;
    if (grade === 'X') return 0.0;
    return null; // Invalid grade
  }

  function getGradePoint(grade) {
    switch (grade) {
      case 'A+':
        return 4.3;
      case 'A':
        return 4.0;
      case 'A-':
        return 3.7;
      case 'B+':
        return 3.3;
      case 'B':
        return 3.0;
      case 'B-':
        return 2.7;
      case 'C+':
        return 2.3;
      case 'C':
        return 2.0;
      case 'C-':
        return 1.7;
      case 'D':
        return 1.0;
      case 'E':
        return 0;
      case 'X':
        return 0;
      default:
        return null; // Invalid grade
    }
  }  
  
  function toggleDescriptions() {
    var descriptions = document.querySelectorAll('.description');
    descriptions.forEach(function (description) {
      description.style.display = this.checked ? 'block' : 'none';
    }.bind(this));
  }
  