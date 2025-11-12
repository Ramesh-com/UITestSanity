Google Sheets Find and Replace Tool - Test Repository
This repository contains test scripts and sample data designed to validate the functionality of the Google Sheets Find and Replace tool. The tool allows users to perform bulk text replacements and formula corrections within Google Spreadsheets, supporting advanced options such as regex search, case sensitivity, and scoped range or sheet targeting.

Features Tested
Find and replace text across single or multiple sheets

Case-sensitive and entire cell matching options

Support for regular expression based searches

Range-limited search and replacement within specific sheets or cell ranges

Formula corrections (e.g., fixing broken SUM formulas)

Value updates and data cleaning tasks

Test Data
Sample JSON payloads are included for different use cases:

Clearing error messages like #ERROR! globally

Updating formula references in defined ranges

Replacing specific old values with new ones, with or without case sensitivity

How to Use
Clone this repository.

Review the test payloads in the test_data folder.

Execute tests against your Google Sheets instance with appropriate API credentials.

Validate the output for correctness in changed occurrences, rows, and formulas.

Prerequisites
Access to Google Sheets API

OAuth2 credentials with permission scopes:

https://www.googleapis.com/auth/spreadsheets

https://www.googleapis.com/auth/drive.file

https://www.googleapis.com/auth/drive

Contributing
Feel free to submit issues or pull requests to expand test coverage for additional scenarios or bug fixes.