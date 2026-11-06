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
  const [editingId, setEditingId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Clear the form
  const resetForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setEditingId(null);
    setError('');
  };

  // Add or update a menu item
  const saveMenuItem = () => {
    setError('');

    if (!dishName.trim()) {
      setError('Please enter the dish name.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }

const duplicateDish = menuItems.some(
  (item) =>
    item.dishName.toLowerCase() === dishName.trim().toLowerCase() &&
    item.id !== editingId
);

if (duplicateDish) {
  setError('This dish already exists in the menu.');
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

    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    if (editingId) {
      setMenuItems((items) =>
        items.map((item) =>
          item.id === editingId
            ? {
                ...item,
                dishName: dishName.trim(),
                description: description.trim(),
                course: course as Course,
                price: priceNumber.toFixed(2),
              }
            : item
        )
      );

      if (Platform.OS === 'web') {
        window.alert('Menu item successfully updated.');
      } else {
        Alert.alert('Menu Updated', `${dishName.trim()} has been updated.`);
      }
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        dishName: dishName.trim(),
        description: description.trim(),
        course: course as Course,
        price: priceNumber.toFixed(2),
      };

      setMenuItems((items) => [...items, newItem]);

      if (Platform.OS === 'web') {
        window.alert(`${newItem.dishName} has been added to the menu.`);
      } else {
        Alert.alert(
          'Menu Item Added',
          `${newItem.dishName} has been successfully added.`
        );
      }
    }

    resetForm();
  };

  // Load an item into the form for editing
  const editMenuItem = (item: MenuItem) => {
    setDishName(item.dishName);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
    setEditingId(item.id);
    setError('');
  };

  // Delete a menu item
  const deleteMenuItem = (item: MenuItem) => {
    const removeItem = () => {
      setMenuItems((items) =>
        items.filter((menuItem) => menuItem.id !== item.id)
      );

      if (editingId === item.id) {
        resetForm();
      }

      if (Platform.OS === 'web') {
        window.alert(`${item.dishName} has been deleted.`);
      } else {
        Alert.alert('Item Deleted', `${item.dishName} has been removed.`);
      }
    };

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${item.dishName}?`
      );

      if (confirmed) {
        removeItem();
      }
    } else {
      Alert.alert(
        'Delete Menu Item',
        `Are you sure you want to delete ${item.dishName}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: removeItem,
          },
        ]
      );
    }
  };

  // Search and filter menu items
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.dishName
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesCourse =
      selectedFilter === 'All' || item.course === selectedFilter;

    return matchesSearch && matchesCourse;
  });

  // Menu statistics
  const totalItems = menuItems.length;

  const totalPrice = menuItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const averagePrice =
    totalItems > 0 ? totalPrice / totalItems : 0;

  const starterCount = menuItems.filter(
    (item) => item.course === 'Starter'
  ).length;

  const mainCourseCount = menuItems.filter(
    (item) => item.course === 'Main Course'
  ).length;

  const dessertCount = menuItems.filter(
    (item) => item.course === 'Dessert'
  ).length;

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
            <Text style={styles.title}>Chef's Menu Manager</Text>
            <Text style={styles.subtitle}>
              Manage your restaurant menu
            </Text>
          </View>

          {/* MENU STATISTICS */}
          <View style={styles.statisticsCard}>
            <Text style={styles.statisticsTitle}>Menu Statistics</Text>

            <View style={styles.statisticsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalItems}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  R{averagePrice.toFixed(2)}
                </Text>
                <Text style={styles.statLabel}>Average Price</Text>
              </View>
            </View>

            <Text style={styles.courseStatisticsTitle}>
              Items per Course
            </Text>

            <View style={styles.courseStatRow}>
              <Text style={styles.courseStatLabel}>Starter</Text>
              <Text style={styles.courseStatNumber}>{starterCount}</Text>
            </View>

            <View style={styles.courseStatRow}>
              <Text style={styles.courseStatLabel}>Main Course</Text>
              <Text style={styles.courseStatNumber}>{mainCourseCount}</Text>
            </View>

            <View style={styles.courseStatRow}>
              <Text style={styles.courseStatLabel}>Dessert</Text>
              <Text style={styles.courseStatNumber}>{dessertCount}</Text>
            </View>
          </View>

          {/* ADD OR EDIT FORM */}
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>
              {editingId ? 'Edit Menu Item' : 'Add Menu Item'}
            </Text>

            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dish name"
              placeholderTextColor="#999"
              value={dishName}
              onChangeText={setDishName}
            />

            <Text style={styles.label}>Description</Text>
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

            <Text style={styles.label}>Course</Text>
            <View style={styles.courseContainer}>
              {(['Starter', 'Main Course', 'Dessert'] as Course[]).map(
                (option) => (
                  <Pressable
                    key={option}
                    style={[
                      styles.courseButton,
                      course === option && styles.selectedCourse,
                    ]}
                    onPress={() => setCourse(option)}
                  >
                    <Text
                      style={[
                        styles.courseButtonText,
                        course === option && styles.selectedCourseText,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                )
              )}
            </View>

            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              placeholderTextColor="#999"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
            />

            {error !== '' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Pressable style={styles.addButton} onPress={saveMenuItem}>
              <Text style={styles.addButtonText}>
                {editingId ? 'Update Menu Item' : '+ Add Menu Item'}
              </Text>
            </Pressable>

            {editingId !== null && (
              <Pressable style={styles.cancelButton} onPress={resetForm}>
                <Text style={styles.cancelButtonText}>Cancel Editing</Text>
              </Pressable>
            )}
          </View>

          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <Text style={styles.filterTitle}>Search Menu</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by dish name..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* COURSE FILTERS */}
          <Text style={styles.filterTitle}>Filter by Course</Text>

          <View style={styles.filterContainer}>
            {['All', 'Starter', 'Main Course', 'Dessert'].map((option) => (
              <Pressable
                key={option}
                style={[
                  styles.filterButton,
                  selectedFilter === option && styles.selectedFilter,
                ]}
                onPress={() => setSelectedFilter(option)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === option && styles.selectedFilterText,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* CLEAR SEARCH AND FILTER */}
          <Pressable
            style={styles.clearButton}
            onPress={() => {
              setSearchText('');
              setSelectedFilter('All');
            }}
          >
            <Text style={styles.clearButtonText}>
              Clear Search and Filter
            </Text>
          </Pressable>

          {/* CURRENT MENU HEADER */}
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Current Menu</Text>
            <Text style={styles.itemCount}>
              {filteredMenuItems.length}{' '}
              {filteredMenuItems.length === 1 ? 'item' : 'items'}
            </Text>
          </View>

          {/* EMPTY MENU MESSAGE */}
          {menuItems.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No menu items yet</Text>
              <Text style={styles.emptyText}>
                Add your first menu item using the form above.
              </Text>
            </View>
          )}

          {/* NO SEARCH RESULTS MESSAGE */}
          {menuItems.length > 0 && filteredMenuItems.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>
                No matching menu items
              </Text>
              <Text style={styles.emptyText}>
                Try another dish name or course filter.
              </Text>
            </View>
          )}

          {/* DISPLAY MENU ITEMS */}
          {filteredMenuItems.map((item) => (
            <View key={item.id} style={styles.menuCard}>
              <View style={styles.menuTopRow}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>

              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.menuDescription}>
                {item.description}
              </Text>

              {/* EDIT AND DELETE BUTTONS */}
              <View style={styles.actionRow}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => editMenuItem(item)}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteMenuItem(item)}
                >
                  <Text style={styles.actionButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// APPLICATION STYLES
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

  // STATISTICS STYLES
  statisticsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  statisticsTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#2F6B4F',
    marginBottom: 15,
  },
  statisticsRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#EAF3ED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 6,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F6B4F',
  },
  statLabel: {
    fontSize: 13,
    color: '#555555',
    marginTop: 5,
    textAlign: 'center',
  },
  courseStatisticsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  courseStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  courseStatLabel: {
    fontSize: 14,
    color: '#555555',
  },
  courseStatNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F6B4F',
  },

  // FORM STYLES
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
  cancelButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // SEARCH AND FILTER STYLES
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    color: '#222222',
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#2F6B4F',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 7,
    marginBottom: 7,
  },
  selectedFilter: {
    backgroundColor: '#2F6B4F',
  },
  filterText: {
    color: '#2F6B4F',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  clearButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginBottom: 12,
  },
  clearButtonText: {
    color: '#B42318',
    fontWeight: 'bold',
    fontSize: 13,
  },

  // MENU DISPLAY STYLES
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
    shadowOffset: { width: 0, height: 2 },
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
  actionRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#2F6B4F',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#B42318',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});