# Reddit 원자료 → Reveal 초안 / Batch 01

## 이번 결과

- 사용자가 발췌한 엑셀: Sheet1, 비어 있지 않은 셀 71개, 1열. 하이퍼링크 0개. 71명의 독립된 작성자/71개 독립 경험이라고 간주하지 않았다.
- 8개 Reveal: prediction 4개 + reflection 4개. 모두 선택지 2개, 정답/점수 없음.
- 모든 상태는 `draft`(문구 검토용 초안). 원문 URL·작성일·접근일·검토자·게시일을 만들지 않았다.
- 원문 종류/커뮤니티 미확인: source kind `other`, 표시는 `Reddit · personal account`. 엑셀 셀은 추적 위치이지 공개 출처 링크가 아니다.
- 같은 행의 다른 사건이나 인접 행을 임의로 연결하지 않았다. 이전 kindness 더미를 이번 파일에서 다시 확인한 것처럼 취급하지 않았다.
- 실제 엑셀과 원문 전문은 Git에 올리지 않았다. JSON에는 공개용 영어 재서술과 내부 검토 메모만 들어 있다.
- 사용자의 최종 소재 선택·편집 검토·게시 승인 전에 공개하지 않는다. 원문 링크를 공개하거나 확보하는 일을 이번 문구 검토의 전제로 두지 않는다. 경험담 귀속은 독립 검증을 대신하지 않는다.

## 파일

- `reveal_drafts.csv`: 기존 Reveal CSV와 같은 24개 열. 한국어 내부 메모 포함.
- `sources_NEEDS_VERIFICATION.csv`: 연결된 출처 8개, URL/날짜 공란.
- `editorial_review.csv`: 문항별 선정 이유와 사실 경계.
- `source_review_71_rows.csv`: 원자료 71개 셀 전체의 1차 분류. 제외/보류를 사실 오류 확정으로 간주하지 않는다.
- 앱 데이터: `content/reddit-drafts.json`. 개발에서만 `/preview?batch=reddit-01`로 확인. 기존 `/preview`의 6개 더미와 분리된다.
- 이 배치의 통계/역사/금융/의학 관련 원문을 외부 검증했다고 주장하지 않는다.

## 후보 요약

|ID|형식|제목|토픽|원자료|
|---|---|---|---|---|
|reveal-reddit-01-001|prediction|A Crying Toddler. An Unexpected Response.|travel, daily-life|A15|
|reveal-reddit-01-002|prediction|Same Town. A Completely Different Evening.|travel|A19|
|reveal-reddit-01-003|reflection|Can a Busy City Feel Peaceful?|daily-life, travel|A26|
|reveal-reddit-01-004|reflection|Great Food. Great Transit. Still Not Your City?|travel, daily-life|A28|
|reveal-reddit-01-005|reflection|A Wedding Invite from Someone You Barely Know|work, daily-life|A37|
|reveal-reddit-01-006|prediction|One Name, Two Languages|language, daily-life|A47|
|reveal-reddit-01-007|reflection|More Than a Bowl of Breakfast|food, daily-life|A50|
|reveal-reddit-01-008|prediction|A 24-Hour PC Bang Plan. How Long Did It Last?|travel, daily-life|A33|

## reveal-reddit-01-001 — A Crying Toddler. An Unexpected Response.

**형식:** prediction · **토픽:** travel, daily-life · **태그:** kindness, parenting, subway

**선정 이유:** 우는 아이를 향한 반응을 막연한 친절이 아니라 뜻밖의 구체적인 행동으로 공개.

**Context**

A parent remembers a subway ride in Korea: a crying toddler, an older couple nearby, and a small surprise.

**Question**

What happened next?

- A. Took out toys to help calm the child.
- B. Offered a few reassuring words to the parent.

**Reveal — An unexpected toy break.**

The couple took out toys they had with them to help calm the child. A small thing to try when a journey gets difficult.

**Takeaway**

Sometimes a little help looks like whatever you happen to have with you.

**원자료:** Sheet1!A15. **사실 경계:** 장난감을 꺼내 아이를 달래려 한 사실만 확인. 장난감을 선물했다고 하거나 아이가 실제로 울음을 멈췄다고 쓰지 않음. 같은 셀의 식당 사건은 이번 문항에서 제외.


## reveal-reddit-01-002 — Same Town. A Completely Different Evening.

**형식:** prediction · **토픽:** travel · **태그:** weekday-travel, crowds, coastal-town

**선정 이유:** 한국 여행의 새 장소 목록보다 방문 시점이 만드는 반전.

**Context**

A Korean coastal town. Packed restaurants on the weekend. Come back another evening, and the mood changes completely.

**Question**

Which evening brought the quieter mood?

- A. On Monday night.
- B. On Saturday night.

**Reveal — Same town. Monday mood.**

Monday night: barely anyone in the restaurants, and a much slower pace. The town’s name had slipped from memory; the contrast had not.

**Takeaway**

A place on your itinerary might have more than one mood.

**원자료:** Sheet1!A19. **사실 경계:** 동해안의 이름이 기억나지 않는 한 마을에 대한 개인 관찰. 특정 지명·여행 날짜·항상 월요일이 한산하다는 규칙을 만들지 않음. 모든 해변 마을로 일반화 금지.


## reveal-reddit-01-003 — Can a Busy City Feel Peaceful?

**형식:** reflection · **토픽:** daily-life, travel · **태그:** night-owl, convenience-stores, city-life

**선정 이유:** 고요함만이 편안함이라는 예상에서 벗어나는 경험. 두 선택 모두 존중.

**Context**

A late walk. Lights still on. Somewhere to go. For one night owl, Seoul felt like home.

**Question**

Which evening would help you unwind?

- A. Quiet streets and an early night.
- B. A late walk with somewhere still open.

**Reveal — Their kind of quiet had the lights on.**

Places to go late at night felt comforting rather than overwhelming. The appeal was Seoul’s energy—a feeling the writer also recognized could exist in other big cities.

**Takeaway**

What feels restful to you: fewer things happening, or more possibilities?

**원자료:** Sheet1!A26. **사실 경계:** 작성자 개인의 선호와 체감. 모든 편의시설의 24시간 영업, 야간 안전, 한국만의 고유 현상이라고 주장하지 않음. 국적·거주자격·거주기간 미확인.


## reveal-reddit-01-004 — Great Food. Great Transit. Still Not Your City?

**형식:** reflection · **토픽:** travel, daily-life · **태그:** expectations, neighborhoods, city-atmosphere

**선정 이유:** 장점 나열형 도시 소개 대신 실제 여행 감정의 양면성.

**Context**

Great food. Easy transport. And still, Seoul did not quite click for one visitor.

**Question**

What most shapes whether a city feels right to you?

- A. How convenient it is to explore and eat well.
- B. How its streets and neighborhoods make me feel.

**Reveal — A good trip can come with mixed feelings.**

A great barbecue meal. An enjoyable mountain outing. But around the accommodation, the buildings felt close and confining. Same trip, different feelings.

**Takeaway**

You can enjoy parts of a city without falling in love with the whole place.

**원자료:** Sheet1!A28. **사실 경계:** 한 여행자의 감정이며 서울의 객관적 거주성 평가가 아님. 우울증 등 의학적 진단, 시민들이 삶을 즐기지 않는다는 일반화, 재방문 의향을 만들지 않음.


## reveal-reddit-01-005 — A Wedding Invite from Someone You Barely Know

**형식:** reflection · **토픽:** work, daily-life · **태그:** wedding-invitations, social-expectations, relationships

**선정 이유:** 외국인뿐 아니라 해외 생활 후 돌아온 사람도 일상의 관습을 새롭게 느낀다는 관점.

**Context**

Back in Korea after years abroad, someone gets a wedding invitation from a coworker they barely know. Included: bank details for a congratulatory gift.

**Question**

Which response would feel more natural to you?

- A. Send a small gift as a friendly gesture.
- B. Offer congratulations without sending money.

**Reveal — An invitation—and a little hesitation.**

The awkward part was closeness: what feels right when you barely know each other? The story leaves the coworker’s intention—and the eventual decision—open.

**Takeaway**

Where would you draw the line between a friendly gesture and a social obligation?

**원자료:** Sheet1!A37. **사실 경계:** A37 자체만 사용. A38~A40과 동일 스레드/작성자라는 연결 미확인. 결혼식 당일 초대였다는 A38 내용이나 축의금 5만원을 일반적 의무로 추가하지 않음. 초대자의 금전적 의도 추정 금지.


## reveal-reddit-01-006 — One Name, Two Languages

**형식:** prediction · **토픽:** language, daily-life · **태그:** baby-names, cross-cultural-family, naming

**선정 이유:** 통계가 아니라 한 가족의 작은 선택을 통해 언어 사이의 일상을 발견.

**Context**

A baby name with two places in mind: Korea and England. The family has made a choice.

**Question**

Which name did they pick?

- A. Anna.
- B. Hanna.

**Reveal — Their pick: Anna.**

Anna. One short name, chosen with two places in mind.

**Takeaway**

If a name had to travel between two languages, what would matter most to you?

**원자료:** Sheet1!A47. **사실 경계:** A47의 업데이트 Anna만 실제선택으로 확인. Hanna는 같은 셀의 이름 목록에서 가져온 대안. 출생신고 완료·인기순위·원어민 발음 일치·이름의 한국어 의미를 주장하지 않음.


## reveal-reddit-01-007 — More Than a Bowl of Breakfast

**형식:** reflection · **토픽:** food, daily-life · **태그:** cooking-together, family, food-memories

**선정 이유:** 음식의 정답보다 함께 요리한 기억을 남기는 행동. 영문 타깃도 자기 경험과 연결 가능.

**Context**

A parent and son try something new for breakfast: rice, egg, soy sauce, sesame oil and kimchi—with a little butter.

**Question**

What would you most want to keep from cooking together?

- A. Reliable recipes to make again.
- B. Memories of trying something together.

**Reveal — Breakfast, with something to pass on.**

There was a bigger plan behind the breakfast: collecting the recipes to pass on to the son one day. A kitchen experiment with a future.

**Takeaway**

What would you keep from a shared meal: the recipe, the memory, or a bit of both?

**원자료:** Sheet1!A50. **사실 경계:** A50만 사용. A51이 같은 질문에 대한 검증된 답변이라고 연결하지 않음. 이 요리가 대표적인 한국 아침식사라는 주장, 영양·정통성 판단, 아들의 나이·맛평가를 만들지 않음.


## reveal-reddit-01-008 — A 24-Hour PC Bang Plan. How Long Did It Last?

**형식:** prediction · **토픽:** travel, daily-life · **태그:** pc-bang, gaming, travel-plans

**선정 이유:** 스스로 세운 도전과 실제 경험 사이의 가벼운 반전.

**Context**

The travel plan: 24 hours at a PC bang, a Korean gaming café. The reality: an early exit.

**Question**

How long did the session last?

- A. 12 hours.
- B. The full 24 hours.

**Reveal — Half the plan. Still a story.**

Twelve hours, before boredom set in. A full-day plan turned into a half-day story.

**Takeaway**

Sometimes the memorable part of a plan is deciding you have had enough.

**원자료:** Sheet1!A33. **사실 경계:** A33의 자가보고 게임시간일 뿐 PC방 이용자 평균이나 권장 플레이시간이 아님. 다른 활동들(담배·종교 모임 등)은 이번 문항에 끌어오지 않음. 연속 게임 도전을 권장하지 않음.


## 다음 작업

이번 개정은 원문 링크 없는 개인 경험담을 익명 재서술하는 방향이다. 운영자가 소재와 문구를 검토한 뒤 게시 여부를 정한다. 원문 확인이 어려운 내용은 사실 Quiz나 통계로 승격하지 않는다. 현재 게시 검증기는 공개 출처 URL을 요구하므로 실제 게시 경로의 정책 변경은 별도 작업이며, 이번 문구 수정으로 검증기를 완화하지 않았다.

## 원자료 식별

파일명: background_reference_forQuiz.xlsx

SHA-256: `0aaa89013ec120154825a82e32e4b7358710154d936682621dc544afa9f877b4`

## 경험담 편집 기준 (이번 개정)

- 경험담이라는 출처 안내는 결과 하단 한 줄에 모은다. 본문은 이야기체 재서술로 풀고 `according to` / `said`를 반복하지 않는다. 한 사례의 범위를 벗어나거나 대화·행동·결말을 추가하지 않는다.
- 고유 신상, 불필요한 거주 기간·아이 나이·직장 이동 동선을 축약한다. 출처 셀은 내부 추적용으로 남긴다.
- 실제 정답을 맞히는 사실 Quiz처럼 채점하지 않는다. 반대 선택지는 상상 가능한 대안이며 원문 사건의 일부로 서술하지 않는다.
- 한국인 전체의 관습·평균·안전성·사람의 의도를 추론하지 않는다. 숫자는 해당 작성자의 회상에 한정한다.
- 공개 결과에는 링크 없는 경험담 안내 한 줄을 표시한다. 원문 URL과 실명은 만들지 않는다.
- 통계·의학·법률·역사 등 검증이 필요한 주장은 이 경험담 방식을 근거로 사실화하지 않는다.
