# Hour-Range-Expression
JavaScript에서 요일별 시간 범위를 표현하는 Node.js 패키지

[English|영어](https://github.com/donghoony1/Hour-Range-Expression/blob/master/README.md)

```
const HRE = require('hour-range-expression');

// 표현식
const exp = 'sun(0-10) mon(0-8 22-24) tue(0-8 22-24) wed(0-8 22-24) thu(0-8 22-24) fri(0-8 22-24) sat(0-10)';

// 일반 함수
console.log(HRE.match(exp, 1005058800, null));    // true

// 콜백 함수
HRE.match(exp, 1005058800, null, (error, result) => {
    if(error) console.error(error);
    else if(result) console.log(result);    // true
});

// 확인하기
console.log(HRE.check(exp, null));   // true

// 확인하기(callback)
HRE.check(exp, null, (error, result) => {
    if(error) console.error(error);
    else if(result) console.log(result);    // true
});
```

# ✨ 요구 사항
- [Node.js](https://nodejs.org/ko/download/): 이 패키지는 Node.js 모듈입니다. 사용하기 전에 12 버전 이상의 Node.js를 설치해야 합니다.

# 🎯 설치
```
$ npm install hour-range-expression
```

# 🎈 기능
- `.match` 주어진 시간이 HRE에 의해 정의 된 시간 범위에 있는지 확인할 수 있습니다.
- `.check` 주어진 HRE가 유효한 HRE인지 확인할 수 있습니다.
- 일반 함수와 콜백 함수 모두를 지원합니다.

# 🎲 메서드
## `HRE.match`
주어진 시간이 HRE에 의해 정의 된 시간 범위에 있는지 확인합니다.
```
HRE.match(HRE, Unixtime, CustomWeeks[, Callback]);
```
### 매개변수
- **(String) HRE:** 시간 범위 표현식
- **(Integer) Unixtime:** 확인하기를 원하는 시간(Unixtime 기준).
- **(Array) Custom Weeks:** 표현식에서 요일 이름을 변경하고 싶다면, 배열을 통해 요일 이름을 입력하세요. 그렇지 않다면 `null`을 넣으세요.
- **\[(Callback) Callback\]:** 콜백으로 결과를 얻기를 원한다면, 콜백 함수를 넣으세요.

## `HRE.check`
주어진 HRE가 유효한 HRE인지 확인합니다.
```
HRE.check(HRE, CustomWeeks[, Callback]);
```
### 매개변수
- **HRE:** 시간 범위 표현식
- **Custom Weeks:** 표현식에서 요일 이름을 변경하고 싶다면, 배열을 통해 요일 이름을 입력하세요. 그렇지 않다면 `null`을 넣으세요.
- **\[Callback\]:** 콜백으로 결과를 얻기를 원한다면, 콜백 함수를 넣으세요.

## 상세
### Custom Weeks
#### 기본 값
```
['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'everyday']
```
#### 예(한국어 기준)
```
['일', '월', '화', '수', '목', '금', '토', '매일']
```

# 📝 표현식
## HRE의 구조
```
<요일>(<시작하는 시간>-<끝나는 시간> ...) ...
// <시작하는 시간> <= 주어진 시간 < <끝나는 시간>
```
- **요일:** 요일별 시간 범위를 정의하기 위해 입력해야 합니다.
- **시작하는 시간:** 시간 범위의 시작
- **끝나는 시간** 시간 범위의 끝
- **...:** 추가적인 범위. 요일별 시간을 표현하기 위해 사용합니다.

## 예제
본 예제에서의 Unixtime은 UTC+9 (KST: 대한민국 표준 시)에 기반합니다.
- **Unixtime:** 1580904000(2020-02-05 수요일 17:00:00 KST)
### 상황 #1: 일반 표현식.
```
wed(17-19)
```
- **결과:** True

### 상황 #2: 시간 범위의 끝에 대한 주의.
```
wed(0-17)
```
- **결과:** False

### 상황 #3: 여러개의 시간 범위 정의.
```
wed(0-9 17-24)
```
- **결과:** True

### 상황 #4: 여러개의 요일별 시간 범위 정의.
```
wed(0-9 17-24) fri(0-9 19-24) everyday(0-6)
```
- **결과:** True

# 💡 참고 사항
- `everyday`를 활용하여 특정 요일을 제외한 모든 요일을 위한 시간 범위를 정의할 수 있습니다.
```
sat(0-10) sun(0-10) everyday(0-8 22-24)
```

# 🚩 제작자
## Dong-Hoon Yoo `개발자`
- Email: yoodonghoon01@gmail.com
- 블로그: [blog.donghoonyoo.com](https://blog.donghoonyoo.com)
- 역할: 개발, 영어 및 한국어 문서 작성