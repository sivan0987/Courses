# מערכת קורסים עם AI

מערכת לצפייה בקורסים הכוללת יצירת מבחן אוטומטי באמצעות AI מתוכן PDF.

## תיאור הפרויקט

מערכת זו מאפשרת למשתמשים לצפות בקורסים ושיעורים,כולל יצירת מבחן אוטומטי באמצעות Google Gemini AI. המערכת מורכבת משרת Node.js וקליינט React.

## תכונות עיקריות

- 📚 צפייה בקורסים ושיעורים
- 🤖 יצירת חידונים אוטומטית מתוכן PDF באמצעות AI
- 🎯 ממשק משתמש אינטואיטיבי

## מבנה הפרויקט

```
courses/
├── client/                 # קליינט React
│   ├── src/
│   │   ├── components/     # רכיבי React
│   │   ├── pages/          # דפי האפליקציה
│   │   │   ├── Home.jsx    # דף הבית
│   │   │   ├── CourseList/ # רשימת קורסים
│   │   │   └── LessonsList/# רשימת שיעורים
│   │   ├── assets/         # קבצי משאבים
│   │   ├── App.jsx         # רכיב הראשי
│   │   └── main.jsx        # נקודת כניסה
│   ├── public/             # קבצים סטטיים
│   └── package.json
├── server/                 # שרת Node.js
│   ├── config/             # הגדרות מסד נתונים
│   │   └── db.js          # חיבור למסד נתונים
│   ├── controller/         # בקרי API
│   │   └── courseController.js
│   ├── models/             # מודלים של MongoDB
│   │   └── model.js       # סכמת קורסים
│   ├── routes/             # נתיבי API
│   │   └── courseRouter.js
│   ├── services/           # שירותים
│   │   ├── aiServices.js   # שירותי AI
│   │   └── courseServices.js # שירותי קורסים
│   ├── uploads/            # קבצים שהועלו
│   ├── server.js           # קובץ השרת הראשי
│   └── package.json
├── mongoConnect.js         # חיבור MongoDB
└── README.md
```

## טכנולוגיות

### שרת (Backend)

- **Node.js** - סביבת זמן ריצה
- **Express.js** - מסגרת עבודה ל-API
- **MongoDB** - מסד נתונים
- **Mongoose** - ODM ל-MongoDB
- **Google Generative AI** - יצירת חידונים אוטומטית
- **pdf-parse** - עיבוד קבצי PDF

### קליינט (Frontend)

- **React** - ספריית UI
- **CSS Modules** - עיצוב

## התקנה והרצה

### דרישות מוקדמות

- Node.js (גרסה 14 ומעלה)
- MongoDB
- מפתח API של Google Gemini

### התקנה

1. **שכפול הפרויקט**

```bash
git clone <repository-url>
cd courses
```

2. **התקנת תלויות השרת**

```bash
cd server
npm install
```

3. **התקנת תלויות הקליינט**

```bash
cd ../client
npm install
```

4. **הגדרת משתני סביבה**
   צור קובץ `.env` בתיקיית `server/` עם התוכן הבא:

```env
MONGODB_URI=mongodb://localhost:27017/courses
GEMINI_API_KEY=your_gemini_api_key_here
```

### טעינת נתונים ל-MongoDB (לפני הרצה)

לפני שמריצים את השרת, יש לטעון את נתוני הדוגמה מקובץ `data.json` למסד הנתונים באמצעות MongoDB Compass:

1. פתחו את MongoDB Compass והתחברו ל-`mongodb://localhost:27017`.
2. ייצרו (או בחרו) בסיס נתונים בשם `courses`.
3. ייבאו אוסף בשם `courses` באמצעות כפתור Import.
4. בחרו את הקובץ `data.json` (פורמט JSON) ואשרו את הייבוא.

לאחר הייבוא, ודאו שהאוסף `courses` מכיל את הרשומות מהקובץ.

### הרצה

1. **הפעלת השרת**

```bash
cd server
npm start
```

השרת יפעל על פורט 3000.

2. **הפעלת הקליינט**

```bash
cd client
npm run dev
```

הקליינט יפעל על פורט 5173.

## שימוש במערכת

 **יצירת מבחן** - המערכת תיצור אוטומטית חידונים מתוכן ה-PDF באמצעות AI
   - כל חידון כולל 5 שאלות רב-ברירה
   - 4 אפשרויות לכל שאלה
   - השאלות נוצרות באופן אקראי ומגוון (לוקח כמה שניות לטעינה)

## API Endpoints

- `GET /courses/:username` - קבלת קורסים של משתמש
- `POST /courses/generateTest` - יצירת חידון מתוכן PDF
  - Body: `{ "lessonName": "string", "pdfPath": "string" }`
  - Response: מערך של 5 שאלות עם מבנה:

    [
    {
    "question": "שאלה...",
    "options": ["אפשרות 1", "אפשרות 2", "אפשרות 3", "אפשרות 4"],
    "correct": "התשובה הנכונה",
    "explanation": "הסבר קצר"
    }
    ]

### סכמת הקורסים

```javascript
{
  username: String,           // שם משתמש ייחודי
  passwordHash: String,       // סיסמה מוצפנת
  courses: [{
    title: String,            // כותרת הקורס
    lessons: [{
      title: String,          // כותרת השיעור
      videoUrl: String,       // קישור לוידאו
      pdfUrl: String,         // קישור לקובץ PDF
      description: String     // תיאור השיעור
    }]
  }]
}
```

**הערה**: וודא שיש לך מפתח API תקין של Google Gemini כדי להשתמש בתכונת יצירת החידונים האוטומטית.
