import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Course = 'Starter' | 'Main Course' | 'Dessert';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: string;
};

export default function Index() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState('');

  const addMenuItem = () => {
    setError('');

    if (!dishName.trim()) {
      setError('Please enter the dish name.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }

    if (!course) {
      setError('Please select a course.');
      return;
    }

    if (!price.trim()) {
      setError('Please enter the price.');
      return;
    }

    const priceNumber = Number(price);

    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    const newMenuItem: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course: course,
      price: priceNumber.toFixed(2),
    };

    setMenuItems((currentItems) => [
      ...currentItems,
      newMenuItem,
    ]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');

    Alert.alert(
      'Menu Item Added',
      `${newMenuItem.dishName} has been successfully added to the menu.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Chef's Menu Manager
            </Text>

            <Text style={styles.subtitle}>
              Manage your restaurant menu
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.formCard}>

            <Text style={styles.sectionTitle}>
              Add Menu Item
            </Text>

            {/* DISH NAME */}
            <Text style={styles.label}>
              Dish Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              placeholderTextColor="#999"
              value={dishName}
              onChangeText={setDishName}
            />

            {/* DESCRIPTION */}
            <Text style={styles.label}>
              Description
            </Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Enter dish description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* COURSE */}
            <Text style={styles.label}>
              Course
            </Text>

            <View style={styles.courseContainer}>

              <Pressable
                style={[
                  styles.courseButton,
                  course === 'Starter' &&
                    styles.selectedCourse,
                ]}
                onPress={() => setCourse('Starter')}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    course === 'Starter' &&
                      styles.selectedCourseText,
                  ]}
                >
                  Starter
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.courseButton,
                  course === 'Main Course' &&
                    styles.selectedCourse,
                ]}
                onPress={() =>
                  setCourse('Main Course')
                }
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    course === 'Main Course' &&
                      styles.selectedCourseText,
                  ]}
                >
                  Main Course
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.courseButton,
                  course === 'Dessert' &&
                    styles.selectedCourse,
                ]}
                onPress={() => setCourse('Dessert')}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    course === 'Dessert' &&
                      styles.selectedCourseText,
                  ]}
                >
                  Dessert
                </Text>
              </Pressable>

            </View>

            {/* PRICE */}
            <Text style={styles.label}>
              Price (R)
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter price"
              placeholderTextColor="#999"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />

            {/* ERROR */}
            {error !== '' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )}

            {/* ADD BUTTON */}
            <Pressable
              style={styles.addButton}
              onPress={addMenuItem}
            >
              <Text style={styles.addButtonText}>
                + Add Menu Item
              </Text>
            </Pressable>

          </View>

          {/* CURRENT MENU */}
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>
              Current Menu
            </Text>

            <Text style={styles.itemCount}>
              {menuItems.length}{' '}
              {menuItems.length === 1
                ? 'item'
                : 'items'}
            </Text>
          </View>

          {/* EMPTY MESSAGE */}
          {menuItems.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>
                No menu items yet
              </Text>

              <Text style={styles.emptyText}>
                Add your first menu item using the form above.
              </Text>
            </View>
          )}

          {/* MENU ITEMS */}
          {menuItems.map((item) => (
            <View
              key={item.id}
              style={styles.menuCard}
            >
              <View style={styles.menuTopRow}>

                <Text style={styles.dishName}>
                  {item.dishName}
                </Text>

                <Text style={styles.price}>
                  R{item.price}
                </Text>

              </View>

              <Text style={styles.course}>
                {item.course}
              </Text>

              <Text style={styles.menuDescription}>
                {item.description}
              </Text>
            </View>
          ))}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F6B4F',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,

    elevation: 3,

    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#222222',
  },

  descriptionInput: {
    minHeight: 95,
  },

  courseContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  courseButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2F6B4F',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },

  selectedCourse: {
    backgroundColor: '#2F6B4F',
  },

  courseButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2F6B4F',
  },

  selectedCourseText: {
    color: '#FFFFFF',
  },

  errorBox: {
    backgroundColor: '#FDECEC',
    borderWidth: 1,
    borderColor: '#E57373',
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
  },

  errorText: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '600',
  },

  addButton: {
    backgroundColor: '#2F6B4F',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  itemCount: {
    fontSize: 14,
    color: '#666666',
  },

  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,

    elevation: 2,

    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  menuTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  dishName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 10,
  },

  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2F6B4F',
  },

  course: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C58B20',
    marginTop: 5,
    marginBottom: 7,
  },

  menuDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555555',
  },
});