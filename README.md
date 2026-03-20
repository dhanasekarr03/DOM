# Student Registration System (DOM JS project)

## A simple client-side student management app built with HTML, CSS and JavaScript.

## Features

- Add new student records (name, ID, email, contact)
- Edit existing records
- Delete records with confirmation
- Persist data in browser localStorage
- Separate home form page and records page
- Responsive and mobile-friendly UI

## Project Structure

- `index.html` – main page for adding/editing students and listing current table
- `records.html` – view-only page showing all records
- `style.css` – responsive UI styling
- `script.js` – application logic and localStorage management


## Validation rules

- Name: required, letters and spaces only
- Student ID: required, numeric only
- Email: required, simple email format
- Contact: required, numeric only, min 10 digits

## Editing flow

- Click `Edit` on an existing row to load values into the form
- Update values and click `Update Student` 

## Deleting

- Click `Delete` and confirm to remove the record from localStorage and table

## Reset behavior

After add/update, form clears and localStorage updates.

## Notes

- All operations are local; no backend required.






## Dhanasekar R
## Internshala pracice project
## https://github.com/dhanasekarr03/DOM