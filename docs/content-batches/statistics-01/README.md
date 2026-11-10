# 통계 발췌 → 영어 Quiz 초안 / Batch 01

7개 초안. 첨부 발췌문에 적힌 수치만 사용했으며 원보고서를 외부 검증한 결과는 아니다. 정부 공식 통계와 민간 조사/영수증 패널 추정치를 구분한다. 출처가 명시된 편의점 자료만 Embrain으로 귀속하며, 나머지 표의 발행기관은 추정하지 않는다.

질문은 대화체로 쓰고 수치·조사 범위는 결과에 남긴다. 기간이 없는 표에는 연도를 만들지 않는다. 10대 평판은 친구관계의 질을 직접 측정하지 않는다. 전체 표본 N=1,000은 10대 하위표본 수가 아니다. 전체 핵심관계 80.1%를 10대의 응답으로 바꾸지 않는다.

`sourceType=mixed`는 기존 스키마 호환 값이다. 실제로 Reddit를 혼합하거나 정부 통계로 분류했다는 뜻이 아니다. 이번 작업은 초안이며 게시 검증기를 바꾸지 않는다.

앱 개발 미리보기: `/preview?batch=statistics-01`. 운영에는 미게시. CSV는 기존 퀴즈 양식을 유지한다. `evidence.csv`에 문항별 원문 근거와 주의점을 기록했다. 001/002는 같은 표를 활용한 대안이므로 한 피드에 둘 다 반복 배치하기보다 하나를 고르는 것을 권장한다.

## quiz-statistics-01-001 — What Do People Think of Me?

**Context**

Some things feel hard to ignore—like how other people see you.

**Question**

Among the teenage respondents in this Korean survey, roughly how many said managing their reputation mattered to them?

- A. About 1 in 4.
- B. About half.
- C. About 3 in 4.

**Answer: C**

73.5% of teenage respondents agreed that managing their reputation was important to them—roughly three in four.

**Takeaway**

In the same survey, agreement was 59.4% overall, compared with 73.5% among teenagers.

**발췌 근거:** 평판을 잘 관리하는 것은 중요한 일: 10대 73.5%, 전체 동의 59.4%; 전체 N=1,000, Top2 %.

**범위/주의:** 10대 하위표본 수 미제공. 전체 1,000명을 10대 표본으로 쓰지 않음. 인접 시계열의 2026년을 이 표에 자동 적용하지 않음. 친구 수·신뢰·외로움·인과관계로 해석하지 않음.

## quiz-statistics-01-002 — Who Cares Most About Their Reputation?

**Context**

The same reputation question was put to several age groups.

**Question**

Which age group had the highest agreement that managing their reputation was important?

- A. People in their 20s.
- B. Teenagers.
- C. People in their 50s.

**Answer: B**

Teenagers had the highest agreement among the age groups listed: 73.5%, compared with 62.0% in their 20s, 60.0% in their 30s, 48.5% in their 40s and 53.0% in their 50s.

**Takeaway**

The pattern was not a steady decline with age: agreement rose from 48.5% among people in their 40s to 53.0% among those in their 50s.

**발췌 근거:** 10대 73.5, 20대 62.0, 30대 60.0, 40대 48.5, 50대 53.0%.

**범위/주의:** 같은 지표만 비교. 통계적 유의성·세대 성격·시간에 따른 연령효과를 주장하지 않음. 001과 같은 표이므로 실제 서비스에서는 둘 중 하나 우선 선정.

## quiz-statistics-01-003 — Small Circle. Big Share.

**Context**

A packed contact list, or a handful of people you keep close?

**Question**

In the 2026 relationship survey, roughly what share said they focused on 3–5 core people—friends, partners or coworkers?

- A. About 80%.
- B. About 20%.
- C. About 50%.

**Answer: A**

80.1% selected focusing on 3–5 core friends, partners or coworkers. The question allowed multiple responses.

**Takeaway**

A core circle was much more commonly selected than a network of 20 or more acquaintances (18.6%). Multiple responses were allowed.

**발췌 근거:** 2026년 3~5명 핵심 친구/연인/동료에 집중: 80.1%; 20명 이상 지인 네트워크 18.6%; 전체 n=1,000, 중복 %.

**범위/주의:** 전체 응답이지 10대만의 결과 아님. 친구 3~5명만 보유, 나머지 관계 없음, 모든 한국인 80%라는 주장 금지. 2025→2026 0.3%p를 큰 추세로 해석하지 않음.

## quiz-statistics-01-004 — A Little More Room for What You Love

**Context**

Sometimes, putting your heart into a hobby can feel easier than dating.

**Question**

Among respondents in their 20s, roughly how many agreed that focusing on idols, content or hobbies felt more comfortable than dating?

- A. About 15%.
- B. About 45%.
- C. About 75%.

**Answer: B**

44.8% of respondents in their 20s agreed with that statement. It was an attitude question, not a count of people who had stopped dating.

**Takeaway**

A sizeable share, but still less than half of respondents in their 20s.

**발췌 근거:** 연애 대신 좋아하는 대상(아이돌, 콘텐츠, 취미 등)에 마음을 쏟는 것이 더 편하다: 20대 44.8%.

**범위/주의:** 20대이며 10대가 아님. 과반·비연애율·연애 포기·동기 추정 금지. 인접 연도를 해당 표 조사연도로 확정하지 않음.

## quiz-statistics-01-005 — The Midnight Basket

**Context**

It is late. The convenience-store lights are still on. What goes into the basket?

**Question**

From 10 p.m. to 4 a.m., which category ranked first by estimated purchase count in the supplied Korean convenience-store data?

- A. Snacks.
- B. Beer.
- C. Cup noodles.

**Answer: A**

Snacks ranked first, at about 20.71 million estimated purchases. Soft drinks followed at 17.94 million, then cup noodles at 17.49 million. The period was July 2025–June 2026.

**Takeaway**

In this late-night ranking by estimated purchase count, snacks came ahead of both cup noodles and beer.

**발췌 근거:** 스낵류 약 2,071만 건 1위; 탄산음료 약 1,794만; 용기라면 약 1,749만. 2025.7~2026.6, 22~04시.

**범위/주의:** 영수증 패널 기반 추정치. 구매 건수와 구매자·매출·개수 구분. 원자료 각주 [1][2] 설명 미제공.

## quiz-statistics-01-006 — A Bigger Buzz After Dark

**Context**

The late-night basket did not grow at the same pace for every drink.

**Question**

How did estimated late-night convenience-store purchases of energy drinks change year over year?

- A. Up about 4%.
- B. Down about 10%.
- C. Up about 42%.

**Answer: C**

Energy-drink purchase counts rose 41.5% year over year, to about 7.33 million in July 2025–June 2026. The late-night window was 10 p.m.–4 a.m.

**Takeaway**

Energy-drink purchase counts grew, while beer purchase counts fell 9.2% over the same period.

**발췌 근거:** 에너지음료 약 733만 건, 전년 동기 대비 41.5% 증가; 맥주 구매 건수 9.2% 감소.

**범위/주의:** 전체 +41.5%와 20대 이하 +59.1% 혼동 금지. 증가 원인·건강효과·소비자 비율 아님.

## quiz-statistics-01-007 — Clocked Out. Still Connected?

**Context**

Work can follow you home through more than one kind of notification.

**Question**

Among the listed channels, which had the highest reported use for handling work or instructions after work on weekdays?

- A. Work email.
- B. Social media or messaging apps.
- C. The company’s internal system.

**Answer: B**

Social media and messaging apps were highest among the listed channels at 36.0%. Texts and calls followed at 33.6%; work email was 29.3%.

**Takeaway**

Messaging apps led the weekday after-hours list, ahead of both texts and calls and work email.

**발췌 근거:** SNS·메신저 36.0%, 문자·전화 33.6%, 메일 29.3%, 사내 시스템 22.4%.

**범위/주의:** 평일 퇴근 후만 비교. 주말·휴가와 합산 금지. 매일 경험·불법·업무 연락 응답 의무를 주장하지 않음.

## 보류한 내용

- 학벌 필요성 68%에 비해 하위 문항 base가 n=910인 부분은 정의가 불명확해 사용하지 않음.
- 라이프스타일 문항 “예전에는 습관을 찾기도…”는 문장이 불명확해 사용하지 않음.
- 다이소의 효능·품질과 구매 동기, 심야 소비 증가 원인 등 보고서의 해석은 통계로 사실화하지 않음.
- 설문 시계열을 같은 사람의 태도 변화나 통계적으로 유의한 차이로 해석하지 않음.

## 원자료

통계_init.txt / SHA-256: `af91ed6ce4a44fffeadc9cd1e00e4f490d3b6fbd30da9da0f2610c1d109426af`
