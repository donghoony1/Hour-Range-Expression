# Hour-Range-Expression
Express hour range by day of the week in JavaScript.

[Korean|한국어](https://github.com/donghoony1/Hour-Range-Expression/blob/master/README-Korean.md)

```
const HRE = require('hour-range-expression');

// Expression
const exp = 'sun(0-10) mon(0-8 22-24) tue(0-8 22-24) wed(0-8 22-24) thu(0-8 22-24) fri(0-8 22-24) sat(0-10)';

// Without callback
console.log(HRE.match(exp, 1005058800, null));    // true

// With callback
HRE.match(exp, 1005058800, null, (error, result) => {
    if(error) console.error(error);
    else if(result) console.log(result);    // true
});

// Checking 
console.log(HRE.check(exp, null));   // true

// Checking(callback)
HRE.check(exp, null, (error, result) => {
    if(error) console.error(error);
    else if(result) console.log(result);    // true
});
```

# ✨ Requirements
- [Node.js](https://nodejs.org/en/download/): This package is a Node.js module. Before using it, You should install Node.js version 12 or higher.

# 🎯 Installation
```
$ npm install hour-range-expression
```

# 🎈 Features
- `.match` Checking whether the hour which was given is in hour range defined by HRE.
- `.check` Checking whether HRE which was given is match correct HRE.
- We support functions both without callback and with callback.

# 🎲 Methods
## `HRE.match`
Checking whether the hour which was given is in hour range defined by HRE.
```
HRE.match(HRE, Unixtime, CustomWeeks[, Callback]);
```
### Parameters
- **(String) HRE:** Hour Range Expression.
- **(Integer) Unixtime:** Time to check for matches.
- **(Array) Custom Weeks:** If you want to change names of day in expression, Enter the name of the day through the array. Otherwise, Just enter `null`.
- **\[(Callback) Callback\]:** If you want to get result through callback, Enter callback function.

## `HRE.check`
Checking whether HRE which was given is match correct HRE.
```
HRE.check(HRE, CustomWeeks[, Callback]);
```
### Parameters
- **(String) HRE:** Hour Range Expression.
- **(Array) Custom Weeks:** If you want to change names of day in expression, Enter the name of the day through the array. Otherwise, Just enter `null`.
- **\[(Callback) Callback\]:** If you want to get result through callback, Enter callback function.

## Details
### Custom Weeks
#### Default
```
['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'everyday']
```
#### Example
```
['일', '월', '화', '수', '목', '금', '토', '매일']
```

# 📝 Expression
## Structure of HRE
```
<Day of week>(<Start hour>-<End hour> ...) ...
// <Start hour> <= GIVEN HOUR < <End hour>
```
- **Day of week:** The day of the week. It's for defining a different hour range for each day of the week.
- **Start hour:** The hour of range's start.
- **End hour:** The hour of range's end.
- **...:** Additional ranges. For expressing multiple hour ranges.

## Examples
Unixtime in this examples are based on UTC+9 (KST: Korea Standard Time).
- **Unixtime:** 1580904000(2020-02-05 Wednesday 17:00:00 KST)
### Case #1: General expression.
```
wed(17-19)
```
- **Result:** True

### Case #2: Caution for end of hour range.
```
wed(0-17)
```
- **Result:** False

### Case #3: Multiple hour ranges.
```
wed(0-9 17-24)
```
- **Result:** True

### Case #4: Multiple hour ranges by day of the week.
```
wed(0-9 17-24) fri(0-9 19-24) everyday(0-6)
```
- **Result:** True

# 💡 Notes
- You can specify a time range for all days other than a specific day of the week through `everyday`.
```
sat(0-10) sun(0-10) everyday(0-8 22-24)
```

# 🚩 Author
## Dong-Hoon Yoo `Developer`
- Email: yoodonghoon01@gmail.com
- Blog: [blog.donghoonyoo.com](https://blog.donghoonyoo.com)
- Roles: Development, Writing document in English and Korean.