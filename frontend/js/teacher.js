
// teacher.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

    // Handle add course form submission
    document.getElementById('addCourseForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const courseTitle = document.getElementById('courseTitle').value.trim();
        const courseCode = document.getElementById('courseCode').value.trim();
        const semester = document.getElementById('semester').value;
        const credits = document.getElementById('credits').value;
        const status = document.getElementById('status').value;

        if (!courseTitle || !courseCode || !semester || !credits || !status) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch('/api/teacher/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ courseTitle, courseCode, semester, credits, status })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Course added successfully.');
                loadCourses();
                document.getElementById('addCourseForm').reset();
            } else {
                alert(data.message || 'Failed to add course.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Load teacher's courses
    async function loadCourses() {
        try {
            const response = await fetch('/api/teacher/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                const coursesList = document.getElementById('coursesList');
                coursesList.innerHTML = '';
                data.courses.forEach(course => {
                    const li = document.createElement('li');
                    li.textContent = `${course.courseCode} - ${course.courseTitle} (${course.semester})`;
                    const actions = document.createElement('div');
                    actions.classList.add('action-buttons');
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.addEventListener('click', () => deleteCourse(course._id));

                    actions.appendChild(deleteBtn);
                    li.appendChild(actions);
                    coursesList.appendChild(li);
                });
                loadPendingEnrollments();  // Load pending enrollments whenever courses are loaded
            } else {
                alert(data.message || 'Failed to load courses.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    loadCourses();

    // Load pending enrollments for teacher's courses
    async function loadPendingEnrollments() {
        try {
            const response = await fetch('/api/teacher/enrollments/pending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                const enrollmentsList = document.getElementById('pendingEnrollments');
                enrollmentsList.innerHTML = '';
                data.enrollments.forEach(enrollment => {
                    const li = document.createElement('li');
                    li.textContent = `${enrollment.student.name} applied for ${enrollment.course.courseTitle} (${enrollment.course.courseCode}) - Semester ${enrollment.semester}`;
                    
                    const acceptBtn = document.createElement('button');
                    acceptBtn.textContent = 'Accept';
                    acceptBtn.addEventListener('click', () => updateEnrollmentStatus(enrollment._id, 'accepted'));

                    const declineBtn = document.createElement('button');
                    declineBtn.textContent = 'Decline';
                    declineBtn.addEventListener('click', () => deleteEnrollment(enrollment._id));

                    li.appendChild(acceptBtn);
                    li.appendChild(declineBtn);
                    enrollmentsList.appendChild(li);
                });
            } else {
                alert(data.message || 'Failed to load pending enrollments.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Update enrollment status to accepted
    async function updateEnrollmentStatus(enrollmentId, status) {
        try {
            const response = await fetch(`/api/teacher/enrollments/${enrollmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Enrollment accepted successfully.');
                loadPendingEnrollments();  // Refresh pending enrollments
            } else {
                alert(data.message || 'Failed to update enrollment.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Delete (decline) enrollment
    async function deleteEnrollment(enrollmentId) {
        if (confirm('Are you sure you want to decline this enrollment?')) {
            try {
                const response = await fetch(`/api/teacher/enrollments/${enrollmentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Enrollment declined.');
                    loadPendingEnrollments();  // Refresh pending enrollments
                } else {
                    alert(data.message || 'Failed to decline enrollment.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    // Delete course
    async function deleteCourse(courseId) {
        if (confirm('Are you sure you want to delete this course?')) {
            try {
                const response = await fetch(`/api/teacher/courses/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Course deleted successfully.');
                    loadCourses();  // Refresh courses after deletion
                } else {
                    alert(data.message || 'Failed to delete course.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
});
