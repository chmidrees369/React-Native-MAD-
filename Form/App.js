import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [religion, setReligion] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [qualification, setQualification] = useState("");
  const [program, setProgram] = useState("");
  const [campus, setCampus] = useState("");
  const [shift, setShift] = useState("");

  const validateForm = () => {
    if (
      !name ||
      !fatherName ||
      !dateOfBirth ||
      !placeOfBirth ||
      !nationality ||
      !city ||
      !nationalId ||
      !religion ||
      !phone ||
      !email ||
      !address ||
      !gender ||
      !status ||
      !qualification ||
      !program ||
      !campus ||
      !shift
    ) {
      Alert.alert("Error", "Please fill out all fields before submitting.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert("Success", "Form submitted successfully!", [
        {
          text: "OK",
          onPress: () =>
            console.log("Form Data:", {
              name,
              fatherName,
              dateOfBirth,
              placeOfBirth,
              nationality,
              city,
              nationalId,
              religion,
              phone,
              email,
              address,
              gender,
              status,
              qualification,
              program,
              campus,
              shift,
            }),
        },
      ]);
    }
  };

  const pickerPlaceholderStyle = { color: "#999" };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./assets/logo.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Admission Form</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Father Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Father Name"
          value={fatherName}
          onChangeText={setFatherName}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />

        <Text style={styles.label}>Place of Birth</Text>
        <Picker
          selectedValue={placeOfBirth}
          style={styles.input}
          onValueChange={(itemValue) => setPlaceOfBirth(itemValue)}
        >
          <Picker.Item
            label="Select City"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Islamabad" value="Islamabad" />
          <Picker.Item label="Lahore" value="Lahore" />
          <Picker.Item label="Karachi" value="Karachi" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nationality</Text>
        <Picker
          selectedValue={nationality}
          style={styles.input}
          onValueChange={(itemValue) => setNationality(itemValue)}
        >
          <Picker.Item
            label="Select Country"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Pakistan" value="Pakistan" />
          <Picker.Item label="India" value="India" />
        </Picker>

        <Text style={styles.label}>City</Text>
        <Picker
          selectedValue={city}
          style={styles.input}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          <Picker.Item
            label="Select City"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Islamabad" value="Islamabad" />
          <Picker.Item label="Lahore" value="Lahore" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>National ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your National ID"
          value={nationalId}
          onChangeText={setNationalId}
        />

        <Text style={styles.label}>Religion</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Religion"
          value={religion}
          onChangeText={setReligion}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item
            label="Select Gender"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        <Text style={styles.label}>Marital Status</Text>
        <Picker
          selectedValue={status}
          style={styles.input}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item
            label="Select Status"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="Married" value="Married" />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Qualification</Text>
        <Picker
          selectedValue={qualification}
          style={styles.input}
          onValueChange={(itemValue) => setQualification(itemValue)}
        >
          <Picker.Item
            label="Select Qualification"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Undergraduate" value="Undergraduate" />
          <Picker.Item label="Graduate" value="Graduate" />
          <Picker.Item label="Postgraduate" value="Postgraduate" />
        </Picker>

        <Text style={styles.label}>Program</Text>
        <Picker
          selectedValue={program}
          style={styles.input}
          onValueChange={(itemValue) => setProgram(itemValue)}
        >
          <Picker.Item
            label="Select Program"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="BS(CS)" value="BS(CS)" />
          <Picker.Item label="BS(SE)" value="BS(SE)" />
        </Picker>

        <Text style={styles.label}>Campus</Text>
        <Picker
          selectedValue={campus}
          style={styles.input}
          onValueChange={(itemValue) => setCampus(itemValue)}
        >
          <Picker.Item
            label="Select Campus"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Main Campus" value="Main" />
          <Picker.Item label="North Campus" value="North" />
        </Picker>

        <Text style={styles.label}>Shift</Text>
        <Picker
          selectedValue={shift}
          style={styles.input}
          onValueChange={(itemValue) => setShift(itemValue)}
        >
          <Picker.Item
            label="Select Shift"
            value=""
            color={pickerPlaceholderStyle.color}
          />
          <Picker.Item label="Morning" value="Morning" />
          <Picker.Item label="Evening" value="Evening" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#11308f",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#11308f",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
