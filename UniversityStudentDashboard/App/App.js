import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  StatusBar,
  Switch,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const App = () => {
  const [student, setStudent] = useState({
    name: "Jane Doe",
    id: "12345",
    department: "Computer Science",
  });
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [isCourseDetailsModalVisible, setIsCourseDetailsModalVisible] =
    useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ name: "", code: "" });
  const [studentForm, setStudentForm] = useState(student);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    const initialCourses = Array.from({ length: 5 }, (_, index) => ({
      id: `${index + 1}`,
      name: `Course ${index + 1}`,
      code: `C${index + 1}`,
    }));
    setCourses(initialCourses);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      `${course.name} ${course.code}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  const handleAddOrUpdateCourse = useCallback(() => {
    if (!courseForm.name || !courseForm.code) {
      Alert.alert("Error", "Please fill out all fields for the course.");
      return;
    }

    setCourses((prevCourses) => {
      if (editingCourseId) {
        return prevCourses.map((course) =>
          course.id === editingCourseId ? { ...course, ...courseForm } : course
        );
      }
      return [...prevCourses, { id: `${Date.now()}`, ...courseForm }];
    });

    resetCourseForm();
  }, [courseForm, editingCourseId]);

  const handleDeleteCourse = useCallback((id) => {
    Alert.alert(
      "Delete Course",
      "Are you sure you want to delete this course?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setCourses((prevCourses) =>
              prevCourses.filter((course) => course.id !== id)
            ),
        },
      ]
    );
  }, []);

  const handleEditCourse = useCallback((course) => {
    setEditingCourseId(course.id);
    setCourseForm(course);
    setIsCourseModalVisible(true);
  }, []);

  const handleShowCourseDetails = useCallback((course) => {
    setSelectedCourse(course);
    setIsCourseDetailsModalVisible(true);
  }, []);

  const handleAddOrUpdateStudent = useCallback(() => {
    if (!studentForm.name || !studentForm.id || !studentForm.department) {
      Alert.alert("Error", "Please fill out all fields for the student.");
      return;
    }

    setStudent(studentForm);
    setIsStudentModalVisible(false);
  }, [studentForm]);

  const resetCourseForm = useCallback(() => {
    setCourseForm({ name: "", code: "" });
    setEditingCourseId(null);
    setIsCourseModalVisible(false);
  }, []);

  const CourseCard = ({ course }) => (
    <TouchableOpacity
      onPress={() => handleShowCourseDetails(course)}
      style={[styles.courseCard, darkMode && styles.darkCard]}
    >
      <View style={styles.courseDetails}>
        <Text style={[styles.courseTitle, darkMode && styles.darkText]}>
          {course.name}
        </Text>
        <Text style={[styles.courseCode, darkMode && styles.darkText]}>
          {course.code}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editActionButton]}
          onPress={() => handleEditCourse(course)}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteActionButton]}
          onPress={() => handleDeleteCourse(course.id)}
        >
          <MaterialIcons name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <Text style={[styles.title, darkMode && styles.darkText]}>
          University Dashboard
        </Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <View style={[styles.studentCard, darkMode && styles.darkCard]}>
        <Text style={[styles.cardTitle, darkMode && styles.darkText]}>
          {student.name}
        </Text>
        <Text style={[styles.cardSubtitle, darkMode && styles.darkText]}>
          ID: {student.id}
        </Text>
        <Text style={[styles.cardSubtitle, darkMode && styles.darkText]}>
          Department: {student.department}
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setStudentForm(student);
            setIsStudentModalVisible(true);
          }}
        >
          <Text style={styles.editButtonText}>Edit Student</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color={darkMode ? "#aaa" : "#333"}
        />
        <TextInput
          style={[styles.searchInput, darkMode && styles.darkInput]}
          placeholder="Search courses..."
          placeholderTextColor={darkMode ? "#aaa" : "#555"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsCourseModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Course</Text>
      </TouchableOpacity>

      {/* Course Details Modal */}
      <Modal
        visible={isCourseDetailsModalVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Course Details</Text>
            {selectedCourse && (
              <>
                <Text style={styles.detailText}>
                  Name: {selectedCourse.name}
                </Text>
                <Text style={styles.detailText}>
                  Code: {selectedCourse.code}
                </Text>
              </>
            )}
            <Button
              title="Close"
              onPress={() => setIsCourseDetailsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Course Modal */}
      <Modal visible={isCourseModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCourseId ? "Edit Course" : "Add New Course"}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Course Name"
              value={courseForm.name}
              onChangeText={(text) =>
                setCourseForm((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Course Code"
              value={courseForm.code}
              onChangeText={(text) =>
                setCourseForm((prev) => ({ ...prev, code: text }))
              }
            />
            <Button
              title={editingCourseId ? "Update Course" : "Add Course"}
              onPress={handleAddOrUpdateCourse}
            />
            <Button title="Cancel" onPress={resetCourseForm} />
          </View>
        </View>
      </Modal>

      {/* Student Modal */}
      <Modal visible={isStudentModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Student</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Name"
              value={studentForm.name}
              onChangeText={(text) =>
                setStudentForm((prev) => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="ID"
              value={studentForm.id}
              onChangeText={(text) =>
                setStudentForm((prev) => ({ ...prev, id: text }))
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Department"
              value={studentForm.department}
              onChangeText={(text) =>
                setStudentForm((prev) => ({ ...prev, department: text }))
              }
            />
            <Button title="Save" onPress={handleAddOrUpdateStudent} />
            <Button
              title="Cancel"
              onPress={() => setIsStudentModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  darkContainer: { backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  darkText: { color: "#fff" },
  studentCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  darkCard: { backgroundColor: "#1e1e1e" },
  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  cardSubtitle: { fontSize: 16, color: "#666" },
  editButton: {
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "#2196f3",
    padding: 8,
    borderRadius: 4,
  },
  editButtonText: { color: "#fff", fontWeight: "bold" },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  darkInput: { backgroundColor: "#333", color: "#fff" },
  courseCard: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseDetails: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: "bold" },
  courseCode: { fontSize: 14, color: "#666" },
  actionButtons: { flexDirection: "row", marginLeft: 8 },
  actionButton: { padding: 8, marginLeft: 8, borderRadius: 4 },
  editActionButton: { backgroundColor: "#4caf50" },
  deleteActionButton: { backgroundColor: "#f44336" },
  addButton: {
    padding: 16,
    backgroundColor: "#2196f3",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  modalInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: "#ccc",
  },
  detailText: { fontSize: 16, marginBottom: 8 },
});

export default App;
