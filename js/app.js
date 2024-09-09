function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.getElementById('runButton').addEventListener('click', function () {
    const students = document.getElementById('students').value.split(',').map(s => s.trim());
    const groups = document.getElementById('groups').value.split(',').map(g => g.trim());

    if (students.length === 0 || groups.length === 0) {
        alert('Please enter both students and groups.');
        return;
    }

    shuffleArray(students); // Shuffle the student list for random distribution

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    let groupData = {};

    // Initialize empty arrays for each group
    groups.forEach(group => {
        groupData[group] = [];
    });

    // Distribute students into groups evenly
    students.forEach((student, index) => {
        const groupIndex = index % groups.length;
        groupData[groups[groupIndex]].push(student);
    });

    // Display the result
    for (let group in groupData) {
        const groupElement = document.createElement('div');
        groupElement.className = 'group';
        const groupName = document.createElement('p');
        groupName.className = 'group-name';
        groupName.textContent = group;
        const studentList = document.createElement('ul');
        studentList.className = 'student-list';
        groupData[group].forEach(student => {
            const studentItem = document.createElement('li');
            studentItem.textContent = student;
            studentList.appendChild(studentItem);
        });

        groupElement.appendChild(groupName);
        groupElement.appendChild(studentList);
        resultDiv.appendChild(groupElement);
    }
});