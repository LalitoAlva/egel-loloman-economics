-- Fix roles table sequence to prevent duplicate key errors
-- This resets the sequence to the next available ID after the maximum existing ID

SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));
