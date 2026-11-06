Chef's Menu Manager

Project Description

Chef's Menu Manager is a mobile application developed to help restaurant staff manage menu items. The application allows users to add, view, edit and delete dishes, search for menu items, filter dishes by course and view menu statistics.

Technologies Used

- React Native
- Expo
- TypeScript
- Visual Studio Code
- GitHub

Part 2 Features

- Add new menu items.
- Enter dish names and descriptions.
- Select a course category.
- Enter menu item prices.
- Display saved menu items.
- Validate required fields.

Part 3 Enhancements

The following features were added and improved in Part 3:

1. Edit Menu Items

Users can select an existing dish, change its details and save the updated information.

2. Delete Menu Items

Users can delete menu items. A confirmation message is displayed before the item is removed.

3. Search Menu Items

Users can search for dishes by entering the dish name or part of the name.

4. Filter Menu Items

Users can filter the menu according to:

- Starter
- Main Course
- Dessert

5. Clear Search and Filters

Users can clear the search field and selected course filter to display the full menu again.

6. Menu Statistics

The application displays:

- Total number of menu items.
- Average menu item price.
- Number of Starter items.
- Number of Main Course items.
- Number of Dessert items.

7. Improved Validation

The application checks that required fields are completed, prices are valid and greater than zero, and duplicate dish names are not added.

Testing

The application was tested to check that:

- Menu items can be added successfully.
- Existing items can be edited.
- Items can be deleted after confirmation.
- Search displays matching dishes.
- Course filters display the correct items.
- Clear resets the search and filter.
- Statistics update when menu items change.
- Validation messages appear when incorrect or incomplete information is entered.

Known Limitation

Menu items are currently stored in application state. They may not remain available after the application is fully restarted or refreshed. Persistent storage can be added in a future version.

GitHub Repository

https://github.com/karenmatsh83-cmd/ChefMenuManager

Developer

Student Name: Koketso M

Student Number: ST105222956

Module: MAST5112

Part 3 Change Log

- Added the ability to edit menu items.
- Added delete functionality with confirmation.
- Added dish name searching.
- Added course filtering.
- Added a clear filters option.
- Added menu statistics.
- Improved form validation.
- Added duplicate dish name checking.
- Improved application usability and feedback.
