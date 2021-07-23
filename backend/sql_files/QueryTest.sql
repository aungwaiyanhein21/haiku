SELECT 
    w.author_id,
    h.id, h.title, h.published_year, h.haiku_text, h.emotion, h.comments, h.english_translation,
    t_f.ref_id,
    lang.id as language_id,
    h_c.passage_1, h_c.passage_2,
    h_c.concept_id_1 as concept_1,
    h_c.concept_id_2 as concept_2,
    GROUP_CONCAT(b.category_id) as categories
FROM Haiku h 
    INNER JOIN writes w ON w.haiku_id = h.id
    INNER JOIN taken_from t_f ON t_f.haiku_id = h.id
    INNER JOIN Languages lang ON lang.id = h.language_id
    INNER JOIN haiku_concepts h_c ON h_c.haiku_id = h.id 
    INNER JOIN belongs b ON b.haiku_id = h.id

    WHERE h.id=2
    GROUP BY h.id

    