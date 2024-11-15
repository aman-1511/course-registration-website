
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    document.getElementById('welcomeMessage').textContent = `Welcome, ${payload.name}`;

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    const roleSelect = document.getElementById('role');
    const studentFields = document.getElementById('studentFields');
    const teacherFields = document.getElementById('teacherFields');

    roleSelect.addEventListener('change', () => {
        const role = roleSelect.value;
        studentFields.style.display = role === 'student' ? 'block' : 'none';
        teacherFields.style.display = role === 'teacher' ? 'block' : 'none';
    });

    document.getElementById('createUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        if (!name || !username || !password || !role) {
            alert('Please fill in all required fields.');
            return;
        }

        const userData = { name, username, password, role };
        if (role === 'student') {
            userData.semester = document.getElementById('semester').value;
            userData.startYear = document.getElementById('startYear').value;
            userData.endYear = document.getElementById('endYear').value;
        } else if (role === 'teacher') {
            userData.department = document.getElementById('department').value.trim();
        }

        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                document.getElementById('userCreationMessage').textContent = 'User created successfully.';
                document.getElementById('createUserForm').reset();
                studentFields.style.display = 'none';
                teacherFields.style.display = 'none';
            } else {
                alert(data.message || 'Failed to create user.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    document.getElementById('viewStudentCourses').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/admin/courses/students', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                displayStudentSelectedCourses(data.courses);
            } else {
                alert(data.message || 'Failed to fetch student courses.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    document.getElementById('viewTeacherCourses').addEventListener('click', async () => {
        try {
            const response = await fetch('/api/admin/courses/teachers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                displayTeacherOfferedCourses(data.courses);
            } else {
                alert(data.message || 'Failed to fetch teacher courses.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function displayStudentSelectedCourses(courses) {
        const coursesList = document.getElementById('coursesList');
        coursesList.innerHTML = '';
        courses.forEach(enrollment => {
            if (enrollment.course) {
                const li = document.createElement('li');
                const studentName = enrollment.student ? enrollment.student.name : 'Unknown Student';
                const studentUsername = enrollment.student ? enrollment.student.username : 'Unknown Username';
                const courseTitle = enrollment.course ? enrollment.course.courseTitle : 'Unknown Course';
                const courseCode = enrollment.course ? enrollment.course.courseCode : 'Unknown Code';
                const semester = enrollment.course ? enrollment.course.semester : 'Unknown Semester';

                li.textContent = `${studentName} (${studentUsername}) selected ${courseTitle} (${courseCode}) - Semester ${semester}`;
                coursesList.appendChild(li);
            }
        });
    }

    function displayTeacherOfferedCourses(courses) {
        const coursesList = document.getElementById('coursesList');
        coursesList.innerHTML = '';
        courses.forEach(course => {
            const li = document.createElement('li');
            const teacherName = course.teacher ? course.teacher.name : 'Unknown Teacher';
            const department = course.teacher ? course.teacher.department : 'Unknown Department';
            const courseTitle = course.courseTitle || 'Unknown Course';
            const courseCode = course.courseCode || 'Unknown Code';
            const semester = course.semester || 'Unknown Semester';

            li.textContent = `${teacherName} (${department}) offers ${courseTitle} (${courseCode}) - Semester ${semester}`;
            coursesList.appendChild(li);
        });
    }
});
