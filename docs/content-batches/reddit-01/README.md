# Reddit 원자료 → Reveal 초안 / Batch 01

## 이번 결과

- 사용자가 발췌한 엑셀: Sheet1, 비어 있지 않은 셀 71개, 1열. 하이퍼링크 0개. 71명의 독립된 작성자/71개 독립 경험이라고 간주하지 않았다.
- 8개 Reveal: prediction 4개 + reflection 4개. 모두 선택지 2개, 정답/점수 없음.
- 모든 상태는 `needs_verification`. 원문 URL·작성일·접근일·검토자·게시일을 만들지 않았다.
- 원문 종류/커뮤니티 미확인: source kind `other`, community `Reddit (community unverified)`. 엑셀 셀은 추적 위치이지 공개 출처 링크가 아니다.
- 같은 행의 다른 사건이나 인접 행을 임의로 연결하지 않았다. 이전 kindness 더미를 이번 파일에서 다시 확인한 것처럼 취급하지 않았다.
- 실제 엑셀과 원문 전문은 Git에 올리지 않았다. JSON에는 공개용 영어 재서술과 내부 검토 메모만 들어 있다.
- 사용자의 최종 소재 선택·원문 검증·승인 전에 공개하지 않는다.

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

One parent remembered a subway ride home in Korea. Their one-year-old was crying, and an older couple nearby noticed.

**Question**

What did the couple do?

- A. Took out toys to help calm the child.
- B. Offered a few reassuring words to the parent.

**Reveal — They had toys with them.**

The parent said the older couple took out toys they were carrying to help calm the child. What stayed with the parent was a practical gesture from strangers during a difficult ride.

**Takeaway**

A public journey can become a personal memory through one small act of help.

**원자료:** Sheet1!A15. **사실 경계:** 장난감을 꺼내 아이를 달래려 한 사실만 확인. 장난감을 선물했다고 하거나 아이가 실제로 울음을 멈췄다고 쓰지 않음. 같은 셀의 식당 사건은 이번 문항에서 제외.


## reveal-reddit-01-002 — Same Town. A Completely Different Evening.

**형식:** prediction · **토픽:** travel · **태그:** weekday-travel, crowds, coastal-town

**선정 이유:** 한국 여행의 새 장소 목록보다 방문 시점이 만드는 반전.

**Context**

A person who had lived in Korea for almost three years described an east-coast town they visited. On weekends, its restaurants were packed and its car parks overflowed.

**Question**

When did the same town feel quiet and relaxed to them?

- A. On Monday night.
- B. On Saturday night.

**Reveal — Monday changed the mood.**

The writer described Monday night as peaceful, with restaurants almost to themselves. They could not remember the town’s name. Their point was how different one place could feel depending on the day.

**Takeaway**

Where you go is only part of a trip. When you go can change the experience, too.

**원자료:** Sheet1!A19. **사실 경계:** 동해안의 이름이 기억나지 않는 한 마을에 대한 개인 관찰. 특정 지명·여행 날짜·항상 월요일이 한산하다는 규칙을 만들지 않음. 모든 해변 마을로 일반화 금지.


## reveal-reddit-01-003 — Can a Busy City Feel Peaceful?

**형식:** reflection · **토픽:** daily-life, travel · **태그:** night-owl, convenience-stores, city-life

**선정 이유:** 고요함만이 편안함이라는 예상에서 벗어나는 경험. 두 선택 모두 존중.

**Context**

One writer described feeling at home in Seoul late at night. They liked being able to go for a walk and find convenience stores and places to spend time still open.

**Question**

Which evening would help you unwind?

- A. Quiet streets and an early night.
- B. A late walk with somewhere still open.

**Reveal — For this night owl, activity felt comforting.**

The writer found a kind of peace in Seoul’s late-night activity. Having somewhere to go suited their social personality, even amid the lights and bustle. They also acknowledged that a similar experience could be found in other large cities.

**Takeaway**

A relaxing city does not look the same to everyone. For some people, having options is part of the comfort.

**원자료:** Sheet1!A26. **사실 경계:** 작성자 개인의 선호와 체감. 모든 편의시설의 24시간 영업, 야간 안전, 한국만의 고유 현상이라고 주장하지 않음. 국적·거주자격·거주기간 미확인.


## reveal-reddit-01-004 — Great Food. Great Transit. Still Not Your City?

**형식:** reflection · **토픽:** travel, daily-life · **태그:** expectations, neighborhoods, city-atmosphere

**선정 이유:** 장점 나열형 도시 소개 대신 실제 여행 감정의 양면성.

**Context**

After five days in Seoul, a first-time visitor to East Asia had mixed feelings. They praised the transport, restaurant meals and helpful people, but the city’s atmosphere did not click for them.

**Question**

What most shapes whether a city feels right to you?

- A. How convenient it is to explore and eat well.
- B. How its streets and neighborhoods make me feel.

**Reveal — The good parts did not erase the feeling.**

The visitor enjoyed several parts of the trip, including a day in the mountains and a memorable Korean barbecue meal. Yet the packed buildings and the view from their accommodation left them feeling hemmed in. Useful transport and good food were not the whole experience for them.

**Takeaway**

Enjoying parts of a place and feeling at home there are different things. Both reactions can belong to the same trip.

**원자료:** Sheet1!A28. **사실 경계:** 한 여행자의 감정이며 서울의 객관적 거주성 평가가 아님. 우울증 등 의학적 진단, 시민들이 삶을 즐기지 않는다는 일반화, 재방문 의향을 만들지 않음.


## reveal-reddit-01-005 — A Wedding Invite from Someone You Barely Know

**형식:** reflection · **토픽:** work, daily-life · **태그:** wedding-invitations, social-expectations, relationships

**선정 이유:** 외국인뿐 아니라 해외 생활 후 돌아온 사람도 일상의 관습을 새롭게 느낀다는 관점.

**Context**

A Korean writer had recently returned after about 16 years abroad. A coworker they had known for roughly two months sent a wedding invitation with bank details for a congratulatory gift. They mostly knew each other from the work shuttle.

**Question**

Which response would feel more natural to you?

- A. Send a small gift as a friendly gesture.
- B. Offer congratulations without sending money.

**Reveal — The invitation brought a question about closeness.**

The writer understood that wedding gifts could be part of social etiquette, but felt unsure about giving money to someone they barely knew. They explicitly did not claim that the invitation was sent only to collect money.

**Takeaway**

Knowing a custom does not always make the personal decision easy. The relationship can matter as much as the occasion.

**원자료:** Sheet1!A37. **사실 경계:** A37 자체만 사용. A38~A40과 동일 스레드/작성자라는 연결 미확인. 결혼식 당일 초대였다는 A38 내용이나 축의금 5만원을 일반적 의무로 추가하지 않음. 초대자의 금전적 의도 추정 금지.


## reveal-reddit-01-006 — One Name, Two Languages

**형식:** prediction · **토픽:** language, daily-life · **태그:** baby-names, cross-cultural-family, naming

**선정 이유:** 통계가 아니라 한 가족의 작은 선택을 통해 언어 사이의 일상을 발견.

**Context**

A writer asked for baby-name ideas for a relative’s daughter. The family wanted a name that would sound nice in both Korea and England. An update later shared their choice.

**Question**

Which name did the update say they chose?

- A. Anna.
- B. Hanna.

**Reveal — They chose Anna.**

The writer updated the post to say the family had picked Anna. The request began with finding a name that could feel comfortable in two places, rather than choosing a name for only one language.

**Takeaway**

For a family connected to more than one place, even a short name can carry a lot of thought.

**원자료:** Sheet1!A47. **사실 경계:** A47의 업데이트 Anna만 실제선택으로 확인. Hanna는 같은 셀의 이름 목록에서 가져온 대안. 출생신고 완료·인기순위·원어민 발음 일치·이름의 한국어 의미를 주장하지 않음.


## reveal-reddit-01-007 — More Than a Bowl of Breakfast

**형식:** reflection · **토픽:** food, daily-life · **태그:** cooking-together, family, food-memories

**선정 이유:** 음식의 정답보다 함께 요리한 기억을 남기는 행동. 영문 타깃도 자기 경험과 연결 가능.

**Context**

A parent and son were trying Asian-inspired meals together. One breakfast used rice, egg, soy sauce, sesame oil and kimchi, with butter added. The parent asked others about the dish.

**Question**

What would you most want to keep from cooking together?

- A. Reliable recipes to make again.
- B. Memories of trying something together.

**Reveal — A recipe collection for the next generation.**

The parent said they were collecting recipes so they could one day pass them to their son, along with the dishes they had made together. Their post was not only about getting breakfast right. It was also about giving those shared meals a future.

**Takeaway**

A recipe can keep more than a list of ingredients. It can become a way to return to a shared experience.

**원자료:** Sheet1!A50. **사실 경계:** A50만 사용. A51이 같은 질문에 대한 검증된 답변이라고 연결하지 않음. 이 요리가 대표적인 한국 아침식사라는 주장, 영양·정통성 판단, 아들의 나이·맛평가를 만들지 않음.


## reveal-reddit-01-008 — A 24-Hour PC Bang Plan. How Long Did It Last?

**형식:** prediction · **토픽:** travel, daily-life · **태그:** pc-bang, gaming, travel-plans

**선정 이유:** 스스로 세운 도전과 실제 경험 사이의 가벼운 반전.

**Context**

A visitor wanted experiences beyond the usual sightseeing stops. One plan was to try a 24-hour session at a PC bang, a Korean gaming café.

**Question**

How long did they say they actually lasted?

- A. 12 hours.
- B. The full 24 hours.

**Reveal — Halfway was enough.**

The visitor said they lasted 12 hours before getting bored. It was one of several unusual activities they remembered from their visits, but the challenge itself did not need a full day to become a story.

**Takeaway**

An ambitious travel plan can turn into a memorable experience even when you stop earlier than expected.

**원자료:** Sheet1!A33. **사실 경계:** A33의 자가보고 게임시간일 뿐 PC방 이용자 평균이나 권장 플레이시간이 아님. 다른 활동들(담배·종교 모임 등)은 이번 문항에 끌어오지 않음. 연속 게임 도전을 권장하지 않음.


## 다음 작업

먼저 운영자가 사용할 소재와 문구를 고른다. 그다음 각 셀에 해당하는 원문 permalink·게시 시점·원문 맥락·재이용/인용 범위를 확인한다. 문항별로 고칠 내용을 검토한 후 승인·게시 여부를 별도로 정한다. 문서를 읽었다고 사용자 승인으로 처리하지 않는다.


## 원자료 식별

파일명: background_reference_forQuiz.xlsx

SHA-256: `0aaa89013ec120154825a82e32e4b7358710154d936682621dc544afa9f877b4`
