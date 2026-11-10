# Almeng-E 콘텐츠 제작 인수인계 — ChatGPT용

이 문서는 ChatGPT에서 콘텐츠를 기획·작성하고, Codex에서 앱 데이터로 검증·변환하기 위한 기준이다. 앱의 현행 구현과 CSV 양식을 기준으로 작성했다. 문서에 적힌 앞으로의 작업을 이미 완료한 것으로 간주하지 않는다.

## 1. 서비스와 현재 작업 상태

- 브랜드: **Almeng-E**. 과거 자료의 ALR / 알맹이 / Almengi / Almeng-i는 이전 작업명이다. 프로젝트·저장소 내부에는 almengi라는 식별자가 남아 있다.
- 목적: 한국에 관심 있는 영어권 사용자가 짧은 질문과 실제 이야기로 한국을 재미있게 알아가고 무언가를 기억하는 발견형 웹앱.
- 한국을 거창하게 대표하거나 홍보하는 백과사전·관광청 서비스가 아니다. 어학 시험도 아니다.
- 히어로 메인 카피: `Korea, here and there` / `A little deeper and closer`.
- 서브 카피: `Get to know Korea. Have a little fun. Take a little with you.`
- UI와 최종 공개 콘텐츠는 **영어**. 운영자와의 기획·검토는 한국어로 진행할 수 있다.
- 운영 형태: 사람이 소재를 수동 선정하고, 출처를 검토하고, 승인·게시한다. 자동 크롤링·자동 게시·실시간 통계 연동은 없다.
- 앱은 Next.js/TypeScript, Vercel 배포. 콘텐츠는 현재 **로컬 JSON 파일**로 관리하며 외부 DB·CMS는 없다. 개발 스택 변경은 콘텐츠 작업의 범위가 아니다.
- 공개 서비스: https://gsh-lab.vercel.app/ — 랜딩. `/discover` — 메인 피드.
- 이 문서 작성 시 공개 콘텐츠는 **0개**다. 기존 Quiz 1개와 Reveal 5개는 **미검증 개발용 더미**다. 출시된 사실이나 검증된 자료처럼 사용하지 않는다.
- 기존 더미: 1인 가구 통계 Quiz, 직장 인사 Reveal, 친절 관련 독립 사례 4개(택시/우산, 우산 건네기 시도, 서울 지갑 분실, 비싼 것처럼 보이는 우산을 받는 망설임).
- 개발용 `/preview`는 프로덕션에서 차단된다. CSV를 만든다고 자동 공개되는 것은 아니다.

## 2. 사용자가 콘텐츠를 만나는 방식

랜딩 → 시작 CTA → 메인 피드 → 문항 선택 → 선택지 선택 → 결과/이야기 공개 → 출처 확인·다음 콘텐츠.

메인에는 다음 두 탭이 있다.

1. **By topic:** 큰 주제 칩과 검색 입력창. 검색은 버튼 또는 Enter로 실행하며 선택한 토픽과 함께 적용된다.
2. **Random:** 카테고리와 무관한 Quiz/Reveal 혼합 순서. 한 번의 세션에서 모두 보기 전에는 중복하지 않는다.
Saved 탭·저장 버튼·로컬 저장은 제거되었다. 로그인과 저장/북마크 기능을 전제로 하는 콘텐츠나 안내를 작성하지 않는다.

콘텐츠는 독립적으로 이해되어야 한다. 앞 문항을 봐야만 이해하는 연재식 맥락을 전제하지 않는다. 댓글, Poll, 사용자 응답률, 랭킹, 가입 유도, CMS는 현재 범위가 아니다.

## 3. 편집 방향과 말투

- 한국의 일상·여행·음식·언어·직장·사회의 구체적인 작은 발견.
- 가볍게 읽히되 근거는 가볍게 취급하지 않는다.
- 친근하고 자연스러운 영어. 독자가 한국어를 알거나 한국에 살아봤다고 가정하지 않는다.
- 과장된 충격·공포·국뽕·우열 비교·민족성 단정 대신 궁금증을 만든다.
- 제목과 맥락은 선택 전에 답을 누설하지 않는다. 공개 후에는 실제로 새로운 정보가 있어야 한다.
- 개인 사례를 한국인 전체의 특성이나 보편적인 문화 법칙으로 확대하지 않는다.
- 한국에 대한 혐오·갈등이 브랜드의 사실적 정체성이라는 전제를 사용하지 않는다. 호기심·사람 사이의 경험·작은 친절은 가능한 편집 소재이지 전체 콘텐츠를 친절 주제로 제한하는 규칙은 아니다.
- 학술 영어, 설명을 위한 장황한 서론, 억지 반전은 피한다.

### 길이 가이드 — 편집 권장값이며 시스템 제한은 아님

| 항목 | 권장 |
|---|---|
| title | 약 6–14단어 |
| context | 1–3문장, 약 25–65단어 |
| question | 명확한 질문 1개 |
| option | 가능하면 약 3–12단어, 길이·문체 균형 |
| Quiz feedback | 선택지마다 1–2문장 |
| reveal | 약 40–100단어, 근거에 필요한 만큼 |
| insight | 1–2문장 |

흥미로운지의 최종 판단은 운영자가 한다. AI가 흥미도 점수로 선정·승인을 대신하지 않는다. 고정 문항 수나 형식별 할당량도 없다.

## 4. 큰 토픽과 세부 태그를 반드시 구분

### 메인 칩에 나타나는 큰 토픽: `topic_ids`

| ID | 영어 표시명 | 분류 예 |
|---|---|---|
| travel | Travel | 여행 중 경험, 이동·방문과 관련된 이야기 |
| daily-life | Daily life | 일상의 상황·생활 방식·작은 상호작용 |
| food | Food | 음식·식사·식문화 |
| language | Language | 언어·표현·의사소통 |
| work | Work | 직장·업무 환경 |
| society | Society | 인구·사회 변화·공식 통계 등 |

- 최소 1개. 직접 관련이 있을 때 복수 가능. `travel|daily-life`처럼 `|`로 구분한다.
- 첫 ID가 카드의 대표 토픽으로 표시되므로 주된 토픽을 먼저 적는다.
- 새로운 큰 토픽은 운영자와 협의하고 Codex에서 레지스트리를 추가해야 한다. 임의 ID는 앱 검증에서 거부된다.
- 모든 태그를 칩으로 만들지 않는다. **kindness는 큰 토픽이 아니다.**

### 검색용 세부 태그: `tags`

- 예: `kindness|rain|generosity`, `housing|living-alone|households`, `language-barrier`.
- `#` 없이 소문자 영문·하이픈을 권장하며 여러 값은 `|`로 구분한다.
- 실제 내용과 관련된 키워드만 사용. 관련 없는 검색어를 많이 붙이지 않는다.
- 카드와 문항 화면 하단에 작은 `#태그`로 공개된다. **내부 비밀 메모가 아니다.** 개인 식별정보를 넣지 않는다.
- 태그가 정답이나 반전을 누설하지 않는지 확인한다. 태그는 선택 전부터 보일 수 있다.
- 검색 대상: 제목, 맥락, 질문, 큰 토픽 표시명, 세부 태그. **정답·피드백·Reveal 본문·출처 메모·편집자 메모는 검색하지 않는다.**
- 대소문자를 구분하지 않고 하이픈/밑줄은 공백처럼 처리한다.

### 편집상 대상 태그: `audience_tags` — 선택

`short-trip`, `long-trip`, `short-stay`, `long-stay` 중 선택. 기간 기준은 여행 수주~수개월, 거주 1년 미만/이상 같은 편집상 구분이다. 법적 체류자격이 아니다. 콘텐츠의 관련성을 표현할 뿐 작성자의 실제 거주기간을 입증하지 않는다. 미확인 거주기간을 추측해서 서술하지 않는다.

## 5. Quiz 규칙

객관적인 단일 정답이 출처로 확인될 때 사용한다.

필수: 제목, 맥락, 질문, 2–4개 선택지, 정답 ID 하나, 사용한 모든 선택지의 피드백, insight, 출처.

- 선택지는 A/B 필수, C/D 선택. A부터 연속으로 작성한다.
- `correct_option_id`는 실제 작성한 A/B/C/D 중 하나.
- 피드백은 각 선택지가 왜 맞거나 틀린지 구체적으로 설명한다.
- 공식 통계는 발행일과 **통계 기준시점**을 구분하고 대상/분모/단위/표 주석을 확인한다.
- 모집단·기간·조건에 따라 답이 바뀌면 질문에 명시한다.
- 원문에 없는 수치, 통계로 증명되지 않은 원인, 사실상 복수 정답인 선택지는 금지.
- 빈 C/D에 대한 피드백은 공란으로 둔다.

## 6. Reveal 규칙

Reveal에는 채점·정답률·점수·Correct/Incorrect 표시가 없다. 선택한 후 **별도 Reveal 버튼**으로 결과를 공개한다. 공개 전에는 선택 변경이 가능하다.

| 모드 | 질문 목적 | 예 |
|---|---|---|
| prediction | 출처에서 일어난 사건을 예상 | 택시가 멈춘 다음 무슨 일이 있었을까? |
| reflection | 독자의 반응·감정·관점을 생각 | 당신이라면 우산을 건넸을까? |

필수: 공통 항목, `reveal_mode`, `reveal`, `insight`, 출처. `reveal_headline`은 권장.

- 옵션은 2–4개. **두 개가 자연스러우면 두 개만** 사용한다.
- `observed_option_id`: prediction에서 실제 사건과 직접 대응하는 옵션이 있을 때만 작성. **채점용 정답이 아니다.**
- reflection에서는 `observed_option_id`를 반드시 공란으로 둔다.
- `reveal`은 출처에서 확인되는 사건/경험/감정을 공개하고, `insight`는 독자가 가져갈 짧은 관점이다.
- 어떤 선택을 했든 독자의 반응을 틀렸다고 몰아가지 않는다.
- 개별 사례들을 하나의 연속된 사건처럼 합치지 않는다.
- 누가 우산을 줬는지, 실제 받았는지, 가격이 얼마인지, 역 직원인지, 상대 의도가 무엇인지 원문이 확인해주지 않으면 만들어 쓰지 않는다.
- 가상의 선택지를 사건으로 서술하지 않는다.

## 7. 출처와 검증

### 사용할 수 있는 자료

- 실제 개인 경험: 원본 게시물/댓글. Reddit 외 자료도 원문과 사용 조건을 검토한다.
- 정부·공공기관 공식 통계: 원본 표·보고서·보도자료.
- 혼합(mixed): 두 자료가 직접 관련될 때만 근거를 구분해서 결합. 반드시 결합할 필요는 없다.

### 하지 말 것

- 실제로 확인하지 않은 링크, 원문, 날짜, 수치, 기관명, 서브레딧, 인물 정보를 만들지 않는다.
- 검색 결과 요약만으로 원문 전체를 읽었다고 쓰지 않는다.
- `accessed_at`이나 검토자 이름/날짜를 자동으로 채워 검증된 것처럼 만들지 않는다.
- 내부 ID(R001 같은 것)를 원문 permalink로 간주하지 않는다.
- 댓글을 길게 복사하거나 개인 식별정보를 그대로 재게시하지 않는다. 충실한 요약과 적절한 출처 표시를 우선한다.
- 외국인이 낯설어했다는 이유만으로 한국 고유 문화라고 단정하지 않는다.

### 출처 유형

`source_type`: `reddit`, `official_statistics`, `mixed`.

`source_kind`: `reddit_post`, `reddit_comment`, `official_report`, `statistical_table`, `other`.

현재 source_type 열거형은 위 세 개뿐이다. 다른 주된 자료 유형을 쓰려면 콘텐츠는 초안으로 보관하고 Codex에서 스키마 확장이 필요한지 검토한다. 억지로 reddit이라고 표기하지 않는다.

원글/댓글 구분 미확인이면 `source_kind=other`. 커뮤니티 미확인이라면 그 사실을 적고 특정 커뮤니티를 추측하지 않는다. 원문 URL과 검증 정보는 미확인 상태에서 공란을 허용하지만, 게시하려면 확인해야 한다.

### ChatGPT에 브라우징이 없거나 원문에 접근할 수 없다면

제공받은 자료 범위에서만 초안을 만들고 `needs_verification`으로 둔다. 어떤 확인이 부족한지 source_notes/editor_notes에 적는다. 자료 접근을 한 것처럼 주장하지 않는다. 필요한 원문이나 URL을 사용자에게 요청하되, 이미 제공된 정보는 반복 요청하지 않는다.

## 8. 실제 작성할 파일

콘텐츠는 CSV로 주고받고 Codex가 검증 후 앱용 JSON으로 변환한다. **CSV 자동 업로드 기능은 아직 없다.** 새 CSV가 저절로 웹앱에 반영되지 않는다.

- `01_quiz_template.csv`: Quiz 한 문항당 한 행.
- `02_reveal_template.csv`: Reveal 한 문항당 한 행.
- `03_sources_template.csv`: 출처 하나당 한 행. content_id로 콘텐츠에 연결.
- `04_topics.csv`: 현재 큰 토픽 목록.
- `05_field_guide.csv`: 필드별 한국어 작성 설명.

작성 키트: https://github.com/spacecoffeeboy/gshLab/tree/work/docs/content-kit

ZIP: https://github.com/spacecoffeeboy/gshLab/raw/refs/heads/work/docs/almeng-e-content-kit.zip

비공개 저장소는 ChatGPT에서 직접 읽지 못할 수 있다. **이 MD와 필요한 CSV를 함께 첨부하는 것이 가장 확실하다.** 파일을 자동으로 볼 수 있다고 가정하지 않는다.

### 식별자와 셀 형식

- `content_id`는 문항별 고유값. 이미 전달·게시된 ID는 재사용하지 않는다. 기존 문항 수정이면 동일 ID와 수정 요청임을 명시한다.
- 예: `quiz-population-0002`, `reveal-travel-0005`. 예시 번호는 신규 배정값이 아니므로 기존 자료와 확인한다.
- `slug`는 소문자 영문·숫자·하이픈. 모르면 공란으로 두고 Codex가 배정할 수 있다.
- `source_id`도 모르면 공란 가능. 하나의 출처를 여러 문항에서 재사용할 경우 동일 출처임을 알린다.
- 선택지 ID는 A/B/C/D. 선택지 본문에 A. 같은 접두어를 중복해서 넣지 않는다.
- 빈 값은 공란으로 두고 `null`, `N/A`, `미확인` 등을 날짜/URL/정답 칸에 억지로 넣지 않는다. 미확인 이유는 메모 칸에 적는다.
- 날짜: `reviewed_at`, `accessed_at`은 실제 확인 날짜 `YYYY-MM-DD`. 다른 날짜/시간은 ISO 형식을 권장한다.
- UTF-8 BOM CSV로 내보내면 한국어 메모가 Excel에서 덜 깨진다. 쉼표·큰따옴표·줄바꿈은 표준 CSV 인용 규칙으로 저장한다.
- CSV 셀 안의 목록은 `|` 구분. JSON 배열 문자열을 넣지 않는다.

### Quiz CSV 헤더 — 순서와 이름 유지

```csv
content_id,slug,status,source_type,topic_ids,tags,audience_tags,title,context,question,option_a,option_b,option_c,option_d,correct_option_id,feedback_a,feedback_b,feedback_c,feedback_d,insight,editor_notes,reviewed_by,reviewed_at,answer_evidence,published_at
```

### Reveal CSV 헤더

```csv
content_id,slug,status,source_type,topic_ids,tags,audience_tags,title,context,question,option_a,option_b,option_c,option_d,reveal_mode,observed_option_id,reveal_headline,reveal,insight,editor_notes,reviewed_by,reviewed_at,answer_evidence,published_at
```

Reveal CSV에 correct_option_id나 feedback 열을 추가하지 않는다. `answer_evidence`는 필요하면 출처 대응 검토 기록으로 쓸 수 있으나 앱에서 Reveal의 정답 판정에 사용하지 않는다.

### 출처 CSV 헤더

```csv
content_id,source_id,source_kind,organization_or_community,source_title,source_url,source_published_at,accessed_at,reference_period,population,unit,source_notes
```

한 문항에 원글·댓글·통계가 있으면 **같은 content_id로 출처 3행**을 만든다. 문항을 출처 개수만큼 복제하지 않는다. 다른 content_id의 출처를 잘못 연결하지 않도록 마지막에 확인한다.

## 9. 필수 정보와 공개 상태

### 초안 작성

`status=draft` 또는 `needs_verification`. 기본 제목·맥락·질문·선택지·형식별 결과·insight·토픽을 작성한다. 출처가 부족하면 빈 부분과 부족한 검증을 정확히 기록한다.

### 상태 흐름

`draft` → `needs_verification` → `approved` → `published` → 필요 시 `archived`.

이 순서는 편집상 안내이며 검토 완료 문항을 바로 승인하는 등 실제 절차에 따라 이동할 수 있다. 중요한 것은 **approved와 published가 다르다는 점**이다. ChatGPT가 임의로 승인하거나 게시하지 않는다.

### 게시 전 필요한 것

- 사용자/운영자의 명시적 승인과 게시 결정.
- 실제 검토자 `reviewed_by`, 실제 검토 날짜 `reviewed_at`.
- 하나 이상의 확인된 원문 source_url, 모든 첨부 출처의 accessed_at.
- 공식 통계 Quiz는 공식 출처, reference_period, population, unit, answer_evidence.
- Quiz의 유일한 정답과 각 선택지 피드백, Reveal의 비채점 규칙 검토.
- 인용·요약·개인정보와 재이용 범위 검토.

형식 검증은 원문과 주장 사이의 사실적 일치나 사용 권한을 자동으로 증명하지 않는다. CSV 상태만 published로 바꿔 검증을 우회하지 않는다. 게시 날짜는 미래 계획과 실제 게시를 구분한다.

## 10. ChatGPT에서 추천하는 작업 순서

1. 사용자가 제공한 원문·링크·소재를 확인한다. 아직 소재가 없다면 먼저 소수의 소재 후보를 제안하고 사실로 확정하지 않는다.
2. 각 후보의 큰 토픽, 세부 태그, 적합한 Quiz/Reveal 및 모드를 제안한다.
3. 사용자가 선정한 소재로 영어 초안을 작성하고, 필요한 경우 한국어 설명을 곁들인다.
4. 답 누설, 근거 없는 확대해석, 질문/보기의 모호함, 출처 경계를 자체 검토한다.
5. 문항별 미확인 사항과 필요한 원문 확인을 별도 표로 알려준다. 검증할 수 없는 항목은 숨기지 않는다.
6. 사용자의 검토를 반영해 해당 템플릿과 동일한 헤더의 콘텐츠 CSV와 출처 CSV를 함께 내보낸다. 형식이 섞이면 Quiz/Reveal 파일을 분리한다.
7. 사용자가 그 파일들을 Codex에 넘긴다. Codex는 현행 콘텐츠와 ID 중복 확인, 스키마 검증, 영어/분류 점검, JSON 변환, 앱 확인을 수행한다.
8. 실제 게시·main 푸시·Vercel 배포는 별도 승인 범위다. 콘텐츠 작성만 요청받았는데 자동으로 배포했다고 말하지 않는다.

## 11. 납품 전 체크리스트

- [ ] 주제가 충분히 구체적이고 작은 발견이 있는가?
- [ ] 제목·질문·태그가 선택 전 답을 누설하지 않는가?
- [ ] 문항이 독립적으로 이해되는가?
- [ ] 큰 토픽 ID가 등록 목록에 있고 세부 키워드와 분리됐는가?
- [ ] 선택지가 2–4개이며 억지 보기가 없는가?
- [ ] Quiz의 정답은 하나이고 사용한 모든 선택지에 피드백이 있는가?
- [ ] Reveal prediction/reflection 구분과 observed_option_id 규칙이 맞는가?
- [ ] 실제 확인된 사건과 가정·추정·편집 해석을 구분했는가?
- [ ] 개인 사례를 보편적 문화로 확대하지 않았는가?
- [ ] 출처마다 content_id 연결과 원문 URL/날짜/통계 메타데이터가 맞는가?
- [ ] 미확인 검증 정보·작성자 신분·출처·수치를 임의로 채우지 않았는가?
- [ ] 과도한 인용·개인정보·재이용 문제를 검토했는가?
- [ ] CSV 열 개수, 따옴표, 줄바꿈, 빈 값, ID 중복이 올바른가?
- [ ] 승인·게시 여부를 사용자 결정과 구분했는가?

## 12. 새 ChatGPT 대화에 붙일 시작 프롬프트

> 첨부한 ALMENG_E_CONTENT_CHATGPT_HANDOFF.md와 CSV 템플릿을 읽고 Almeng-E의 콘텐츠 편집자로 작업해줘. 영어권 한국 관심층을 위한 짧고 재미있는 Quiz/Reveal 콘텐츠를 만들 거야. 나와의 대화·검토는 한국어, 최종 공개 원고는 영어로 해줘. 큰 토픽은 topic_ids, kindness 같은 검색용 키워드는 tags로 분리해. Quiz는 객관적 정답 하나와 선택지별 피드백, Reveal은 prediction/reflection과 비채점 공개 방식이야. 출처·수치·원문·날짜·검토 사실을 지어내지 말고 부족하면 needs_verification으로 표시해. 먼저 내가 제공한 소재에서 사실로 확인되는 범위와 정보 공백을 짧게 정리한 뒤, 문항 초안을 제안해줘. 선정된 문항은 첨부 CSV의 헤더 그대로 작성하고 출처 CSV도 함께 만들어줘. 내 승인 없이 published로 전환하지 마. 현재 원문이나 소재가 첨부되지 않았다면, 게시용 사실을 만들지 말고 필요한 자료부터 요청해줘.
