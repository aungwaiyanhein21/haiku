SELECT 
   
    h.id, h.title, h.published_year, h.haiku_text, h.emotion, h.comments, h.english_translation, h.image_path,
    h.reference,
    lang.lang as language,
    h_c.passage_1, h_c.passage_2, h_c.passage_1_start_index, h_c.passage_1_end_index, h_c.passage_2_start_index, h_c.passage_2_end_index,
    c1.concept_name as concept_1,
    c2.concept_name as concept_2,
    GROUP_CONCAT(cat.category_name) as categories
FROM Haiku h 
    INNER JOIN belongs b ON b.haiku_id = h.id
    INNER JOIN Category cat ON cat.id = b.category_id
    
    INNER JOIN writes w ON w.haiku_id = h.id
    INNER JOIN Author auth ON auth.id = w.author_id

    INNER JOIN Languages lang ON lang.id = h.language_id

    INNER JOIN haiku_concepts h_c ON h_c.haiku_id = h.id 
    INNER JOIN Concept c1 ON c1.id = h_c.concept_id_1 
    INNER JOIN Concept c2 ON c2.id = h_c.concept_id_2

   

    GROUP BY h.id