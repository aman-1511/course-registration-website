document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    
    
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

  
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

   
    const semesterSelect = document.getElementById('semester');
    const courseSelect = document.getElementById('course');

    semesterSelect.addEventListener('change', async () => {
        const semester = semesterSelect.value;
        if (semester) {
            try {
                const response = await fetch(`/api/student/courses?semester=${semester}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    courseSelect.innerHTML = '<option value="">Select Course</option>';
                    data.courses.forEach(course => {
                        const option = document.createElement('option');
                        option.value = course._id;
                        option.textContent = `${course.courseCode} - ${course.courseTitle}`;
                        courseSelect.appendChild(option);
                    });
                } else {
                    alert(data.message || 'Failed to fetch courses.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            courseSelect.innerHTML = '<option value="">Select Course</option>';
        }
    });

    
    document.getElementById('enrollmentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const semester = semesterSelect.value;
        const courseId = courseSelect.value;
        const description = document.getElementById('description').value.trim();
        const status = document.getElementById('status').value;

        if (!semester || !courseId || !status) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch('/api/student/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ semester, courseId, description, status })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Enrollment submitted successfully.');
                loadEnrollments(); 
            } else {
                alert(data.message || 'Failed to submit enrollment.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

   
    async function loadEnrollments() {
        try {
            const response = await fetch('/api/student/enrollments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                const pendingList = document.getElementById('pendingCourses');
                const acceptedList = document.getElementById('acceptedCourses');
                pendingList.innerHTML = '';
                acceptedList.innerHTML = '';

                data.enrollments.forEach(enrollment => {
                    const li = document.createElement('li');
                    li.textContent = `${enrollment.course.courseCode} - ${enrollment.course.courseTitle}`;
                    if (enrollment.status === 'pending') {
                        li.classList.add('status-pending');
                        const actions = document.createElement('div');
                        actions.classList.add('action-buttons');

                        const editBtn = document.createElement('button');
                        editBtn.textContent = 'Edit';
                        editBtn.addEventListener('click', () => editEnrollment(enrollment._id));

                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = 'Delete';
                        deleteBtn.addEventListener('click', () => deleteEnrollment(enrollment._id));

                        actions.appendChild(editBtn);
                        actions.appendChild(deleteBtn);
                        li.appendChild(actions);
                        pendingList.appendChild(li);
                    } else if (enrollment.status === 'accepted') {
                        li.classList.add('status-accepted');
                        acceptedList.appendChild(li);
                    }
                });
            } else {
                alert(data.message || 'Failed to load enrollments.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    loadEnrollments();  

    async function editEnrollment(enrollmentId) {
        const newStatus = prompt('Enter new status (enrolled/not_enrolled):');
        if (newStatus === 'enrolled' || newStatus === 'not_enrolled') {
            try {
                const response = await fetch(`/api/student/enroll/${enrollmentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ status: newStatus })
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Enrollment updated successfully.');
                    loadEnrollments();  
                } else {
                    alert(data.message || 'Failed to update enrollment.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Invalid status.');
        }
    }

   
    async function deleteEnrollment(enrollmentId) {
        if (confirm('Are you sure you want to delete this enrollment?')) {
            try {
                const response = await fetch(`/api/student/enroll/${enrollmentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    alert('Enrollment deleted successfully.');
                    loadEnrollments();  
                } else {
                    alert(data.message || 'Failed to delete enrollment.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
});