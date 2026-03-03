-- ============================================
-- SCRIPT PARA AJUSTAR IDs DO INVENTÁRIO
-- ============================================
-- Este script atualiza os product_id na tabela inventory
-- para corresponder aos IDs do e-commerce (1, 2, 4)
-- 
-- IMPORTANTE: Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Primeiro, vamos ver os produtos atuais
SELECT id, product_id, product_name, quantity 
FROM inventory 
ORDER BY product_name;

-- 2. Atualizar os product_id para corresponder ao e-commerce
-- AJUSTE ESTES VALORES conforme necessário baseado nos seus dados reais

-- Smartwatch Colmi P71 → product_id = '1'
UPDATE inventory 
SET product_id = '1'
WHERE product_name ILIKE '%colmi%p71%' 
   OR product_name ILIKE '%smartwatch%colmi%';

-- Fone Lenovo GM2 Pro → product_id = '2'
UPDATE inventory 
SET product_id = '2'
WHERE product_name ILIKE '%lenovo%gm2%' 
   OR product_name ILIKE '%fone%lenovo%';

-- Pulseiras 22mm → product_id = '4'
UPDATE inventory 
SET product_id = '4'
WHERE product_name ILIKE '%pulseira%22mm%' 
   OR product_name ILIKE '%pulseira%smartwatch%';

-- 3. Verificar as mudanças
SELECT id, product_id, product_name, quantity 
FROM inventory 
ORDER BY product_id;

-- ============================================
-- ALTERNATIVA: Se você souber os IDs exatos atuais
-- ============================================
-- Descomente e ajuste os IDs abaixo conforme necessário:

-- UPDATE inventory SET product_id = '1' WHERE id = 123; -- Substitua 123 pelo ID real do Colmi P71
-- UPDATE inventory SET product_id = '2' WHERE id = 456; -- Substitua 456 pelo ID real do Lenovo GM2
-- UPDATE inventory SET product_id = '4' WHERE id = 789; -- Substitua 789 pelo ID real das Pulseiras

-- ============================================
-- ROLLBACK (se algo der errado)
-- ============================================
-- Se precisar desfazer, você pode restaurar os valores antigos
-- (mas guarde os valores antigos antes de executar!)
