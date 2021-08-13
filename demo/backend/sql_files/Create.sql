PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS Author;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Concept;
DROP TABLE IF EXISTS Languages;
DROP TABLE IF EXISTS Haiku;
-- DROP TABLE IF EXISTS Connection_Type;
DROP TABLE IF EXISTS Reference;
DROP TABLE IF EXISTS Country;

DROP TABLE IF EXISTS writes;
DROP TABLE IF EXISTS taken_from;
DROP TABLE IF EXISTS concept_category;
DROP TABLE IF EXISTS belongs;
DROP TABLE IF EXISTS haiku_concepts;

DROP VIEW IF EXISTS v_haiku;

PRAGMA foreign_keys = ON;


/********************************************************************
    Entities
********************************************************************/
CREATE TABLE Author (
    id INTEGER PRIMARY KEY,
    literary_name TEXT NOT NULL,
	first_name TEXT,
	last_name TEXT,
    country TEXT,
    language TEXT,
    year_born TEXT,
    year_died TEXT
);

CREATE TABLE Category (
    id INTEGER PRIMARY KEY,
    category_name TEXT NOT NULL UNIQUE
);

CREATE TABLE Concept (
    id INTEGER PRIMARY KEY,
    concept_name TEXT NOT NULL UNIQUE
);

CREATE TABLE Languages (
    id INTEGER PRIMARY KEY,
    lang TEXT NOT NULL UNIQUE
);

CREATE TABLE Haiku (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    published_year TEXT,
    haiku_text TEXT,
    emotion TEXT,
    comments TEXT,
    language_id INTEGER,
    english_translation TEXT,
    reference TEXT,
    image_path TEXT,

    FOREIGN KEY(language_id) REFERENCES Languages(id) ON DELETE CASCADE
);


-- CREATE TABLE Connection_Type (
--     id INTEGER PRIMARY KEY,
--     conn_type TEXT NOT NULL
-- );

-- CREATE TABLE Reference (
--     id INTEGER PRIMARY KEY,
--     ref_link TEXT NOT NULL UNIQUE
-- );



CREATE TABLE Country (
    id INTEGER PRIMARY KEY,
    country TEXT NOT NULL UNIQUE
);

/********************************************************************
    Relationships
********************************************************************/
CREATE TABLE writes (
    author_id INTEGER,
    haiku_id INTEGER,
    PRIMARY KEY ( author_id, haiku_id),

    FOREIGN KEY(author_id) REFERENCES Author(id) ON DELETE CASCADE,
    FOREIGN KEY(haiku_id) REFERENCES Haiku(id) ON DELETE CASCADE
);

-- CREATE TABLE taken_from (
--     haiku_id INTEGER,
--     ref_id INTEGER,
--     PRIMARY KEY ( haiku_id, ref_id),

--     FOREIGN KEY(haiku_id) REFERENCES Haiku(id) ON DELETE CASCADE,
--     FOREIGN KEY(ref_id) REFERENCES Reference(id) ON DELETE CASCADE
-- );

CREATE TABLE concept_category (
    concept_id INTEGER,
    category_id INTEGER,

    PRIMARY KEY ( concept_id, category_id),

    FOREIGN KEY(concept_id) REFERENCES Concept(id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES Category(id) ON DELETE CASCADE
);

-- CREATE TABLE connects (
--     haiku_id INTEGER,
--     conn_id INTEGER,
--     PRIMARY KEY ( haiku_id, conn_id)
-- );

CREATE TABLE belongs (
    haiku_id INTEGER,
    category_id INTEGER,
    PRIMARY KEY ( haiku_id, category_id)

    FOREIGN KEY(haiku_id) REFERENCES Haiku(id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES Category(id) ON DELETE CASCADE
);

CREATE TABLE haiku_concepts (
    haiku_id INTEGER,
    concept_id_1 INTEGER,
    concept_id_2 INTEGER,
    passage_1   TEXT,
    passage_2   TEXT,
    passage_1_start_index INTEGER,
    passage_1_end_index INTEGER,
    passage_2_start_index INTEGER,
    passage_2_end_index INTEGER,

    PRIMARY KEY ( haiku_id, concept_id_1, concept_id_2)

    FOREIGN KEY(haiku_id) REFERENCES Haiku(id) ON DELETE CASCADE,
    FOREIGN KEY(concept_id_1) REFERENCES Concept(id) ON DELETE CASCADE
    FOREIGN KEY(concept_id_2) REFERENCES Concept(id) ON DELETE CASCADE
);




/********************************************************************
    VIEWS
********************************************************************/
CREATE VIEW v_haiku
AS 
SELECT 
    auth.literary_name,
    h.id, h.title, h.published_year, h.haiku_text, h.emotion, h.comments, h.english_translation, h.image_path,
    h.reference,
    lang.lang as language,
    h_c.passage_1, h_c.passage_2, h_c.passage_1_start_index, h_c.passage_1_end_index, h_c.passage_2_start_index, h_c.passage_2_end_index,
    c1.concept_name as concept_1,
    c2.concept_name as concept_2,
    GROUP_CONCAT(cat.category_name) as categories
FROM Haiku h 
    INNER JOIN writes w ON w.haiku_id = h.id
    INNER JOIN Author auth ON auth.id = w.author_id

    -- INNER JOIN taken_from t_f ON t_f.haiku_id = h.id
    -- INNER JOIN Reference ref ON ref.id = t_f.ref_id

    INNER JOIN Languages lang ON lang.id = h.language_id

    INNER JOIN haiku_concepts h_c ON h_c.haiku_id = h.id 
    INNER JOIN Concept c1 ON c1.id = h_c.concept_id_1 
    INNER JOIN Concept c2 ON c2.id = h_c.concept_id_2

    INNER JOIN belongs b ON b.haiku_id = h.id
    INNER JOIN Category cat ON cat.id = b.category_id

    GROUP BY h.id