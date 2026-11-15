-- DESIGN DRAFT ONLY. Not run by the application, build, deploy, or npm scripts.
-- No DB server has been registered or provisioned. PostgreSQL syntax.
BEGIN;
CREATE TABLE quiz_questions (
 question_id text NOT NULL,
 version integer NOT NULL CHECK(version > 0),
 level text NOT NULL CHECK(level IN ('beginner','intermediate','advanced')),
 language text NOT NULL CHECK(language IN ('ko','en')),
 kind text NOT NULL CHECK(kind IN ('ox','mcq')),
 category text NOT NULL,
 prompt text NOT NULL CHECK(length(trim(prompt)) > 0),
 explanation text NOT NULL CHECK(length(trim(explanation)) > 0),
 correct_option_key text NOT NULL CHECK(correct_option_key IN ('A','B','C')),
 review_status text NOT NULL CHECK(review_status IN ('draft','reviewed','held')),
 source_row integer,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(question_id,version),
 UNIQUE(question_id,version,level)
);
CREATE TABLE quiz_options (
 question_id text NOT NULL,
 question_version integer NOT NULL,
 option_key text NOT NULL CHECK(option_key IN ('A','B','C')),
 label text NOT NULL CHECK(length(trim(label)) > 0),
 PRIMARY KEY(question_id,question_version,option_key),
 FOREIGN KEY(question_id,question_version) REFERENCES quiz_questions(question_id,version)
);
ALTER TABLE quiz_questions ADD CONSTRAINT correct_option_exists
 FOREIGN KEY(question_id,version,correct_option_key)
 REFERENCES quiz_options(question_id,question_version,option_key)
 DEFERRABLE INITIALLY DEFERRED;
CREATE TABLE quiz_attempts (
 attempt_id uuid PRIMARY KEY,
 access_token_hash text NOT NULL CHECK(access_token_hash ~ '^[0-9a-f]{64}$'),
 bank_version text NOT NULL,
 selected_level text NOT NULL CHECK(selected_level IN ('beginner','intermediate','advanced')),
 mode text NOT NULL CHECK(mode IN ('standard','time-attack')),
 language text NOT NULL CHECK(language IN ('ko','en')),
 requested_questions integer NOT NULL DEFAULT 15 CHECK(requested_questions=15),
 assigned_questions integer NOT NULL CHECK(assigned_questions BETWEEN 1 AND 15),
 state text NOT NULL CHECK(state IN ('in_progress','completed','timeout')),
 started_at timestamptz NOT NULL DEFAULT now(),
 deadline_at timestamptz,
 finished_at timestamptz,
 expires_at timestamptz NOT NULL,
 UNIQUE(attempt_id,selected_level),
 CHECK((mode='standard' AND deadline_at IS NULL) OR
       (mode='time-attack' AND deadline_at=started_at+interval '3 minutes'))
);
CREATE TABLE attempt_questions (
 attempt_id uuid NOT NULL,
 position integer NOT NULL CHECK(position BETWEEN 1 AND 15),
 question_id text NOT NULL,
 question_version integer NOT NULL,
 selected_level text NOT NULL,
 correct_option_key text NOT NULL,
 question_snapshot jsonb NOT NULL CHECK(jsonb_typeof(question_snapshot)='object'),
 PRIMARY KEY(attempt_id,position),
 UNIQUE(attempt_id,question_id),
 UNIQUE(attempt_id,position,question_id,question_version,correct_option_key),
 FOREIGN KEY(attempt_id,selected_level) REFERENCES quiz_attempts(attempt_id,selected_level) ON DELETE CASCADE,
 FOREIGN KEY(question_id,question_version,selected_level) REFERENCES quiz_questions(question_id,version,level),
 FOREIGN KEY(question_id,question_version,correct_option_key) REFERENCES quiz_options(question_id,question_version,option_key)
);
CREATE TABLE quiz_answers (
 attempt_id uuid NOT NULL,
 position integer NOT NULL,
 question_id text NOT NULL,
 question_version integer NOT NULL,
 chosen_option_key text NOT NULL,
 correct_option_key_snapshot text NOT NULL,
 is_correct boolean GENERATED ALWAYS AS (chosen_option_key=correct_option_key_snapshot) STORED,
 answered_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(attempt_id,position),
 FOREIGN KEY(attempt_id,position,question_id,question_version,correct_option_key_snapshot)
 REFERENCES attempt_questions(attempt_id,position,question_id,question_version,correct_option_key) ON DELETE CASCADE,
 FOREIGN KEY(question_id,question_version,chosen_option_key) REFERENCES quiz_options(question_id,question_version,option_key)
);
-- Future optional collection only; no matching UI or endpoint is implemented now.
CREATE TABLE optional_demographics (
 attempt_id uuid PRIMARY KEY REFERENCES quiz_attempts(attempt_id) ON DELETE CASCADE,
 residence_country char(2),
 gender_response text,
 age_band text,
 notice_version text NOT NULL,
 consented_at timestamptz NOT NULL,
 expires_at timestamptz NOT NULL,
 CHECK(residence_country IS NULL OR residence_country ~ '^[A-Z]{2}$')
);
CREATE INDEX quiz_questions_level_idx ON quiz_questions(level,review_status,language);
CREATE INDEX quiz_attempts_expiry_idx ON quiz_attempts(expires_at);
CREATE INDEX quiz_answers_question_idx ON quiz_answers(question_id,question_version);
REVOKE ALL ON quiz_questions,quiz_options,quiz_attempts,attempt_questions,quiz_answers,optional_demographics FROM PUBLIC;
COMMIT;
