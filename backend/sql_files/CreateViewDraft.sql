DROP VIEW IF EXISTS v_haiku;

CREATE VIEW v_haiku
AS 
SELECT 
    auth.literary_name,
    h.id, h.title, h.published_year, h.haiku_text, h.emotion, h.comments, h.english_translation,
    ref.ref_link,
    lang.lang as language,
    h_c.passage_1, h_c.passage_2,
    c1.concept_name as concept_1,
    c2.concept_name as concept_2,
    GROUP_CONCAT(cat.category_name) as categories
FROM Haiku h 
    INNER JOIN writes w ON w.haiku_id = h.id
    INNER JOIN Author auth ON auth.id = w.author_id

    INNER JOIN taken_from t_f ON t_f.haiku_id = h.id
    INNER JOIN Reference ref ON ref.id = t_f.ref_id

    INNER JOIN Languages lang ON lang.id = h.language_id

    INNER JOIN haiku_concepts h_c ON h_c.haiku_id = h.id 
    INNER JOIN Concept c1 ON c1.id = h_c.concept_id_1 
    INNER JOIN Concept c2 ON c2.id = h_c.concept_id_2

    INNER JOIN belongs b ON b.haiku_id = h.id
    INNER JOIN Category cat ON cat.id = b.category_id

    GROUP BY h.id