# Almeng-E 콘텐츠 작성 키트

## 작성할 파일
1. Quiz는 `01_quiz_template.csv`, Reveal은 `02_reveal_template.csv`에 한 문항당 한 행을 작성합니다. 필요한 형식만 써도 됩니다.
2. 출처는 `03_sources_template.csv`에 작성합니다. 같은 콘텐츠에 출처가 3개면 같은 content_id로 3행을 만듭니다. 출처를 선택지 칸에 넣지 마세요.
3. 큰 토픽 ID는 `04_topics.csv`, 항목별 필수 여부·작성법은 `05_field_guide.csv`를 참고하세요.

## 작성 규칙
- 첫 행(영문 열 이름)은 변경하지 마세요. 예시 한 행을 복사해 여러 문항을 추가하면 됩니다. 비어 있는 초기 행은 내용으로 채우거나 삭제하세요.
- content_id는 문항마다 고유하게 정하고 출처 파일과 동일하게 적습니다. 기본값 quiz-draft-001 / reveal-draft-001은 새 행마다 번호를 바꿉니다. 이미 앱에 있는 ID를 쓰면 신규가 아니라 수정 요청으로 취급할 수 있습니다.
- topic_ids: 큰 분류, 예: travel|daily-life. tags: 세부 키워드, 예: kindness|rain. 여러 값은 파이프(|)로 구분하고 #은 쓰지 마세요.
- 선택지는 2~4개입니다. A/B는 필수, C/D는 필요할 때만 작성합니다. 억지로 오답이나 세 번째 선택지를 만들 필요가 없습니다.
- Quiz는 정답 하나와 사용한 모든 선택지의 피드백이 필요합니다. Reveal은 정답/점수 없이 prediction/reflection 모드를 지정합니다.
- 모르는 slug/source_id는 공란으로 두면 변환 과정에서 부여할 수 있습니다. 모르는 출처 URL·날짜·수치·기관명은 만들어 쓰지 마세요.
- 한국어 초안으로 주셔도 됩니다. 앱 반영 전 영어로 다듬어 검토합니다. 최종 사용자 노출 언어는 영어입니다.
- CSV 셀 안에 쉼표·줄바꿈이 있어도 Excel/Google Sheets에서 입력하면 됩니다. 직접 텍스트로 작성할 때는 표준 CSV 따옴표 규칙을 지키세요.
- 엑셀로 열 때 한글이 깨지지 않도록 UTF-8 BOM으로 제공합니다. 저장할 때도 CSV UTF-8을 선택하세요.

## 승인과 게시
처음 status는 draft로 두세요. 출처 미확인이면 needs_verification, 검토 승인 후 approved이며 자동 공개되지 않습니다. published는 명시적인 게시 결정입니다. reviewed_by/reviewed_at/accessed_at에는 실제 검토 정보만 기록합니다. 통계 Quiz는 기준시점·대상·단위·정답 근거까지 필요합니다.

현재 앱이 CSV를 자동 업로드하는 것은 아닙니다. 작성한 Quiz/Reveal CSV와 출처 CSV를 함께 전달하면 Codex가 검증·영문 편집·JSON 변환을 진행합니다. 변환 완료 후에도 사용자의 승인 없이 main 푸시/게시하지 않습니다.

## 예시 파일
example_*_NOT_FOR_PUBLICATION.csv는 현재 앱의 미검증 더미를 옮긴 참고 자료입니다. 출처 URL이 비어 있으며 실제 사실로 검증하지 않았습니다. 절대로 그대로 게시하지 마세요. 작성 파일과 분리돼 있습니다.
