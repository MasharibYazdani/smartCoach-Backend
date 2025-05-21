# Admin

POST /api/admin/register - Register new admin
POST /api/admin/login - Admin login
GET /api/admin/logout - Get admin profile
PATCH /api/admin/updatePassoword - Update password

# Students

POST /api/students/new - Create a new student
GET /api/students/getAllStudents - Get all students
GET /api/students/getOneStudent/:id - Get student details
PATCH /api/students/update/:id - Update student info
DELETE /api/students/delete/:id - Delete a student

# Courses

POST /api/courses/new - Create a new course
GET /api/courses/getAllCourses - Get all courses
GET /api/courses/getOneCourse/:id - Get course details
PATCH /api/courses/update/:id - Update course info
DELETE /api/courses/delete/:id - Delete a course

# Enrollments

POST /api/enrollments - Enroll a student in a course
GET /api/enrollments/student/:studentId - Get all courses student enrolled in
GET /api/enrollments/course/:courseId - Get all students enrolled in course
PATCH /api/enrollments/statusUpdate/:id - Update enrollment status
DELETE /api/enrollments/:id - Remove enrollment

# Fees

POST /api/fees/pay - Record a payment
GET /api/fees/student/:studentId - Get student's payment history
GET /api/fees/enrollment/:enrollmentId - Get payments for enrollment
PATCH /api/fees/update/:id - Update payment record
DELETE /api/fees/delete/:id - Delete payment record
