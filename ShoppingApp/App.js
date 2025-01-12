import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Home Screen
function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>ShopEase</Text>
        <Ionicons name="menu" size={24} color="white" />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/300x200",
          }}
          style={styles.heroImage}
        />
        <Text style={styles.heroText}>Welcome to ShopEase</Text>
        <Text style={styles.heroSubtext}>
          Discover exclusive deals and trending products!
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Shop Now</Text>
        </TouchableOpacity>
      </View>

      {/* Product Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/150",
            }}
            style={styles.productImage}
          />
          <Image
            source={{
              uri: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=600/150",
            }}
            style={styles.productImage}
          />
          <Image
            source={{
              uri: "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/150",
            }}
            style={styles.productImage}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

// Screen A
function ScreenA() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Categories</Text>
      <Text style={styles.description}>
        Browse our wide range of categories to find what you need.
      </Text>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600/300x200",
        }}
        style={styles.fullImage}
      />
      <Text style={styles.description}>
        Electronics: From smartphones to laptops.
      </Text>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/300x200",
        }}
        style={styles.fullImage}
      />
      <Text style={styles.description}>
        Fashion: Trending outfits for every occasion.
      </Text>
    </ScrollView>
  );
}

// Screen B
function ScreenB() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>My Cart</Text>
      <Text style={styles.description}>
        Review the items in your cart before checkout.
      </Text>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/9558788/pexels-photo-9558788.jpeg?auto=compress&cs=tinysrgb&w=600/300x200",
        }}
        style={styles.fullImage}
      />
      <Text style={styles.description}>Product 1: $29.99</Text>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/20509483/pexels-photo-20509483/free-photo-of-man-posing-in-black-jacket.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load/300x200",
        }}
        style={styles.fullImage}
      />
      <Text style={styles.description}>Product 2: $59.99</Text>
    </ScrollView>
  );
}

// Screen C
function ScreenC() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Profile</Text>
      <Text style={styles.description}>
        Manage your account details and preferences.
      </Text>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/5816283/pexels-photo-5816283.jpeg?auto=compress&cs=tinysrgb&w=600/300x200",
        }}
        style={styles.fullImage}
      />
      <Text style={styles.description}>
        Update personal information, view order history, and more.
      </Text>
    </ScrollView>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true, // Enable header on all screens
          headerStyle: {
            backgroundColor: "#FF6347",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Categories") iconName = "grid";
            else if (route.name === "Cart") iconName = "cart";
            else if (route.name === "Profile") iconName = "person";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#FF6347",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#eee",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={ScreenA} />
        <Tab.Screen name="Cart" component={ScreenB} />
        <Tab.Screen name="Profile" component={ScreenC} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FF6347",
  },
  logo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  heroSection: {
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  heroText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  heroSubtext: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  ctaButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  category: {
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  screen: {
    flex: 1,
    padding: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: "#555",
  },
  fullImage: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
});
