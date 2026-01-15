# StudyWise
A simple study session tracker with session history and progress tracking. 

Live at: https://studywisetracker.netlify.app/

<b><i>Sessions can also be downloaded as JSON</i></b>

## Tech Stack
- Tailwind CSS for styling </br>
- React JS with TypeScript </br>
- Lucide React for Icons </br>
- Next.js for the Frontend </br>
- Local Storage

## Screenshots

### Home
![Home Page](public\home.png)

### Session History
![Session History](public\history.png)

### Progress Tracking
![Progress Tracker](public\progress.png)

## Important Notes
The application was tested on a computer so UI reponsiveness and functionality may differ or is limited if used in other devices.

## Known Bug - Study Session History

**Problem:** <i>Session history suffers from ID duplication issues causing React JS key errors and individual task deletion errors.</i> If both tasks have the same name (e.g. "My Task") then deleting either will result in both tasks being deleted even if both have different times.

**Errors:**
- "Each child in a list should have a unique 'key' prop"
- Errors persist even after clearing localStorage

**Currently**
- Page still renders and functions
- Features **partially** work despite errors

## Local Setup
1. Download the project and install [NodeJS](https://nodejs.org/en).
2. Open the project in Visual Studio Code, open the terminal and type:
```
npm install
```
3. Run the development server:
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.